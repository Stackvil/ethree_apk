import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import PaymentWebView from '../components/payment/PaymentWebView';
import PaymentStatus from '../components/payment/PaymentStatus';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { totalPrice, cartItems, createBooking, clearCart, checkout, fetchBookings } = useCart();
    const { user } = useAuth();

    const [processing, setProcessing] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [statusVisible, setStatusVisible] = useState(false);
    const [statusMode, setStatusMode] = useState('awaiting'); // awaiting, success, error

    const handlePayment = async () => {
        setProcessing(true);
        try {
            const response = await checkout();
            
            if (response.payment_url) {
                setPaymentUrl(response.payment_url);
                setPaymentVisible(true);
                setStatusMode('awaiting');
            } else {
                throw new Error("No payment URL received");
            }
        } catch (error) {
            console.error('Payment Initialization Failed', error);
            setStatusMode('error');
            setStatusVisible(true);
        } finally {
            setProcessing(false);
        }
    };

    const handlePaymentSuccess = async () => {
        setPaymentVisible(false);
        setStatusMode('success');
        setStatusVisible(true);
        
        try {
            // Refresh bookings list from AWS backend
            // The server status is updated via payment gateway webhook
            await fetchBookings();
            
            // Cleanup local state
            clearCart();
        } catch (e) {
            console.error("Post-payment refresh failed", e);
            clearCart();
        }
    };

    const handlePaymentFailure = () => {
        setPaymentVisible(false);
        setStatusMode('error');
        setStatusVisible(true);
    };

    const handleDone = () => {
        setStatusVisible(false);
        navigation.navigate('MainTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Payment</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Order Summary Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Order Summary</Text>
                    {cartItems.map((item, index) => (
                        <View key={index} style={styles.orderItem}>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.title}</Text>
                                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                            </View>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>₹{totalPrice.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Secure Payment Note */}
                <View style={styles.secureNote}>
                    <ShieldCheck size={16} color="#009944" />
                    <Text style={styles.secureText}>100% Secure Transaction via Easebuzz</Text>
                </View>

            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, processing && styles.processingButton]}
                    onPress={handlePayment}
                    disabled={processing}
                >
                    {processing ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.payButtonText}>Proceed to Pay ₹{totalPrice.toFixed(2)}</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Payment Modals from tab software */}
            <PaymentWebView 
                visible={paymentVisible} 
                url={paymentUrl} 
                onCancel={() => setPaymentVisible(false)} 
                onSuccess={handlePaymentSuccess} 
                onFailure={handlePaymentFailure} 
            />
            
            <PaymentStatus 
                visible={statusVisible} 
                status={statusMode} 
                onRetry={handlePayment} 
                onCancel={() => setStatusVisible(false)} 
                onDone={handleDone} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
        color: '#8E8E93',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    itemQuantity: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    secureNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    secureText: {
        fontSize: 13,
        color: '#009944',
        marginLeft: 8,
        fontWeight: '500',
    },
    demoBanner: {
        backgroundColor: '#FFF8E1',
        borderWidth: 1,
        borderColor: '#FFECB3',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    demoTitle: {
        color: '#F57F17',
        fontWeight: '900',
        fontSize: 12,
        marginBottom: 4,
        letterSpacing: 1,
    },
    demoText: {
        fontSize: 13,
        color: '#7f5100',
        textAlign: 'center',
        lineHeight: 18,
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    payButton: {
        backgroundColor: '#000',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    processingButton: {
        backgroundColor: '#333',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;
