import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { ShoppingBag, ChevronRight } from 'lucide-react-native';
import { MotiView, AnimatePresence } from 'moti';
import { useCart } from '../context/CartContext';
import * as RootNavigation from '../utils/navigationRef';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const BAR_WIDTH = width * 0.9;

const CartFloatingBar = ({ currentRoute }) => {
    const { cartItems, totalPrice } = useCart();

    const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Hide if cart is empty or on specific screens
    const hiddenRoutes = ['Cart', 'Profile', 'PaymentGateway', 'RideHistory', 'RestaurantDetail', 'Visit', 'Events', 'Dining'];
    if (itemCount === 0 || hiddenRoutes.includes(currentRoute)) return null;

    return (
        <AnimatePresence>
            <MotiView
                from={{ translateY: 100, opacity: 0, scale: 0.95 }}
                animate={{ translateY: 0, opacity: 1, scale: 1 }}
                exit={{ translateY: 150, opacity: 0, scale: 0.9 }}
                transition={{
                    type: 'spring',
                    damping: 18,
                    stiffness: 120,
                    mass: 0.8
                }}
                style={styles.container}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        RootNavigation.navigate('Cart');
                    }}
                    style={styles.touchable}
                >
                    <View style={styles.outerShadow}>
                        <BlurView intensity={90} tint="dark" style={styles.blurContainer}>

                            {/* Animated Glowing Accent Ring behind the bag */}
                            <MotiView
                                from={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 80, delay: 200 }}
                                style={styles.glowRing}
                            />

                            <View style={styles.contentContainer}>
                                <View style={styles.leftInfo}>
                                    <View style={styles.iconContainer}>
                                        <ShoppingBag color="#FEC105" size={24} strokeWidth={2.5} />

                                        {/* Bouncing Badge */}
                                        <MotiView
                                            key={itemCount} // Re-animates when count changes
                                            from={{ scale: 0, translateY: -10 }}
                                            animate={{ scale: 1, translateY: 0 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                                            style={styles.badge}
                                        >
                                            <Text style={styles.badgeText}>{itemCount}</Text>
                                        </MotiView>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <View style={styles.titleRow}>
                                            <Text style={styles.itemCountText}>{itemCount === 1 ? '1 Item' : `${itemCount} Items`}</Text>
                                        </View>
                                        <Text style={styles.totalPriceText}>Total: ₹{totalPrice}</Text>
                                    </View>
                                </View>

                                <View style={styles.rightAction}>
                                    <Text style={styles.viewCartText}>Checkout</Text>
                                    <View style={styles.chevronCircle}>
                                        <ChevronRight color="#000" size={16} strokeWidth={3} />
                                    </View>
                                </View>
                            </View>
                        </BlurView>
                    </View>
                </TouchableOpacity>
            </MotiView>
        </AnimatePresence>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 125 : 115, // Lifted higher
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1000,
    },
    outerShadow: {
        shadowColor: '#FEC105',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
    },
    touchable: {
        width: BAR_WIDTH,
        borderRadius: 24,
    },
    blurContainer: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(254, 193, 5, 0.3)', // Subtle gold rim
    },
    glowRing: {
        position: 'absolute',
        left: 10,
        top: 2,
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'rgba(254, 193, 5, 0.25)',
        shadowColor: '#FEC105',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        zIndex: 2,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 12,
        minWidth: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#111',
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
    },
    textContainer: {
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    itemCountText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    totalPriceText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    rightAction: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEC105',
        paddingVertical: 10,
        paddingLeft: 16,
        paddingRight: 10,
        borderRadius: 22,
        shadowColor: '#FEC105',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    viewCartText: {
        color: '#000',
        fontSize: 15,
        fontWeight: '800',
        marginRight: 6,
        letterSpacing: 0.5,
    },
    chevronCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CartFloatingBar;
