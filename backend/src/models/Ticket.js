const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         bookingId:
 *           type: string
 *         transactionId:
 *           type: string
 *         qrCodeData:
 *           type: string
 *         validAt:
 *           type: string
 *           format: date
 */

const TicketSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
    },
    qrCodeData: {
        type: String,
        required: true,
    },
    validAt: {
        type: Date,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Ticket', TicketSchema);
