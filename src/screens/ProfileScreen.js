import React, { useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, User, Settings, LogOut, Ticket, HelpCircle, ShieldCheck, CreditCard, Gift, ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { testBookingCreationSupport } from '../utils/api';
import PageFooter from '../components/PageFooter';


import EditProfileModal from '../components/EditProfileModal';
import MyBookingsModal from '../components/MyBookingsModal';
import { LinearGradient } from 'expo-linear-gradient';



const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { bookings, isLoadingBookings, fetchBookings } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [bookingsModalVisible, setBookingsModalVisible] = useState(false);

    // Initial profile state if needed for editing, but main display comes from user context
    const [profile, setProfile] = useState({
        name: 'Ethree Enthusiast',
        email: 'user@Ethree.in',
        phone: '',
        avatar: null
    });

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                    }
                }
            ]
        );
    };

    const handleSaveProfile = (updatedProfile) => {
        setProfile({ ...profile, ...updatedProfile });
        // In a real app, we'd also update the AuthContext/Backend here
    };

    const MenuItem = ({ icon: Icon, title, subtitle, onPress, isDestructive = false }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIconContainer, isDestructive && styles.destructiveIconBase]}>
                <Icon size={20} color={isDestructive ? '#FF3B30' : '#000'} />
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, isDestructive && styles.destructiveText]}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <ChevronRight size={16} color="#C7C7CC" />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
            <View style={styles.safeArea}>
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                        {/* <Text style={styles.headerButtonText}>Back</Text> OR Icon */}
                        <ChevronLeft size={24} color="#007AFF" />
                        {/* Typically iOS profile tabs don't have back if it is a tab, but if navigated to, yes. keeping consistent */}
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={styles.headerButton} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* User Info Card */}
                    <View style={styles.userCard}>
                        {isAuthenticated ? (

                            <>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{user.name || 'Ethree Enthusiast'}</Text>
                                    <Text style={styles.userPhone}>
                                        {user.phone ? (user.phone.startsWith('+91') ? user.phone : `+91 ${user.phone}`) : 'No Number Provided'}
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                                        <Text style={styles.editProfileLink}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                        ) : (
                            <View style={styles.guestContainer}>
                                <Text style={styles.guestTitle}>Welcome to Ethree</Text>
                                <Text style={styles.guestSubtitle}>Login to manage bookings, track refunds, and get exclusive offers.</Text>
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={styles.loginButtonText}>Login / Signup</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Menu Groups */}
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon={Ticket}
                            title="My Bookings"
                            subtitle="Events, Dining, Rides"
                            onPress={() => {
                                if (user) setBookingsModalVisible(true);
                                else navigation.navigate('Login');
                            }}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={CreditCard}
                            title="Payments & Refund"
                            onPress={() => {
                                if (user) navigation.navigate('Payments');
                                else navigation.navigate('Login');
                            }}
                        />
                    </View>

                    <Text style={styles.groupHeader}>PREFERENCES</Text>
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon={Gift}
                            title="Offers & Rewards"
                            onPress={() => navigation.navigate('Offers')}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={Settings}
                            title="Settings"
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </View>

                    <Text style={styles.groupHeader}>SUPPORT</Text>
                    <View style={styles.menuGroup}>
                        <MenuItem
                            icon={HelpCircle}
                            title="Help & Support"
                            onPress={() => navigation.navigate('Help')}
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={ShieldCheck}
                            title="Diagnostics Test"
                            subtitle="Check Booking Creation"
                            onPress={() => {
                                Alert.alert("Running Test", "Checking production checkout endpoint...");
                                testBookingCreationSupport();
                            }}
                        />



                        {isAuthenticated && (

                            <>
                                <View style={styles.divider} />
                                <MenuItem
                                    icon={LogOut}
                                    title="Logout"
                                    isDestructive
                                    onPress={handleLogout}
                                />
                            </>
                        )}
                    </View>

                    <Text style={styles.versionText}>Version 1.0.0 • Ethree</Text>

                    <PageFooter />

                </ScrollView>
            </View>

            {/* Modals */}
            <EditProfileModal
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                initialData={profile}
                onSave={handleSaveProfile}
            />

            <MyBookingsModal
                visible={bookingsModalVisible}
                onClose={() => setBookingsModalVisible(false)}
                bookings={bookings}
                isLoading={isLoadingBookings}
                onRefresh={fetchBookings}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F2F2F7', // iOS Grouped Background Color
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F2F2F7', // Match bg or white
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#C6C6C8',
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerButtonText: {
        fontSize: 17,
        color: '#007AFF',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 24,
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },

    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 15,
        color: '#8E8E93',
        marginBottom: 8,
    },
    editProfileLink: {
        fontSize: 15,
        color: '#007AFF',
        fontWeight: '600',
    },
    groupHeader: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
        marginLeft: 32,
        marginBottom: 8,
        marginTop: 16,
        letterSpacing: 0.5,
    },
    menuGroup: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    destructiveIconBase: {
        backgroundColor: '#FF3B3015',
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    destructiveText: {
        color: '#FF3B30',
        fontWeight: '600',
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#C6C6C8',
        marginLeft: 68, // Align with text start
    },
    versionText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#C7C7CC',
        marginTop: 30,
        marginBottom: 10,
    },
    guestContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    guestTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    guestSubtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        lineHeight: 18,
    },
    loginButton: {
        backgroundColor: '#000',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 25,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default ProfileScreen;
