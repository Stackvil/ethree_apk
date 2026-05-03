const express = require('express');
const { createBooking, getMyBookings, getBooking, processDemoPayment } = require('../controllers/bookingController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect); // All these routes are protected

router.post('/bookings', createBooking);
router.get('/bookings/my', getMyBookings);
router.get('/bookings/:id', getBooking);
router.post('/payments/demo', processDemoPayment);

module.exports = router;
