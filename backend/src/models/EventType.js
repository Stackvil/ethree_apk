const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventType:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         image:
 *           type: string
 *         isActive:
 *           type: boolean
 */

const EventTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('EventType', EventTypeSchema);
