const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         type:
 *           type: string
 *           enum: [ride, dining, event]
 *         items:
 *           type: array
 *           items:
 *             type: object
 *         totalAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, paid, cancelled]
 */

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['ride', 'dining', 'event'],
        required: true,
    },
    items: [
        {
            name: String,
            price: String,
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Booking', BookingSchema);
