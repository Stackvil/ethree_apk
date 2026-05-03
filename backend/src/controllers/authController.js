const admin = require('../config/firebase-config');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user with Firebase ID Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
exports.login = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'ID Token is required' });
    }

    try {
        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, phone_number, email, name, picture } = decodedToken;

        // Check if user exists (by phone or firebase uid if we add it, but phone is unique in our schema)
        // Note: For Google login, phone_number might be missing, email might be present.
        // Let's search by uid or email/phone.

        let user = await User.findOne({
            $or: [
                { firebaseUid: uid },
                { phoneNumber: phone_number || 'NOT_PROVIDED' },
                { email: email || 'NOT_PROVIDED' }
            ]
        });

        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            user = await User.create({
                firebaseUid: uid,
                phoneNumber: phone_number || '',
                email: email || '',
                name: name || 'Guest User',
                avatar: picture || '',
            });
        } else {
            // Update existing user with firebase info if missing
            if (!user.firebaseUid) user.firebaseUid = uid;
            if (picture && !user.avatar) user.avatar = picture;
            await user.save();
        }

        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token,
            user,
            isNewUser, // Frontend can use this to nudge for name if generic
        });
    } catch (error) {
        console.error('Firebase Auth Error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired ID token' });
    }
};

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
exports.getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

exports.logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};
