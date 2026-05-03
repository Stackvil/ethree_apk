import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const AuthContext = createContext();

const DEFAULT_USER = {
    id: 'Ethree-admin',
    name: 'Ethree User',
    phone: '9999999999',
    email: 'admin@Ethree.com',
    role: 'admin',
    isGuest: true
};


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const profile = await api.get('/api/profile');
                setUser({ ...profile, phone: profile.phone || profile.mobile });
            } else {
                setUser(DEFAULT_USER);
            }
        } catch (error) {
            console.warn('Failed to load user from API, using fallback', error.message);
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(DEFAULT_USER);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const sendOtp = async (phoneNumber) => {
        return await api.post('/api/auth/send-otp', { mobile: phoneNumber, location: 'E3' });
    };

    const verifyOtp = async (phoneNumber, otp) => {
        const response = await api.post('/api/auth/verify-otp', { mobile: phoneNumber, otp });
        if (response.token) {
            await AsyncStorage.setItem('token', response.token);
            const profile = await api.get('/api/profile');
            const normalizedProfile = { ...profile, phone: profile.phone || profile.mobile };
            setUser(normalizedProfile);
            await AsyncStorage.setItem('user', JSON.stringify(normalizedProfile));
            return { isNewUser: !profile.name };
        }
        throw new Error('Verification failed');
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout', {});
        } catch (e) {
            // Silently ignore logout API failures
        }
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        setUser(DEFAULT_USER); // Revert to default instead of null
    };

    const updateProfile = async (data) => {
        const updatedUser = await api.put('/api/profile', data);
        const normalizedUser = { ...updatedUser, phone: updatedUser.phone || updatedUser.mobile };
        setUser(normalizedUser);
        await AsyncStorage.setItem('user', JSON.stringify(normalizedUser));
        return updatedUser;
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            isAuthenticated: !!user && !user.isGuest,
            sendOtp, 
            verifyOtp, 
            logout, 
            updateProfile,
            loadUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
