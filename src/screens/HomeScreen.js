import React, { useState, useEffect, useCallback, useRef } from 'react';

import { 
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    TextInput,
    ActivityIndicator,
    Platform,
    Animated as RNAnimated
} from 'react-native';
import { Image } from 'expo-image';

import { Search, Plus, MapPin, User, Mic, Zap } from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    withTiming,
    withDelay
} from 'react-native-reanimated';
import { useCart } from '../context/CartContext';

import { useAuth } from '../context/AuthContext';
import RideActionButton from '../components/RideActionButton';
import api from '../utils/api';

const { width, height } = Dimensions.get('window');
const GAP = 12;
const PADDING = 16;
const COLUMN_COUNT = 2;
const CARD_WIDTH = (width - (PADDING * 2) - GAP) / COLUMN_COUNT;
const HEADER_HEIGHT = 300;
const CARD_HEIGHT = Math.floor(CARD_WIDTH * 1.1 + 105); 

const SLIDER_IMAGES = [
    require('../../assets/e3_rides/360 ride.avif'),
    require('../../assets/e3_rides/M. COLUMBUS.png'),
    require('../../assets/e3_rides/ROCKET EJECTOR.jpg'),
    require('../../assets/e3_rides/BASKET BALL.webp'),
];

const HomeHeader = React.memo(({ 
    searchQuery, 
    setSearchQuery, 
    loading,
    rides
}) => {
    const displayImages = rides.length > 0 
        ? rides.map(r => r.imageSource) 
        : SLIDER_IMAGES;

    const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
    const heroScrollX = useRef(new RNAnimated.Value(0)).current;
    const heroRef = useRef(null);

    useEffect(() => {
        if (displayImages.length <= 1) return;

        const timer = setInterval(() => {
            const nextIndex = (currentSliderIndex + 1) % displayImages.length;
            setCurrentSliderIndex(nextIndex);
            heroRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSliderIndex, displayImages.length]);

    const onHeroScroll = RNAnimated.event(
        [{ nativeEvent: { contentOffset: { x: heroScrollX } } }],
        { useNativeDriver: false }
    );

    const onHeroMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        if (index !== currentSliderIndex) {
            setCurrentSliderIndex(index);
        }
    };

    return (
    <>
        {/* Immersive Hero Section */}
        <View style={styles.heroContainer}>
            <RNAnimated.FlatList
                ref={heroRef}
                data={displayImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onHeroScroll}
                onMomentumScrollEnd={onHeroMomentumScrollEnd}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToAlignment="start"
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                onScrollToIndexFailed={(info) => {
                    heroRef.current?.scrollToOffset({ 
                        offset: info.averageItemLength * info.index, 
                        animated: true 
                    });
                }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];

                    const scale = heroScrollX.interpolate({
                        inputRange,
                        outputRange: [1, 1.1, 1],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width, height: HEADER_HEIGHT }}>
                            <RNAnimated.View style={{ 
                                width: '100%', 
                                height: '100%',
                                transform: [{ scale }]
                            }}>
                                <Image
                                    source={item}
                                    style={styles.heroImage}
                                    contentFit="cover"
                                />
                            </RNAnimated.View>
                        </View>
                    );
                }}
            />
            
            {/* Slider Indicators */}
            <View style={styles.sliderIndicators}>
                {displayImages.map((_, i) => {
                    const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                    ];

                    const dotWidth = heroScrollX.interpolate({
                        inputRange,
                        outputRange: [6, 20, 6],
                        extrapolate: 'clamp',
                    });

                    const opacity = heroScrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <RNAnimated.View 
                            key={i} 
                            style={[
                                styles.indicatorDot, 
                                { width: dotWidth, opacity }
                            ]} 
                        />
                    );
                })}
            </View>

            <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
                style={[styles.heroGradient, { zIndex: 2 }]}
                pointerEvents="none"
            >
                <Text style={styles.appTitle}>ETHREE</Text>
                <Text style={styles.appTagline}>Eat • Enjoy • Entertain</Text>
            </LinearGradient>
        </View>

        <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBlur}>
                    <Search color="#8E8E93" size={18} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search rides..."
                        placeholderTextColor="#8E8E93"
                        value={searchQuery}
                        onChangeText={(text) => {
                            if (text.length > 0 && searchQuery.length === 0) {
                                Haptics.selectionAsync();
                            }
                            setSearchQuery(text);
                        }}
                    />
                </View>
            </View>

            <Text style={styles.sectionTitle}>Available Rides</Text>
            
            {loading && (
                <View style={{ padding: 40, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#FEC105" />
                </View>
            )}
        </View>
    </>
    );
});

const RideCard = React.memo(({ ride, index, navigation, addToCart }) => {
    const [imageIndex, setImageIndex] = React.useState(0);
    const isMegaCombo = ride.title.toLowerCase().includes('mega combo');

    React.useEffect(() => {
        let timer;
        if (isMegaCombo) {
            timer = setInterval(() => {
                setImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
            }, 3000);
        }
        return () => timer && clearInterval(timer);
    }, [isMegaCombo]);

    const currentImage = isMegaCombo ? SLIDER_IMAGES[imageIndex] : ride.imageSource;

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                addToCart(ride);
                navigation.navigate('Cart');
            }}
            style={styles.cardContainer}
        >
            <View style={styles.card}>
                <View style={styles.cardImageContainer}>
                    <MotiView
                        key={imageIndex}
                        from={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1000 }}
                        style={StyleSheet.absoluteFill}
                    >
                        <Image
                            source={currentImage}
                            style={styles.cardImage}
                            contentFit="cover"
                            transition={200}
                        />
                    </MotiView>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.5)']}
                        style={styles.imageOverlay}
                    />

                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{ride.title}</Text>
                    <Text style={styles.price}>{ride.price}</Text>
                    <View style={styles.actionRow}>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            style={styles.addButton} 
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                addToCart(ride);
                            }}
                        >
                            <Text style={styles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            style={styles.bookNowButton} 
                            onPress={() => {
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                addToCart(ride);
                                navigation.navigate('Cart');
                            }}
                        >
                            <Zap size={12} color="#000" fill="#000" />
                            <Text style={styles.bookNowText}>BOOK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollY = useSharedValue(0);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const data = await api.get('/api/e3/rides');
            const formattedRides = (data.rides || data).map(ride => {
                const id = ride.id || ride._id;
                let title = ride.name || ride.title;
                if (id == 1) title = "MEGA COMBO ADULTS";
                if (id == 2) title = "MEGA COMBO CHILD";

                return {
                    ...ride,
                    id,
                    title,
                    price: ride.price ? `₹${ride.price}` : '₹100',
                    imageSource: ride.image ? { uri: ride.image.trim() } : require('../../assets/LOGO.png')
                };
            });
            setRides(formattedRides);
        } catch (error) {
            // Silently handle error
        } finally {
            setLoading(false);
        }
    };

    const filteredRides = React.useMemo(() => 
        rides.filter((ride) =>
            ride.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [rides, searchQuery]
    );

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [100, 200],
            [0, 1],
            Extrapolation.CLAMP
        );
        return {
            opacity,
        };
    });

    const renderRideItem = useCallback(({ item, index }) => (
        <RideCard 
            ride={item} 
            index={index} 
            navigation={navigation} 
            addToCart={addToCart} 
        />
    ), [navigation, addToCart]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.stickyHeader, headerStyle, { paddingTop: insets.top, height: insets.top + 60 }]}>
                <View style={styles.stickyHeaderContent}>
                    <Text style={styles.stickyHeaderTitle}>ETHREE</Text>
                </View>
            </Animated.View>

            <View style={[styles.topControls, { top: insets.top }]}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/LOGO.png')} style={styles.logo} contentFit="contain" />
                </View>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.profileButton} 
                    onPress={() => navigation.navigate('Profile')}
                >
                    <User size={22} color="#fff" />
                </TouchableOpacity>

            </View>

            <Animated.FlatList
                data={filteredRides}
                renderItem={renderRideItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={COLUMN_COUNT}
                columnWrapperStyle={{ gap: GAP, paddingHorizontal: PADDING, marginBottom: 16 }}

                ListHeaderComponent={
                    <HomeHeader 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        loading={loading}
                        rides={rides}
                    />
                }
                ListFooterComponent={<View style={{ height: 120 }} />}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={false}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stickyHeaderContent: {
        marginTop: 10,
    },
    stickyHeaderTitle: {
        color: '#FEC105',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 4,
        fontStyle: 'italic',
    },
    topControls: {
        position: 'absolute',
        left: 20,
        right: 20,
        zIndex: 102,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    logo: {
        width: 75,
        height: 35,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    heroContainer: {
        height: HEADER_HEIGHT,
        width: '100%',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 60,
    },
    appTitle: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#FEC105',
        letterSpacing: 4,
        textTransform: 'uppercase',
        fontStyle: 'italic',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 8,
    },
    appTagline: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500',
        letterSpacing: 5,
        textTransform: 'uppercase',
    },
    contentContainer: {
        backgroundColor: '#000',
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchContainer: {
        paddingHorizontal: PADDING,
        marginBottom: 20,
        marginTop: -35,
        zIndex: 100,
    },
    searchBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    searchInput: {
        flex: 1,
        height: '100%',
        marginLeft: 12,
        fontSize: 15,
        color: '#000',
    },
    sliderIndicators: {
        position: 'absolute',
        bottom: 85,
        left: 24,
        flexDirection: 'row',
        zIndex: 10,
    },
    indicatorDot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginRight: 6,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: PADDING,
        marginBottom: 12,
    },
    cardContainer: {
        width: CARD_WIDTH,
        marginBottom: 8,
    },
    card: {

        width: CARD_WIDTH,
        backgroundColor: '#121212',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1A1A1A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardImageContainer: {
        width: '100%',
        aspectRatio: 1.1,
        backgroundColor: '#1A1A1A',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    durationBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    durationText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        color: '#FFC107',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    addButton: {
        flex: 1,
        height: 36,
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    bookNowButton: {
        flex: 1.2,
        height: 36,
        backgroundColor: '#FEC105',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    bookNowText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default HomeScreen;
