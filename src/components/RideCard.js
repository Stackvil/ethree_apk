import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock } from 'lucide-react-native';
import { useCart } from '../context/CartContext';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

const RideCard = ({ ride, index = 0 }) => {
    const navigation = useNavigation();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleAdd = () => {
        addToCart(ride);
        // Removed auto-navigation to Cart
    };

    return (
        <MotiView
            from={{ opacity: 0, translateY: 50, scale: 0.8 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{
                type: 'timing',
                duration: 600,
                delay: index * 100,
            }}
            style={styles.card}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cardPressable}
                onPress={() => { }}
            >
                <View style={styles.imageContainer}>
                    <Image source={ride.imageSource} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.timeBadge}>
                        <Clock size={10} color="#666" />
                        <Text style={styles.timeText}>{ride.time}</Text>
                    </View>
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>{ride.title}</Text>
                <Text style={styles.cardUnit}>{ride.unit}</Text>
                <Text style={styles.cardPrice}>{ride.price}</Text>
                <TouchableOpacity
                    style={[styles.addButton, isAdded && styles.addedButton]}
                    onPress={handleAdd}
                >
                    <MotiView
                        animate={{ scale: isAdded ? 1.2 : 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <Text style={[styles.addButtonText, isAdded && styles.addedButtonText]}>
                            {isAdded ? 'ADDED ✓' : 'ADD'}
                        </Text>
                    </MotiView>
                </TouchableOpacity>
            </TouchableOpacity>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        marginBottom: 20,
    },
    cardPressable: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f8f8f8',
        marginBottom: 8,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    timeBadge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderTopRightRadius: 4,
    },
    timeText: {
        fontSize: 10,
        color: '#666',
        marginLeft: 2,
        fontWeight: '600',
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
        height: 36,
    },
    cardUnit: {
        fontSize: 11,
        color: '#999',
        marginVertical: 2,
    },
    cardPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    addButton: {
        borderWidth: 1,
        borderColor: '#2e7d32',
        borderRadius: 6,
        paddingVertical: 6,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#2e7d32',
        fontSize: 12,
        fontWeight: 'bold',
    },
    addedButton: {
        backgroundColor: '#2e7d32',
        borderColor: '#2e7d32',
    },
    addedButtonText: {
        color: '#fff',
    },
});

export default RideCard;
