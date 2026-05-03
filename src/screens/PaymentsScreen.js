import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const TRANSACTIONS = [];

const PaymentsScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: item.type === 'credit' ? '#E8F5E9' : '#FFEBEE' }]}>
                {item.type === 'credit' ? <ArrowDownLeft color="#2E7D32" size={24} /> : <ArrowUpRight color="#C62828" size={24} />}
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Success' ? '#E8F5E9' : '#FFF3E0' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Success' ? '#2E7D32' : '#EF6C00' }]}>{item.status}</Text>
                </View>
            </View>
            <Text style={[styles.amount, { color: item.type === 'credit' ? '#2E7D32' : '#000' }]}>{item.amount}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payments & Refunds</Text>
                <View style={{ width: 40 }} />
            </View>

            {TRANSACTIONS.length > 0 ? (
                <FlatList
                    data={TRANSACTIONS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Clock color="#ddd" size={80} />
                    <Text style={styles.emptyTitle}>No Transactions</Text>
                    <Text style={styles.emptySubtitle}>Your payment and refund history will appear here.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 6,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default PaymentsScreen;
