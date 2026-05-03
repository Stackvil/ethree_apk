import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ArrowRight } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { sendOtp, verifyOtp, isLoading: authLoading } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (phoneNumber.length === 10) {
            setLoading(true);
            try {
                await sendOtp(phoneNumber);
                setStep(2);
            } catch (error) {
                console.error('Send OTP Error', error);
                alert(error.message || "Failed to send OTP. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please enter a valid 10-digit mobile number");
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length === 6) {
            setLoading(true);
            try {
                const result = await verifyOtp(phoneNumber, otp);
                if (result.isNewUser) {
                    navigation.replace('Register');
                } else {
                    navigation.replace('MainTabs');
                }
            } catch (error) {
                alert(error.message || "Invalid OTP");
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please enter a valid 6-digit OTP");
        }
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.content}
                >
                    {/* Header */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft color="#000" size={28} />
                    </TouchableOpacity>

                    <View style={styles.mainSection}>
                        <Image source={require('../../assets/LOGO.png')} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.title}>
                            {step === 1 ? "Welcome to Ethree" : "Verify Details"}
                        </Text>
                        <Text style={styles.subtitle}>
                            {step === 1
                                ? "Enter your mobile number to continue"
                                : `Enter the 6-digit code sent to +91 ${phoneNumber}`
                            }
                        </Text>

                        {step === 1 ? (
                            <View style={styles.inputContainer}>
                                <Text style={styles.prefix}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Mobile Number"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    autoFocus
                                />
                            </View>
                        ) : (
                            <View style={styles.otpContainer}>
                                <TextInput
                                    style={styles.otpInput}
                                    placeholder="• • • • • •"
                                    placeholderTextColor="#ccc"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    value={otp}
                                    onChangeText={setOtp}
                                    autoFocus
                                    textAlign="center"
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.button,
                                ((step === 1 && phoneNumber.length !== 10) || (step === 2 && otp.length !== 6)) && styles.disabledButton
                            ]}
                            onPress={step === 1 ? handleSendOtp : handleVerifyOtp}
                            disabled={loading || authLoading || (step === 1 && phoneNumber.length !== 10) || (step === 2 && otp.length !== 6)}
                        >
                            {(loading || authLoading) ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.buttonContent}>
                                    <Text style={styles.buttonText}>
                                        {step === 1 ? "Get OTP" : "Verify & Login"}
                                    </Text>
                                    <ArrowRight color="#fff" size={20} style={{ marginLeft: 8 }} />
                                </View>
                            )}
                        </TouchableOpacity>


                    </View>

                    <Text style={styles.termsText}>
                        By continuing, you agree to our Terms of Service & Privacy Policy.
                    </Text>

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
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    mainSection: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    logo: {
        width: 140,
        height: 70,
        marginBottom: 32,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
        marginBottom: 32,
    },
    prefix: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        letterSpacing: 1,
    },
    otpContainer: {
        marginBottom: 32,
    },
    otpInput: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        letterSpacing: 8, // Reduced spacing for 6 digits
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 12,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 16,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    disabledButton: {
        backgroundColor: '#ccc',
        shadowOpacity: 0,
        elevation: 0,
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
    resendLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    resendText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    termsText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        lineHeight: 18,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    googleButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    appleButtonContainer: {
        marginTop: 12,
        height: 56,
        width: '100%',
    },
    appleButton: {
        flex: 1,
    },
});

export default LoginScreen;
