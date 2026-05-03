import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { updateProfile, isLoading } = useAuth();
    const [name, setName] = useState('');

    const handleComplete = async () => {
        if (name.trim().length >= 2) {
            await updateProfile({ name });
            navigation.replace('MainTabs');
        } else {
            alert("Please enter a valid name");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.content}
                >
                    <View style={styles.mainSection}>
                        <Text style={styles.title}>Almost there!</Text>
                        <Text style={styles.subtitle}>Please enter your name to complete your profile</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                                autoFocus
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, name.trim().length < 2 && styles.disabledButton]}
                            onPress={handleComplete}
                            disabled={isLoading || name.trim().length < 2}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText}>Complete Profile</Text>
                                    <ArrowRight color="#fff" size={20} style={{ marginLeft: 8 }} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    mainSection: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
        marginBottom: 32,
    },
    input: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 16,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default RegisterScreen;
