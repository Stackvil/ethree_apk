import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Facebook, Instagram, Twitter } from 'lucide-react-native';

const PageFooter = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.footerContent}>
                <View style={styles.footerBrandRow}>
                    <Image
                        source={require('../../assets/LOGO.png')}
                        style={styles.footerLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerBrand}>ETHREE</Text>
                </View>

                <Text style={styles.footerTagline}>
                    Eat, Enjoy, and Entertainment - Vijayawada's premier open-air family hub on the banks of Krishna River.
                </Text>

                <View style={styles.footerGrid}>
                    <View style={styles.footerSection}>
                        <Text style={styles.footerSectionLabel}>CONNECT</Text>
                        <Text style={styles.footerLink}>070369 23456</Text>
                        <Text style={styles.footerLink}>Padmavathi Ghat, Vijayawada</Text>
                    </View>

                    <View style={styles.footerSection}>
                        <Text style={styles.footerSectionLabel}>FOLLOW US</Text>
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialIcon}><Facebook color="#fff" size={18} /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}><Instagram color="#fff" size={18} /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}><Twitter color="#fff" size={18} /></TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.copyrightRow}>
                    <Text style={styles.copyright}>© 2026 Ethree. All rights reserved.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#000',
        paddingTop: 60,
        paddingBottom: 100, // Extra padding for tab bar
        marginTop: 40,
    },
    footerContent: {
        paddingHorizontal: 24,
    },
    footerLogo: {
        width: 70,
        height: 35,
        marginRight: 15,
    },
    footerBrandRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerBrand: {
        color: '#FEC105',
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 2,
    },
    footerTagline: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        lineHeight: 24,
        marginTop: 20,
        fontWeight: '500',
    },
    footerGrid: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 40,
        justifyContent: 'space-between',
    },
    footerSection: {
        flex: 1,
    },
    footerSectionLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#FEC105',
        letterSpacing: 2,
        marginBottom: 15,
    },
    footerLink: {
        color: '#fff',
        fontSize: 14,
        marginTop: 8,
        fontWeight: '600',
    },
    socialRow: {
        flexDirection: 'row',
        gap: 12,
    },
    socialIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyrightRow: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 30,
        alignItems: 'center',
    },
    copyright: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default PageFooter;
