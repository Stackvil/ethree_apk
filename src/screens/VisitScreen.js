import React, { useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Linking,
    Dimensions,
    Image,
    FlatList
} from 'react-native';
import { 
    MapPin,
    Phone,
    Clock,
    Car,
    Bus,
    Mail,
    ExternalLink,
    Send,
    User
} from 'lucide-react-native';

import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageFooter from '../components/PageFooter';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const ORANGE = '#F97316';

const VisitScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { user } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const openMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=Ethree+Vijayawada+Opp+APSRTC+Bus+Stand`;
        Linking.openURL(url);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.headerNav}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/LOGO.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.navBrand}>ETHREE</Text>
                </View>
                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <User size={20} color="#000" />
                </TouchableOpacity>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    style={styles.hero}
                >
                    <Text style={styles.heroPreTitle}>VISIT Ethree</Text>
                    <Text style={styles.heroTitle}>
                        Get in Touch With{"\n"}
                        <Text style={styles.orangeText}>The River.</Text>
                    </Text>
                    <View style={styles.orangeUnderline} />
                    <Text style={styles.heroDescription}>
                        Located at the heart of Vijayawada's riverfront, Ethree is easily accessible from any part of the city. We're right opposite the APSRTC Bus Stand.
                    </Text>
                </MotiView>

                {/* Basic Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>BASIC INFO</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoItem}>
                            <View style={styles.iconCircle}>
                                <MapPin color={ORANGE} size={18} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>ADDRESS</Text>
                                <Text style={styles.infoValue}>Opp. APSRTC Bus Stand, Padmavathi Ghat, Krishnalanka, Vijayawada 520013</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoItem}>
                            <View style={styles.iconCircle}>
                                <Phone color={ORANGE} size={18} />
                            </View>
                            <TouchableOpacity style={styles.infoTextContainer} onPress={() => Linking.openURL('tel:07036923456')}>
                                <Text style={styles.infoLabel}>PHONE</Text>
                                <Text style={styles.infoValue}>070369 23456</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoItem}>
                            <View style={styles.iconCircle}>
                                <Clock color={ORANGE} size={18} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>OPERATING HOURS</Text>
                                <Text style={styles.infoValue}>Daily: 9:00 AM – 11:00 PM</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Map Section */}
                <View style={[styles.section, { marginTop: 0 }]}>
                    <Text style={styles.sectionLabel}>MAP</Text>
                    <View style={styles.mapPlaceholder}>
                        <View style={styles.mapMarker}>
                            <View style={styles.markerCircle}>
                                <Text style={styles.markerText}>E3</Text>
                            </View>
                            <View style={styles.markerInfo}>
                                <Text style={styles.markerTitle}>Ethree Vijayawada</Text>
                                <Text style={styles.markerSub}>Opp. APSRTC Bus Stand</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.mapButton} onPress={openMaps}>
                            <Text style={styles.mapButtonText}>OPEN IN MAPS</Text>
                            <ExternalLink color="#fff" size={14} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Transport Info */}
                <View style={styles.transportContainer}>
                    <View style={styles.transportItem}>
                        <View style={styles.transportHeader}>
                            <Car color="#000" size={20} />
                            <Text style={styles.transportTitle}>MANAGED PARKING</Text>
                        </View>
                        <Text style={styles.transportText}>Fixed rate of ₹30 for all vehicles.</Text>
                    </View>
                    <View style={styles.transportItem}>
                        <View style={styles.transportHeader}>
                            <Bus color="#000" size={20} />
                            <Text style={styles.transportTitle}>PUBLIC TRANSPORT</Text>
                        </View>
                        <Text style={styles.transportText}>Right opposite the main PNBS hub.</Text>
                    </View>
                </View>

                {/* Contact Form - Standout Orange Section */}
                <View style={styles.contactFormSection}>
                    <MotiView
                        from={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={styles.orangeCard}
                    >
                        <Text style={styles.orangeCardTitle}>HAVE A QUESTION?</Text>
                        <Text style={styles.orangeCardSubtitle}>
                            Whether you're planning a large party or just want to know about today's special stall, our team is ready to help.
                        </Text>

                        <View style={styles.orangeDivider} />

                        <View style={styles.emailContainer}>
                            <Mail color="#fff" size={16} />
                            <Text style={styles.emailText}>hello@Ethree.in</Text>
                        </View>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.whiteInput}
                                placeholder="Full Name"
                                placeholderTextColor="#999"
                                value={form.name}
                                onChangeText={t => setForm({ ...form, name: t })}
                            />
                            <TextInput
                                style={styles.whiteInput}
                                placeholder="Email Address"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                value={form.email}
                                onChangeText={t => setForm({ ...form, email: t })}
                            />
                            <TextInput
                                style={[styles.whiteInput, styles.textArea]}
                                placeholder="Your Message"
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={4}
                                value={form.message}
                                onChangeText={t => setForm({ ...form, message: t })}
                            />
                            <TouchableOpacity
                                style={styles.whiteButton}
                                onPress={() => {
                                    if (!form.name || !form.email || !form.message) {
                                        alert("Please fill all fields.");
                                        return;
                                    }
                                    Linking.openURL(`mailto:hello@Ethree.in?subject=Inquiry from ${form.name}&body=${form.message}`);
                                }}
                            >
                                <Text style={styles.whiteButtonText}>SEND MESSAGE</Text>
                                <Send color={ORANGE} size={18} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </MotiView>
                </View>

                {/* Footer - Replaced with Shared Component */}
                <PageFooter />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 0,
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    logo: {
        width: 75,
        height: 35,
    },
    navBrand: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        marginLeft: 15,
        letterSpacing: -0.5,
    },
    hero: {
        padding: 24,
        paddingTop: 40,
        alignItems: 'center',
        textAlign: 'center', // Fix for center alignment
    },
    heroPreTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: ORANGE,
        letterSpacing: 2,
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 42,
        fontWeight: '900',
        color: '#000',
        lineHeight: 48,
        textAlign: 'center',
    },
    orangeText: {
        color: ORANGE,
    },
    orangeUnderline: {
        width: 80,
        height: 6,
        backgroundColor: ORANGE,
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 3,
        alignSelf: 'center',
    },
    heroDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 26,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    section: {
        padding: 20,
        marginTop: 20,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#999',
        letterSpacing: 2,
        marginBottom: 15,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: ORANGE + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '800',
        letterSpacing: 1,
    },
    infoValue: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
        marginTop: 2,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: '#F7F7F7',
        marginVertical: 4,
    },
    mapPlaceholder: {
        height: 300,
        backgroundColor: '#F3F4F6',
        borderRadius: 24,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mapMarker: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        paddingRight: 20,
        borderRadius: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    markerCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#059669', // Teal-ish from logo
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    markerInfo: {
        marginLeft: 12,
    },
    markerTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#000',
    },
    markerSub: {
        fontSize: 11,
        color: '#666',
        fontWeight: '500',
    },
    mapButton: {
        position: 'absolute',
        bottom: 24,
        backgroundColor: ORANGE,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 30,
        shadowColor: ORANGE,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    mapButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 1,
    },
    transportContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    transportItem: {
        width: '48%',
        backgroundColor: '#FAFAFA',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    transportHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    transportTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#000',
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    transportText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
        fontWeight: '500',
    },
    contactFormSection: {
        padding: 20,
        marginTop: 30,
        marginBottom: 40,
    },
    orangeCard: {
        backgroundColor: ORANGE,
        borderRadius: 32,
        padding: 28,
        shadowColor: ORANGE,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 10,
    },
    orangeCardTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 1,
        marginBottom: 10,
    },
    orangeCardSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 22,
        fontWeight: '500',
    },
    orangeDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 20,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    emailText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    form: {
        gap: 12,
    },
    whiteInput: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    whiteButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    whiteButtonText: {
        color: ORANGE,
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 1,
    },
    profileButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F2F2F7',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default VisitScreen;
