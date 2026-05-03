
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { Minus, Plus } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const MENU_BUTTON_WIDTH = 90;
const MENU_BUTTON_HEIGHT = 36;
const STEPPER_WIDTH = 100;

const MenuActionButton = ({ item, restaurant }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();

    // Find quantity in cart
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    // Animation values
    const width = useSharedValue(quantity > 0 ? STEPPER_WIDTH : MENU_BUTTON_WIDTH);
    const opacity = useSharedValue(quantity > 0 ? 1 : 1); // Always visible

    useEffect(() => {
        if (quantity > 0) {
            width.value = withSpring(STEPPER_WIDTH, { damping: 15, stiffness: 100 });
        } else {
            width.value = withSpring(MENU_BUTTON_WIDTH, { damping: 15, stiffness: 100 });
        }
    }, [quantity]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
        };
    });

    const triggerHaptic = () => {
        Vibration.vibrate(10); // Light vibration
    };

    const handleAdd = () => {
        triggerHaptic();
        addToCart({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name, image: restaurant.image });
    };

    const handleRemove = () => {
        triggerHaptic();
        removeFromCart(item.id);
    };

    if (quantity === 0) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
                <Animated.View style={[styles.addButton, animatedStyle]}>
                    <Text style={styles.addButtonText}>ADD</Text>
                    <View style={styles.plusIcon}>
                        <Plus size={14} color="#61C946" strokeWidth={3} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <Animated.View style={[styles.stepperContainer, animatedStyle]}>
            <TouchableOpacity onPress={handleRemove} style={styles.stepperBtn}>
                <Minus size={16} color="#61C946" strokeWidth={2.5} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity onPress={handleAdd} style={styles.stepperBtn}>
                <Plus size={16} color="#61C946" strokeWidth={2.5} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    addButton: {
        height: MENU_BUTTON_HEIGHT,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        position: 'relative',
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#61C946', // Swiggy/Zomato Green
        marginRight: 4,
    },
    plusIcon: {
        position: 'absolute',
        top: 2,
        right: 4,
    },
    stepperContainer: {
        height: MENU_BUTTON_HEIGHT,
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: '#61C946',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    stepperBtn: {
        width: 30,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#61C946',
    },
});

export default MenuActionButton;
