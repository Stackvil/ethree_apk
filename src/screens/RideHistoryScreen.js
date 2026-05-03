import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,  StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Ticket } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';

const RideHistoryScreen = () => {
    const navigation = useNavigation();

    const rideHistory = [
        { id: '1', name: '2D Theatre', date: 'Feb 5, 2026', price: '₹100', status: 'Completed' },
        { id: '2', name: 'Giant Wheel', date: 'Feb 1, 2026', price: '₹150', status: 'Completed' },
        { id: '3', name: 'Bumper Cars', date: 'Jan 28, 2026', price: '₹120', status: 'Completed' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {rideHistory.map((ride, index) => (
                    <MotiView
                        key={ride.id}
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: index * 100 }}
                        style={styles.historyItem}
                    >
                        <View style={styles.historyIcon}>
                            <Ticket color="#FEC105" size={20} />
                        </View>
                        <View style={styles.historyDetails}>
                            <Text style={styles.historyName}>{ride.name}</Text>
                            <Text style={styles.historyDate}>{ride.date}</Text>
                        </View>
                        <View style={styles.historyPriceContainer}>
                            <Text style={styles.historyPrice}>{ride.price}</Text>
                            <Text style={styles.historyStatus}>{ride.status}</Text>
                        </View>
                    </MotiView>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollContent: {
        padding: 20,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    historyIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    historyDetails: {
        flex: 1,
        marginLeft: 15,
    },
    historyName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    historyDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    historyPriceContainer: {
        alignItems: 'flex-end',
    },
    historyPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    historyStatus: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginTop: 2,
    },
});

export default RideHistoryScreen;
