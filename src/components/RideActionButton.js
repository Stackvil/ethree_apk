import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import { useCart } from '../context/CartContext';


const RideActionButton = ({ ride }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();

    const cartItem = useMemo(() =>
        cartItems.find(item => item.id === ride.id),
        [cartItems, ride.id]);

    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        // Haptic feedback could be added here if expo-haptics was installed
        addToCart(ride);
    };

    const handleRemove = () => {
        removeFromCart(ride.id);
    };

    return (
        <View style={styles.container}>
            {quantity === 0 ? (
                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={handleAdd}
                >
                    <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.stepperContainer}>
                    <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={handleRemove}
                        activeOpacity={0.6}
                    >
                        <Minus size={14} color="#fff" strokeWidth={3} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={handleAdd}
                        activeOpacity={0.6}
                    >
                        <Plus size={14} color="#fff" strokeWidth={3} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 28, // Fixed height to maintain alignment
        justifyContent: 'center',
        alignItems: 'flex-end', // Align to right usually
        minWidth: 50, // Ensure space for animation
    },
    addButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
    },
    addButtonText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000',
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000', // Premium dark background
        borderRadius: 6,
        paddingHorizontal: 2,
        height: 28,
        width: 70, // Explicit width for the stepper state
    },
    stepperBtn: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
});

export default RideActionButton;
