import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { X, User, Phone, Mail, Save } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const EditProfileModal = ({ visible, onClose, initialData, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setEmail(initialData.email || '');
            setPhone(initialData.phone || '');
        }
    }, [initialData, visible]);

    const handleSave = () => {
        onSave({ name, email, phone });
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="pageSheet" // iOS native page sheet feel
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Profile</Text>
                        <TouchableOpacity onPress={handleSave} style={styles.saveHeaderButton}>
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>PUBLIC PROFILE</Text>

                            <View style={styles.inputGroup}>
                                <View style={styles.inputRow}>
                                    <View style={styles.iconContainer}>
                                        <User size={20} color="#8E8E93" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Name"
                                        placeholderTextColor="#C7C7CC"
                                    />
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputRow}>
                                    <View style={styles.iconContainer}>
                                        <Mail size={20} color="#8E8E93" />
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="Email"
                                        placeholderTextColor="#C7C7CC"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>PRIVATE INFORMATION</Text>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputRow}>
                                    <View style={styles.iconContainer}>
                                        <Phone size={20} color="#8E8E93" />
                                    </View>
                                    <TextInput
                                        style={[styles.input, styles.readOnlyInput]}
                                        value={phone}
                                        editable={false}
                                        placeholder="Phone"
                                        placeholderTextColor="#C7C7CC"
                                    />
                                    <Text style={styles.verifiedBadge}>Verified</Text>
                                </View>
                            </View>
                            <Text style={styles.helperText}>
                                Your mobile number cannot be changed as it is linked to your account identity.
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7', // iOS System Gray 6
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C6C6C8',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    cancelText: {
        fontSize: 17,
        color: '#007AFF', // iOS Blue
    },
    doneText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#007AFF',
    },
    content: {
        flex: 1,
        paddingTop: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 13,
        color: '#6D6D72',
        marginBottom: 8,
        marginLeft: 16,
        fontWeight: '400',
    },
    inputGroup: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#C6C6C8',
        paddingLeft: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingRight: 16,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#C6C6C8',
        marginLeft: 36, // Offset for icon
    },
    iconContainer: {
        width: 36,
        alignItems: 'flex-start',
    },
    input: {
        flex: 1,
        fontSize: 17,
        color: '#000',
    },
    readOnlyInput: {
        color: '#8E8E93',
    },
    helperText: {
        fontSize: 13,
        color: '#6D6D72',
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
    },
    verifiedBadge: {
        fontSize: 13,
        color: '#34C759', // iOS Green
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#000',
        marginHorizontal: 16,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});

export default EditProfileModal;
