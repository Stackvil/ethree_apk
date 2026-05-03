import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronDown, Mail, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const FAQS = [
    { q: 'How do I book a ride?', a: 'Browse the Home or Rides tab, select a ride, add to cart, and proceed to checkout.' },
    { q: 'Can I cancel my booking?', a: 'Cancellations are allowed up to 2 hours before the scheduled time. Refunds are processed within 5-7 days.' },
    { q: 'Where is Ethree located?', a: 'We are located opposite APSRTC Bus Stand, Padmavathi Ghat, Vijayawada.' },
];

const HelpScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.contactCard}>
                    <Text style={styles.cardTitle}>Need help with your booking?</Text>
                    <Text style={styles.cardSubtitle}>Our support team is available 10 AM - 7 PM.</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => Linking.openURL('tel:07036923456')}
                        >
                            <MessageCircle color="#000" size={20} />
                            <Text style={styles.buttonText}>Call Us</Text>
                        </TouchableOpacity>
                        <View style={{ width: 12 }} />
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => Linking.openURL('mailto:hello@Ethree.in')}
                        >
                            <Mail color="#000" size={20} />
                            <Text style={styles.buttonText}>Email Us</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                {FAQS.map((faq, index) => (
                    <View key={index} style={styles.faqItem}>
                        <View style={styles.questionRow}>
                            <Text style={styles.question}>{faq.q}</Text>
                            {/* <ChevronDown color="#999" size={20} /> */}
                        </View>
                        <Text style={styles.answer}>{faq.a}</Text>
                    </View>
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
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
    content: {
        padding: 20,
    },
    contactCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    contactButton: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    buttonText: {
        marginLeft: 8,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    faqItem: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 16,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    answer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default HelpScreen;
