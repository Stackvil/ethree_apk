import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const TermsOfServiceScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms of Service</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Terms of Service</Text>
                <Text style={styles.date}>Last updated: February 11, 2026</Text>

                <Text style={styles.paragraph}>
                    Welcome to Ethree! By accessing or using our mobile application and services, you agree to be bound by these Terms of Service. Please read them carefully.
                </Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By creating an account or using our services, you agree to these Terms. If you do not agree, please do not use our app.
                </Text>

                <Text style={styles.sectionTitle}>2. Use of Services</Text>
                <Text style={styles.paragraph}>
                    You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials.
                </Text>

                <Text style={styles.sectionTitle}>3. Bookings and Payments</Text>
                <Text style={styles.paragraph}>
                    All bookings are subject to availability. Payments are processed securely. We reserve the right to cancel or refuse any booking at our discretion. Refunds are subject to our Refund Policy.
                </Text>

                <Text style={styles.sectionTitle}>4. User Conduct</Text>
                <Text style={styles.paragraph}>
                    You agree not to misuse our services, interfere with our operations, or engage in any fraudulent or harmful activity.
                </Text>

                <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
                <Text style={styles.paragraph}>
                    All content, features, and functionality of the Ethree app are owned by us and are protected by intellectual property laws.
                </Text>

                <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    Ethree shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
                </Text>

                <Text style={styles.sectionTitle}>7. Changes to Terms</Text>
                <Text style={styles.paragraph}>
                    We may update these Terms from time to time. We will notify you of any significant changes. Your continued use of our services constitutes acceptance of the new Terms.
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

export default TermsOfServiceScreen;
