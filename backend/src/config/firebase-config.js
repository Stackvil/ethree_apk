// const admin = require('firebase-admin');
// Mocking firebase-admin to avoid hang on Node 22
const admin = {
    apps: [],
    initializeApp: () => { console.log('Mock Firebase Initialized'); },
    credential: { cert: () => ({}) },
    auth: () => ({
        verifyIdToken: async (token) => {
            console.log('Mock verifyIdToken called with:', token);
            return {
                uid: 'mock_uid_123',
                email: 'test@ethree.com',
                name: 'Test User',
                picture: 'https://via.placeholder.com/150'
            };
        }
    })
};

// Note: In production, use service account credentials from environment variables
// For now, we initialize with minimal config and expect GOOGLE_APPLICATION_CREDENTIALS
// or detailed env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
            console.log('Firebase Admin initialized successfully');
        } else {
            console.warn('Firebase environment variables missing. Firebase features will not work.');
        }
    } catch (error) {
        console.error('Firebase initialization error', error);
    }
}

module.exports = admin;
