import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const AboutEthreeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About ETHREE</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/LOGO.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    <Text style={styles.appName}>ETHREE</Text>
                    <Text style={styles.version}>Version 1.0.0 (Build 520)</Text>
                </View>

                <Text style={styles.sectionTitle}>What is ETHREE?</Text>
                <Text style={styles.paragraph}>
                    ETHREE is Vijayawada's premier open-air family hub located on the scenic banks of the Krishna River. We bring together the best of Eat, Enjoy, and Entertainment to create unforgettable experiences for you and your loved ones.
                </Text>

                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.paragraph}>
                    To provide a vibrant and safe space where families and friends can gather, celebrate, and create lasting memories. Whether you're here for the delicious food, thrilling rides, or captivating live events, ETHREE has something for everyone.
                </Text>

                <Text style={styles.sectionTitle}>Features</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.bold}>Dining:</Text> Explore a variety of culinary delights from our curated selection of food stalls and restaurants.
                    {'\n'}• <Text style={styles.bold}>Entertainment:</Text> Enjoy live music, cultural performances, and special events.
                    {'\n'}• <Text style={styles.bold}>Rides & Games:</Text> Fun-filled activities for kids and adults alike.
                    {'\n'}• <Text style={styles.bold}>Green Spaces:</Text> Relax in our beautifully landscaped gardens by the river.
                </Text>

                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.paragraph}>
                    Address: Padmavathi Ghat, Vijayawada, Andhra Pradesh
                    {'\n'}Email: support@ethree.in
                    {'\n'}Phone: 070369 23456
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.copyright}>© 2026 ETHREE. All rights reserved.</Text>
                </View>

                <View style={{ height: 40 }} />
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
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 16,
    },
    appName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        marginBottom: 4,
        letterSpacing: 1,
    },
    version: {
        fontSize: 14,
        color: '#8E8E93',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginTop: 20,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    bold: {
        fontWeight: '600',
        color: '#000',
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    copyright: {
        fontSize: 12,
        color: '#999',
    },
});

export default AboutEthreeScreen;
