import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    Dimensions,
    Share,
    Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, ScanLine, MapPin, Calendar, Clock, Ticket as TicketIcon } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';

const { width } = Dimensions.get('window');

const TicketScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    const { booking } = route.params || {};

    const viewRef = useRef();

    const handleShare = async () => {
        try {
            const uri = await captureRef(viewRef, {
                format: "png",
                quality: 0.8
            });

            await Share.share({
                url: uri, // iOS
                message: `Here is my Ethree Ticket for ${booking.name}!`,
                title: 'Ethree Ticket'
            });

        } catch (error) {
            console.error("Oops, snapshot failed", error);
            alert("Failed to share ticket");
        }
    };

    if (!booking) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <Text>No Booking Found</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Digital Ticket</Text>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Share2 color="#fff" size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View
                    ref={viewRef}
                    collapsable={false}
                    style={styles.ticketContainer}
                >
                    {/* Brand Header */}
                    <View style={styles.brandHeader}>
                        <Image
                            source={require('../../assets/LOGO.png')}
                            style={styles.brandLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.brandTextTop}>ETHREE</Text>
                    </View>

                    {/* Top Section - Image & Event Info */}
                    <View style={styles.ticketTop}>
                        <Image
                            source={booking.image || require('../../assets/LOGO.png')}
                            style={styles.eventImage}
                            resizeMode="cover"
                        />
                        <View style={styles.eventOverlay}>
                            <View style={styles.eventTypeBadge}>
                                <Text style={styles.eventTypeText}>{booking.type || 'EVENT'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Middle Section - Details */}
                    <View style={styles.ticketMiddle}>
                        <Text style={styles.eventTitle}>{booking.name}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Calendar size={14} color="#8E8E93" />
                                <Text style={styles.infoText}>{booking.date}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Clock size={14} color="#8E8E93" />
                                <Text style={styles.infoText}>{booking.time}</Text>
                            </View>
                        </View>

                        <View style={styles.locationRow}>
                            <MapPin size={14} color="#8E8E93" />
                            <Text style={styles.infoText}>{booking.location}</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Ticket Holder Info */}
                        <View style={styles.holderContainer}>
                            <View style={styles.holderAvatarContainer}>
                                {user?.avatar ? (
                                    <Image source={{ uri: user.avatar }} style={styles.holderAvatar} />
                                ) : (
                                    <View style={styles.holderPlaceholder}>
                                        <Text style={styles.holderInitial}>
                                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.holderInfo}>
                                <Text style={styles.holderLabel}>TICKET HOLDER</Text>
                                <Text style={styles.holderName}>{user?.name || 'Guest User'}</Text>
                                <Text style={styles.holderPhone}>{user?.phone || '+91 98765 43210'}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statusRow}>
                            <View>
                                <Text style={styles.label}>ORDER ID</Text>
                                <Text style={styles.value}>{booking.id}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.label}>TICKETS</Text>
                                <Text style={styles.value}>{booking.tickets || 1}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Perforation Line */}
                    <View style={styles.perforationContainer}>
                        <View style={styles.circleLeft} />
                        <View style={styles.dashedLine} />
                        <View style={styles.circleRight} />
                    </View>

                    {/* Bottom Section - QR Code */}
                    <View style={styles.ticketBottom}>
                        <View style={styles.qrContainer}>
                            <QRCode
                                value={JSON.stringify({ id: booking.id, name: booking.name })}
                                size={140}
                                color="black"
                                backgroundColor="white"
                            />
                        </View>
                        <Text style={styles.qrText}>Scan this QR at the entry gate</Text>
                    </View>
                </View>



            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E', // Dark background for premium feel
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
    },
    backButton: {
        padding: 8,
    },
    shareButton: {
        padding: 8,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    ticketContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
    },
    brandHeader: {
        backgroundColor: '#000',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandLogo: {
        width: 60,
        height: 30,
        marginBottom: 6,
    },
    brandTextTop: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 2,
    },
    ticketTop: {
        height: 180,
        position: 'relative',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 16,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    eventTypeBadge: {
        backgroundColor: '#FEC105',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    eventTypeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
        textTransform: 'uppercase',
    },
    ticketMiddle: {
        padding: 20,
        paddingBottom: 24,
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 14,
        color: '#636366',
        marginLeft: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginVertical: 16,
        borderStyle: 'dashed', // React Native transparent border hack not needed for simple line
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 11,
        color: '#8E8E93',
        fontWeight: '600',
        marginBottom: 4,
    },
    value: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
    },
    perforationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: '#fff',
        position: 'relative',
        marginBottom: -1, // Remove gap
    },
    circleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#1C1C1E', // Match screen bg
        position: 'absolute',
        left: -10,
    },
    circleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#1C1C1E', // Match screen bg
        position: 'absolute',
        right: -10,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#C6C6C8',
        borderStyle: 'dashed',
        marginHorizontal: 16,
        borderRadius: 1,
    },
    ticketBottom: {
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#fff', // Ensure bg is white
    },
    qrContainer: {
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#fff',
    },
    qrText: {
        fontSize: 13,
        color: '#8E8E93',
        marginBottom: 20,
    },
    brandRow: {
        borderTopWidth: 1,
        borderTopColor: '#F2F2F7',
        width: '100%',
        alignItems: 'center',
        paddingTop: 16,
    },
    brandText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#C7C7CC',
        letterSpacing: 4,
    },
    walletButton: {
        marginTop: 24,
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    walletButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    holderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    holderAvatarContainer: {
        marginRight: 12,
    },
    holderAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    holderPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F2F2F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    holderInitial: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8E8E93',
    },
    holderInfo: {
        flex: 1,
    },
    holderLabel: {
        fontSize: 10,
        color: '#8E8E93',
        fontWeight: '600',
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    holderName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    holderPhone: {
        fontSize: 12,
        color: '#636366',
    },
});

export default TicketScreen;
