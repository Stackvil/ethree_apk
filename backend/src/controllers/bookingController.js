const Booking = require('../models/Booking');
const Transaction = require('../models/Transaction');
const Ticket = require('../models/Ticket');

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 */
exports.createBooking = async (req, res) => {
    req.body.userId = req.user.id;
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
};

exports.getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json({ success: true, data: bookings });
};

exports.getBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({ success: true, data: booking });
};

/**
 * @swagger
 * /payments/demo:
 *   post:
 *     summary: Demo payment (marks booking as paid and generates ticket)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 */
exports.processDemoPayment = async (req, res) => {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Update Booking Status
    booking.status = 'paid';
    await booking.save();

    // Create Transaction
    const transaction = await Transaction.create({
        bookingId: booking._id,
        transactionId: `TXN-${Date.now()}`,
        amount: booking.totalAmount,
        status: 'success',
    });

    // Generate Ticket
    const ticket = await Ticket.create({
        bookingId: booking._id,
        transactionId: transaction._id,
        qrCodeData: `TICKET-${booking._id}-${transaction.transactionId}`,
        validAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Valid for 24h
    });

    res.status(200).json({
        success: true,
        message: 'Payment successful, ticket generated',
        transaction,
        ticket,
    });
};
