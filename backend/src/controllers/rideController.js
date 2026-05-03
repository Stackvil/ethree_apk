const Ride = require('../models/Ride');

/**
 * @swagger
 * /rides:
 *   get:
 *     summary: Get all active rides
 *     tags: [Rides]
 */
exports.getRides = async (req, res) => {
    const rides = await Ride.find({ isActive: true });
    res.status(200).json({ success: true, data: rides });
};

/**
 * @swagger
 * /rides:
 *   post:
 *     summary: Add a new ride (Admin)
 *     tags: [Rides]
 */
exports.createRide = async (req, res) => {
    const ride = await Ride.create(req.body);
    res.status(201).json({ success: true, data: ride });
};

exports.updateRide = async (req, res) => {
    const ride = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: ride });
};

exports.deleteRide = async (req, res) => {
    await Ride.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ success: true, message: 'Ride soft deleted' });
};
