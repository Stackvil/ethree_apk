import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { notificationRef } from '../utils/notificationRef';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isLoadingBookings, setIsLoadingBookings] = useState(false);

    const fetchBookings = useCallback(async () => {
        if (!user || user.isGuest) {
            setBookings([]);
            return;
        }

        setIsLoadingBookings(true);
        try {
            const response = await api.get('/api/orders/E3');
            const fetchedBookings = response.tickets || response.orders || response.data || (Array.isArray(response) ? response : []);
            
            const formatted = fetchedBookings.map(b => {
                // Extract first item data for display, as used in the new checkout format
                const firstItem = (b.items && b.items.length > 0) ? b.items[0] : {};
                
                return {
                    id: b.id || b._id || b.orderId || Math.random().toString(),
                    type: b.type || 'ride',
                    date: b.bookingDate || b.date || (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Recently'),
                    name: firstItem.name || b.rideName || b.name || b.ride_name || 'Booking',
                    location: b.location || 'Ethree Park',
                    time: b.time || 'Scheduled',
                    tickets: firstItem.quantity || b.quantity || b.tickets || 1,
                    price: b.totalAmount ? `₹${b.totalAmount}` : (firstItem.price ? `₹${firstItem.price}` : (b.price ? `₹${b.price}` : '₹0')),
                    status: b.paymentStatus || b.status || 'Confirmed'
                };
            });
            
            setBookings(formatted);
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        } finally {
            setIsLoadingBookings(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user || user.isGuest) {
            setCartItems([]);
            setBookings([]);
        } else {
            fetchBookings();
        }
    }, [user, fetchBookings]);


    const addToCart = (ride) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === ride.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === ride.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prevItems, { ...ride, quantity: 1 }];
        });
    };

    const removeFromCart = (rideId) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === rideId);
            if (!existingItem) return prevItems;

            if (existingItem.quantity > 1) {
                return prevItems.map((item) =>
                    item.id === rideId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prevItems.filter((item) => item.id !== rideId);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const checkout = async () => {
        if (cartItems.length === 0) return;
        
        setIsCheckingOut(true);
        try {
            // Production endpoint for checkout and payment initiation
            const endpoint = '/api/orders/e3/checkout';
            
            // Format items array for the bulk checkout endpoint
            const items = cartItems.map(item => {
                const rideTitle = item.title || 'MEGA COMBO ADULTS';
                return {
                    id: rideTitle, // Backend uses title for pricing lookup
                    name: rideTitle,
                    price: parseFloat(item.price?.toString().replace(/[^0-9.]/g, '')) || 0,
                    quantity: parseInt(item.quantity?.toString() || '1')
                };
            });

            const payload = {
                items,
                paymentStatus: 'Pending',
                location: 'E3',
                userId: user.userId || user._id || user.id || user.phone?.replace(/\D/g, '').slice(-10) || 'user_123',
                phone: user?.phone || '9999999999',
                email: user?.email || 'customer@ethree.in',
                firstname: user?.name || 'Customer'
            };
            
            const data = await api.post(endpoint, payload);
            
            if (data.success && data.payment_url) {
                return {
                    success: true,
                    payment_url: data.payment_url,
                    orderId: data.orderId
                };
            } else {
                throw new Error(data.message || "Failed to initiate payment");
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            throw error;
        } finally {
            setIsCheckingOut(false);
        }

    };

    const createBooking = async (paymentStatus = 'success') => {
        if (!user || cartItems.length === 0) return;
        
        try {
            // Production endpoint for checkout as per Swagger docs
            const endpoint = '/api/orders/e3/checkout';
            
            // Format items array for the bulk checkout endpoint
            const items = cartItems.map(item => {
                const rideTitle = item.title || 'MEGA COMBO ADULTS';
                return {
                    id: rideTitle, // Backend uses title for pricing lookup
                    name: rideTitle,
                    price: parseFloat(item.price?.toString().replace(/[^0-9.]/g, '')) || 0,
                    quantity: parseInt(item.quantity?.toString() || '1')
                };
            });

            const payload = {
                items,
                paymentStatus: 'Success',
                location: 'E3',
                userId: user.userId || user._id || user.id || user.phone?.replace(/\D/g, '').slice(-10) || 'user_123'
            };
            
            console.log('Sending checkout payload:', payload);
            await api.post(endpoint, payload);
            
            // Refresh bookings list from the fetch endpoint
            await fetchBookings();
            return true;
        } catch (error) {
            console.error('Failed to create booking via checkout endpoint', error);
            throw error;
        }
    };


    const totalPrice = cartItems.reduce((total, item) => {
        const priceStr = item.price ? item.price.toString().replace(/[^0-9.]/g, '') : '0';
        const price = parseFloat(priceStr);
        return total + price * (item.quantity || 1);
    }, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            totalPrice, 
            bookings, 
            createBooking,
            checkout,
            isCheckingOut,
            isLoadingBookings,
            fetchBookings

        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
