import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { ChevronRight, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 16;
// 2-column grid calculation
const CARD_WIDTH = (width - (PADDING * 2) - GAP) / 2;

const RestaurantCard = ({ restaurant, index, onPress }) => {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                type: 'spring',
                delay: index * 50,
                damping: 20,
            }}
            style={styles.cardContainer}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={onPress}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    {/* Optional Rating Badge if data existed, mocking for now */}
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>4.5</Text>
                        <Star size={8} color="#fff" fill="#fff" style={{ marginLeft: 2 }} />
                    </View>
                </View>

                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
                    <Text style={styles.category} numberOfLines={1}>Restaurant • {restaurant.menu?.length || 4} Items</Text>

                    <View style={styles.footer}>
                        <Text style={styles.viewMenu}>MENU</Text>
                        <View style={styles.menuIcon}>
                            <ChevronRight size={14} color="#000" strokeWidth={2.5} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH,
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        // Apple "Float" Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05, // Very diffused
        shadowRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 4 / 3, // Standard photography ratio
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F2F2F7',
        marginBottom: 12,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
    },
    info: {
        width: '100%',
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 2,
        letterSpacing: -0.3,
    },
    category: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 10,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F2F2F7',
        paddingTop: 8,
    },
    viewMenu: {
        fontSize: 11,
        color: '#000',
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    menuIcon: {
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RestaurantCard;
