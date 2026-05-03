import React, { useEffect, useRef } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { Check, ArrowRight } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const BookingSuccessScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { bookings } = route.params || { bookings: [] };

    const handleViewTicket = () => {
        // Navigate to Ticket Screen with the first booking or all
        navigation.replace('TicketScreen', { booking: bookings[0], allBookings: bookings });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Success Animation Circle */}
                <MotiView
                    from={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    style={styles.successCircle}
                >
                    <Check size={50} color="#fff" strokeWidth={3} />
                </MotiView>

                {/* Text Content */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 300 }}
                    style={styles.textContainer}
                >
                    <Text style={styles.title}>Payment Successful!</Text>
                    <Text style={styles.subtitle}>
                        Your booking for {bookings.length} item(s) has been confirmed.
                    </Text>
                </MotiView>

                {/* Action Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 600 }}
                    style={styles.cardContainer}
                >
                    <TouchableOpacity style={styles.ticketButton} onPress={handleViewTicket}>
                        <Text style={styles.ticketButtonText}>View Digital Ticket</Text>
                        <ArrowRight color="#fff" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('MainTabs')}
                    >
                        <Text style={styles.homeButtonText}>Back to Home</Text>
                    </TouchableOpacity>
                </MotiView>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 40,
    },
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#34C759', // iOS Success Green
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#34C759',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    cardContainer: {
        width: '100%',
        gap: 16,
    },
    ticketButton: {
        backgroundColor: '#000',
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    ticketButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    homeButton: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    homeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BookingSuccessScreen;
