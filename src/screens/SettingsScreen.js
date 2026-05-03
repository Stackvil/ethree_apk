import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Bell, Lock, Info, FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState(true);

    const SettingItem = ({ icon: Icon, title, type = 'link', value, onValueChange, onPress }) => (
        <TouchableOpacity
            style={styles.item}
            disabled={type === 'switch'}
            activeOpacity={type === 'switch' ? 1 : 0.7}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Icon color="#000" size={20} />
            </View>
            <Text style={styles.itemTitle}>{title}</Text>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: "#767577", true: "#34C759" }}
                    thumbColor={"#fff"}
                />
            ) : (
                <ChevronRight color="#C7C7CC" size={20} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionHeader}>PREFERENCES</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon={Bell}
                        title="Push Notifications"
                        type="switch"
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </View>

                <Text style={styles.sectionHeader}>PRIVACY & LEGAL</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon={Lock}
                        title="Privacy Policy"
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                    />
                    <View style={styles.divider} />
                    <SettingItem
                        icon={FileText}
                        title="Terms of Service"
                        onPress={() => navigation.navigate('TermsOfService')}
                    />
                </View>

                <Text style={styles.sectionHeader}>ABOUT</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon={Info}
                        title="About Ethree"
                        onPress={() => navigation.navigate('AboutEthree')}
                    />
                </View>

                <Text style={styles.versionText}>Version 1.0.0 (Build 520)</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
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
        paddingVertical: 20,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E5EA',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    iconContainer: {
        marginRight: 16,
    },
    itemTitle: {
        flex: 1,
        fontSize: 17,
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginLeft: 52,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 32,
    },
});

export default SettingsScreen;
