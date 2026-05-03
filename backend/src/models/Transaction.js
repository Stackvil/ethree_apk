const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         bookingId:
 *           type: string
 *         transactionId:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [success, failed, refunded]
 */

const TransactionSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'refunded'],
        default: 'success',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
