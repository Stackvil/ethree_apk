const mongoose = require('mongoose');
console.log('mongoose loaded');
const jwt = require('jsonwebtoken');
console.log('jwt loaded in User');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         avatar:
 *           type: string
 *           description: URL to user's profile picture
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 */

const UserSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        unique: true,
        sparse: true, // Allow multiple nulls if not all users have firebaseUid yet
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        default: 'Guest User',
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = mongoose.model('User', UserSchema);
