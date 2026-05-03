const EventType = require('../models/EventType');

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all event types
 *     tags: [Events]
 */
exports.getEvents = async (req, res) => {
    const events = await EventType.find({ isActive: true });
    res.status(200).json({ success: true, data: events });
};

exports.createEvent = async (req, res) => {
    const event = await EventType.create(req.body);
    res.status(201).json({ success: true, data: event });
};
