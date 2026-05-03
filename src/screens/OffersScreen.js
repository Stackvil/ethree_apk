import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Copy, Gift } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const OFFERS = [];

const OffersScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <LinearGradient
                colors={item.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.offerTitle}>{item.title}</Text>
                    <Text style={styles.offerDesc}>{item.description}</Text>
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeLabel}>CODE:</Text>
                        <Text style={styles.codeText}>{item.code}</Text>
                        <Copy size={14} color="#000" style={{ marginLeft: 8 }} />
                    </View>
                </View>
                <View style={styles.circleCutoutLeft} />
                <View style={styles.circleCutoutRight} />
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Offers & Rewards</Text>
                <View style={{ width: 40 }} />
            </View>

            {OFFERS.length > 0 ? (
                <FlatList
                    data={OFFERS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Gift color="#ddd" size={80} />
                    <Text style={styles.emptyTitle}>No Offers Available</Text>
                    <Text style={styles.emptySubtitle}>Check back later for exclusive rewards and discounts.</Text>
                </View>
            )}
        </View>
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
    list: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    gradient: {
        borderRadius: 16,
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    cardContent: {
        zIndex: 1,
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    offerDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 20,
        lineHeight: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    codeLabel: {
        fontSize: 10,
        color: '#999',
        fontWeight: 'bold',
        marginRight: 6,
    },
    codeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
    },
    circleCutoutLeft: {
        position: 'absolute',
        left: -15,
        top: '50%',
        marginTop: -15,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    circleCutoutRight: {
        position: 'absolute',
        right: -15,
        top: '50%',
        marginTop: -15,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
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

export default OffersScreen;
