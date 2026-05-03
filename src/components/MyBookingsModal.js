import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, Image, StatusBar, Platform, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Calendar, MapPin, Ticket, Clock, Utensils } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const MyBookingsModal = ({ visible, onClose, bookings = [], isLoading = false, onRefresh }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const handlePressBooking = (item) => {
        onClose();
        navigation.navigate('TicketScreen', { booking: item });
    };

    const renderBookingItem = ({ item }) => {
        let IconComponent = Ticket;
        let iconColor = '#007AFF';
        let statusColor = '#34C759'; // Green for confirmed

        if (item.type === 'dining') {
            IconComponent = Utensils;
            iconColor = '#FF9500';
        } else if (item.type === 'ride') {
            IconComponent = Ticket; // Or Car/Gamepad
            iconColor = '#AF52DE';
        }

        return (
            <TouchableOpacity
                style={styles.bookingCard}
                onPress={() => handlePressBooking(item)}
                activeOpacity={0.7}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                        <IconComponent size={20} color={iconColor} />
                    </View>
                    <View style={styles.headerText}>
                        <Text style={styles.bookingType}>{item.type?.toUpperCase() || 'EVENT'}</Text>
                        <Text style={styles.bookingDate}>{item.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>{item.status || 'Confirmed'}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardContent}>
                    <Text style={styles.bookingTitle}>{item.name}</Text>
                    <View style={styles.detailsRow}>
                        {item.location && (
                            <View style={styles.detailItem}>
                                <MapPin size={14} color="#8E8E93" />
                                <Text style={styles.detailText}>{item.location}</Text>
                            </View>
                        )}
                        {item.time && (
                            <View style={styles.detailItem}>
                                <Clock size={14} color="#8E8E93" />
                                <Text style={styles.detailText}>{item.time}</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.ticketRow}>
                        <Text style={styles.ticketLabel}>Tickets: <Text style={styles.ticketValue}>{item.tickets || 1}</Text></Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="pageSheet"
        >
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Bookings</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <View style={styles.closeIconCircle}>
                            <X size={20} color="#3C3C43" />
                        </View>
                    </TouchableOpacity>
                </View>

                {bookings.length > 0 ? (
                    <FlatList
                        data={bookings}
                        renderItem={renderBookingItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={onRefresh}
                                colors={['#007AFF']}
                                tintColor="#007AFF"
                            />
                        }
                    />
                ) : (
                    <View style={styles.emptyState}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#007AFF" />
                        ) : (
                            <>
                                <Image
                                    source={require('../../assets/LOGO.png')} // Or a specific empty state image if available
                                    style={styles.emptyImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.emptyTitle}>No Bookings Yet</Text>
                                <Text style={styles.emptySubtitle}>You haven't made any bookings. Explore events, dining, and rides to get started!</Text>
                                <TouchableOpacity style={styles.exploreButton} onPress={() => {
                                    onClose();
                                    navigation.navigate('MainTabs', { screen: 'Home' });
                                }}>
                                    <Text style={styles.exploreButtonText}>Start Exploring</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    closeButton: {
        padding: 4,
    },
    closeIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E5E5EA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    bookingCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)', // Web syntax but acts as shadow on some
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    bookingType: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8E8E93',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    bookingDate: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: '#F2F2F7',
        marginHorizontal: 16,
    },
    cardContent: {
        padding: 16,
        paddingTop: 12,
    },
    bookingTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 13,
        color: '#636366',
        marginLeft: 6,
    },
    ticketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    ticketLabel: {
        fontSize: 14,
        color: '#8E8E93',
    },
    ticketValue: {
        color: '#000',
        fontWeight: '600',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyImage: {
        width: 100,
        height: 100,
        marginBottom: 24,
        opacity: 0.3,
        tintColor: '#8E8E93'
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    exploreButton: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
    },
    exploreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default MyBookingsModal;
