import React, { useState, useMemo } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    SectionList,
    TextInput,
    ScrollView,
    Platform
} from 'react-native';
import { ChevronLeft, Share2, Star, Search, Percent, Info, CreditCard, BookOpen, X } from 'lucide-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MenuActionButton from '../components/MenuActionButton';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const RestaurantDetailScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { restaurant } = route?.params || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('ALL'); // ALL, VEG, NONVEG
    const [menuModalVisible, setMenuModalVisible] = useState(false);
    const [selectedMenuImage, setSelectedMenuImage] = useState(null);
    const scrollY = useSharedValue(0);


    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    if (!restaurant) {
        return (
            <View style={styles.centerContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // -------------------------------------------------------------------------
    // FILTER LOGIC
    // -------------------------------------------------------------------------
    const filteredSections = useMemo(() => {
        let menu = restaurant.menu || [];

        if (searchQuery) {
            menu = menu.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType === 'VEG') {
            menu = menu.filter(item => item.isVeg === true);
        } else if (filterType === 'NONVEG') {
            menu = menu.filter(item => item.isVeg === false);
        }

        return [{ title: 'Menu', data: menu }];
    }, [restaurant.menu, searchQuery, filterType]);

    // -------------------------------------------------------------------------
    // RENDERERS
    // -------------------------------------------------------------------------
    const topBarStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [0, 50], [0, 1], Extrapolation.CLAMP);
        return {
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            borderBottomWidth: opacity,
            borderBottomColor: 'rgba(0,0,0,0.05)',
        };
    });

    const topBarTitleStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value, [30, 60], [0, 1], Extrapolation.CLAMP);
        return { opacity };
    });

    const renderHeader = () => (
        <View style={styles.headerContentContainer}>
            <View style={styles.restaurantCard}>
                <Text style={styles.resName}>{restaurant.name}</Text>
                <Text style={styles.resCuisine}>North Indian, Chinese • ₹{restaurant.priceRange || '200'} for two</Text>

                <View style={styles.metaRow}>
                    <View style={styles.ratingBadge}>
                        <Star size={10} color="#fff" fill="#fff" />
                        <Text style={styles.ratingText}>4.3</Text>
                    </View>
                    <Text style={styles.metaDivider}>•</Text>
                    <Text style={styles.metaText}>Located inside Ethree Food Court</Text>
                </View>

                {/* View Menu Button for restaurants with menuImages */}
                {restaurant.menuImages && restaurant.menuImages.length > 0 && (
                    <TouchableOpacity 
                        style={styles.viewMenuBtn}
                        onPress={() => setMenuModalVisible(true)}
                    >
                        <BookOpen size={16} color="#000" />
                        <Text style={styles.viewMenuText}>View Full Menu</Text>
                    </TouchableOpacity>
                )}

                {/* Dine-In Payment Offer Banner */}

                <LinearGradient
                    colors={['#1c1c1e', '#2c2c2e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.paymentBanner}
                >
                    <View style={styles.paymentBannerContent}>
                        <View style={styles.paymentIconCircle}>
                            <Percent size={14} color="#FFF" />
                        </View>
                        <View style={styles.paymentTextCol}>
                            <Text style={styles.paymentTitle}>Pay via Ethree App & Get 10% OFF</Text>
                            <Text style={styles.paymentSubtitle}>Instant discount on your dine-in bill</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );

    const renderStickyHeader = () => (
        <View style={styles.stickyContainer}>
            <View style={styles.searchRow}>
                <View style={styles.searchBar}>
                    <Search size={16} color="#8E8E93" />
                    <TextInput
                        placeholder="Search in menu..."
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
                style={{ flexGrow: 0 }}
            >
                <TouchableOpacity
                    style={[styles.filterChip, filterType === 'VEG' && styles.filterChipVegActive]}
                    onPress={() => setFilterType(filterType === 'VEG' ? 'ALL' : 'VEG')}
                >
                    <View style={[styles.vegSquare, { borderColor: '#0f8a65' }]}>
                        <View style={[styles.vegDot, { backgroundColor: '#0f8a65' }]} />
                    </View>
                    <Text style={[styles.filterText, filterType === 'VEG' && { color: '#0f8a65', fontWeight: '700' }]}>Veg</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterChip, filterType === 'NONVEG' && styles.filterChipNonVegActive]}
                    onPress={() => setFilterType(filterType === 'NONVEG' ? 'ALL' : 'NONVEG')}
                >
                    <View style={[styles.vegSquare, { borderColor: '#D32F2F' }]}>
                        <View style={[styles.vegDot, { backgroundColor: '#D32F2F' }]} />
                    </View>
                    <Text style={[styles.filterText, filterType === 'NONVEG' && { color: '#D32F2F', fontWeight: '700' }]}>Non-Veg</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Bestseller</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterChip}>
                    <Text style={styles.filterText}>Rated 4.0+</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            <View style={styles.itemLeft}>
                <View style={[styles.vegSquare, { borderColor: item.isVeg === false ? '#D32F2F' : '#0f8a65', marginBottom: 6 }]}>
                    <View style={[styles.vegDot, { backgroundColor: item.isVeg === false ? '#D32F2F' : '#0f8a65' }]} />
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
            </View>

            <View style={styles.itemRight}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={
                            item.image
                                ? (typeof item.image === 'string' ? { uri: item.image } : item.image)
                                : (typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image)
                        }
                        style={styles.itemImage}
                    />
                    <View style={styles.addButtonShifted}>
                        <MenuActionButton item={item} restaurant={restaurant} />
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Animated.View style={[styles.topBar, topBarStyle, { paddingTop: insets.top, height: 44 + insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                    <ChevronLeft size={24} color="#1C1C1E" />
                </TouchableOpacity>
                <Animated.View style={[styles.titleContainer, topBarTitleStyle]}>
                    <Text style={styles.navTitle} numberOfLines={1}>{restaurant.name}</Text>
                </Animated.View>
                <View style={styles.rightNav}>
                    {/* Placeholder for table icon */}
                </View>
            </Animated.View>

            <AnimatedSectionList
                sections={filteredSections}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                renderSectionHeader={renderStickyHeader}
                stickySectionHeadersEnabled={true}
                contentContainerStyle={{ paddingBottom: 120, paddingTop: 44 + insets.top }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    restaurant.menuImages && restaurant.menuImages.length > 0 ? (
                        <View style={styles.emptyMenuContainer}>
                            <BookOpen size={48} color="#ccc" />
                            <Text style={styles.emptyMenuTitle}>Digital Menu Available</Text>
                            <Text style={styles.emptyMenuSubtitle}>This restaurant has a physical menu scan available.</Text>
                            <TouchableOpacity 
                                style={styles.emptyViewMenuBtn}
                                onPress={() => setMenuModalVisible(true)}
                            >
                                <Text style={styles.emptyViewMenuText}>Open Digital Menu</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            />

            {/* Menu Images Modal */}
            {menuModalVisible && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 1000, backgroundColor: 'rgba(0,0,0,0.95)' }]}>
                    <View style={{ paddingTop: insets.top + 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity 
                            onPress={() => {
                                setMenuModalVisible(false);
                                setSelectedMenuImage(null);
                            }}
                            style={styles.closeBtn}
                        >
                            <X size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView contentContainerStyle={styles.menuScrollView}>
                        {restaurant.menuImages.map((img, idx) => (
                            <TouchableOpacity 
                                key={idx} 
                                activeOpacity={0.9}
                                onPress={() => setSelectedMenuImage(img)}
                            >
                                <Image 
                                    source={{ uri: img }} 
                                    style={styles.fullMenuImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.menuPageIndicator}>
                                    <Text style={styles.menuPageText}>Page {idx + 1} of {restaurant.menuImages.length}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Full Screen Image Zoom (Simplified) */}
            {selectedMenuImage && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 2000, backgroundColor: '#000' }]}>
                    <TouchableOpacity 
                        style={[styles.closeBtn, { position: 'absolute', top: insets.top + 20, right: 20, zIndex: 2001 }]}
                        onPress={() => setSelectedMenuImage(null)}
                    >
                        <X size={24} color="#fff" />
                    </TouchableOpacity>
                    <Image 
                        source={{ uri: selectedMenuImage }} 
                        style={{ flex: 1 }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    navBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    navTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    rightNav: {
        width: 40,
    },
    headerContentContainer: {
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    restaurantCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
    resName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 4,
        textAlign: 'center',
    },
    resCuisine: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
        textAlign: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginRight: 8,
    },
    ratingText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
        marginLeft: 2,
    },
    metaDivider: {
        fontSize: 12,
        color: '#ccc',
        marginHorizontal: 8,
    },
    metaText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    // Payment Banner
    paymentBanner: {
        width: '100%',
        borderRadius: 12,
        padding: 12,
        marginTop: 4,
    },
    paymentBannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    paymentTextCol: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
    },
    paymentSubtitle: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
    },
    stickyContainer: {
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    searchRow: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        height: 44,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        color: '#1C1C1E',
        height: '100%',
    },
    filterRow: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5EA',
        marginRight: 10,
    },
    filterChipVegActive: {
        borderColor: '#0f8a65',
        backgroundColor: '#E8F5E9',
    },
    filterChipNonVegActive: {
        borderColor: '#D32F2F',
        backgroundColor: '#FFEBEE',
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    vegSquare: {
        width: 14,
        height: 14,
        borderWidth: 1,
        borderColor: '#0f8a65',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
        borderRadius: 2,
    },
    vegDot: {
        width: 8,
        height: 8,
        backgroundColor: '#0f8a65',
        borderRadius: 4,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 8,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1C1C1E',
        letterSpacing: -0.5,
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        backgroundColor: '#fff',
    },
    itemLeft: {
        flex: 1,
        paddingRight: 12,
    },
    itemName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1C1C1E',
        marginBottom: 6,
    },
    itemDesc: {
        fontSize: 13,
        color: '#8E8E93',
        lineHeight: 18,
    },
    itemRight: {
        width: 120,
        alignItems: 'center',
    },
    imageWrapper: {
        width: 120,
        height: 120,
        position: 'relative',
        alignItems: 'center',
    },
    itemImage: {
        width: 120,
        height: 110,
        borderRadius: 16,
        backgroundColor: '#F2F2F7',
    },
    addButtonShifted: {
        position: 'absolute',
        bottom: 0,
    },
    viewMenuBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEC105',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 5,
        gap: 8,
    },
    viewMenuText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    emptyMenuContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyMenuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginTop: 16,
    },
    emptyMenuSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    emptyViewMenuBtn: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
    },
    emptyViewMenuText: {
        color: '#fff',
        fontWeight: '700',
    },
    menuScrollView: {
        paddingBottom: 40,
    },
    fullMenuImage: {
        width: width,
        height: width * 1.4,
        marginBottom: 20,
    },
    menuPageIndicator: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    menuPageText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    closeBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default RestaurantDetailScreen;
