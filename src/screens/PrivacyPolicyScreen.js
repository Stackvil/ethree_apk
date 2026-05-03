import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.date}>Last updated: February 11, 2026</Text>

                <Text style={styles.paragraph}>
                    At Ethree, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and share your information when you use our mobile application and services.
                </Text>

                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We may collect the following types of information:
                    {'\n'}• Personal Information: Name, email address, phone number, and payment information.
                    {'\n'}• Usage Data: Information about how you use our app, including ride bookings, dining orders, and event registrations.
                    {'\n'}• Device Information: Information about your mobile device, including IP address, operating system, and device identifiers.
                </Text>

                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    We use your information to:
                    {'\n'}• Provide and maintain our services.
                    {'\n'}• Process your bookings and payments.
                    {'\n'}• Communicate with you about your account and our services.
                    {'\n'}• Personalize your experience and improve our app.
                    {'\n'}• Ensure the security of our platform.
                </Text>

                <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
                <Text style={styles.paragraph}>
                    We do not sell your personal information. We may share your information with:
                    {'\n'}• Service Providers: Third-party vendors who help us operate our business (e.g., payment processors, cloud hosting).
                    {'\n'}• Legal Requirements: If required by law or to protect our rights.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                </Text>

                <Text style={styles.sectionTitle}>5. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, please contact us at support@Ethree.in.
                </Text>

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
});

export default PrivacyPolicyScreen;
