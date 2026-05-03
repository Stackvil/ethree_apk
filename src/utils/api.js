import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://xzanzkz0wl.execute-api.ap-south-1.amazonaws.com';

const getHeaders = async (isFormData = false) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
        'Accept': 'application/json',
    };
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

export const api = {
    async get(endpoint) {
        const headers = await getHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });
        return this.handleResponse(response);
    },

    async post(endpoint, body, isFormData = false) {
        const headers = await getHeaders(isFormData);
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: isFormData ? body : JSON.stringify(body),
        });
        return this.handleResponse(response);
    },

    async put(endpoint, body, isFormData = false) {
        const headers = await getHeaders(isFormData);
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: isFormData ? body : JSON.stringify(body),
        });
        return this.handleResponse(response);
    },

    async delete(endpoint) {
        const headers = await getHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });
        return this.handleResponse(response);
    },

    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            throw new Error(error);
        }

        return data;
    }
};

export const testBookingCreationSupport = async () => {
    const endpoint = '/api/orders/e3/checkout';
    console.log('--- STARTING BOOKING CREATION TEST ---');
    console.log('Testing endpoint:', BASE_URL + endpoint);
    
    try {
        const headers = await getHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                items: [
                    {
                        id: "MEGA COMBO ADULTS",
                        name: "MEGA COMBO ADULTS",
                        price: 500,
                        quantity: 1
                    }
                ]
            }),
        });

        console.log('Status Code:', response.status);
        
        let body;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            body = await response.json();
        } else {
            body = await response.text();
        }
        
        console.log('Response Body:', body);

        if (response.status === 200 || response.status === 201) {
            console.log('RESULT: ✅ Checkout POST supported — booking creation is working!');
        } else {
            console.log(`RESULT: ❌ Checkout POST failed with status ${response.status}`);
        }
    } catch (error) {
        console.log('RESULT: ❌ Request failed with error:', error.message);
    }
    console.log('--- END OF BOOKING CREATION TEST ---');
};


export default api;
