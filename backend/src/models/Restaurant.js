const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 */

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
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

module.exports = mongoose.model('Restaurant', RestaurantSchema);
