const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: string
 *         image:
 *           type: string
 *         isActive:
 *           type: boolean
 */

const RideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: String, // e.g., "₹100"
        required: true,
    },
    image: {
        type: String, // require('../../assets/e3.jpeg') or URL
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

module.exports = mongoose.model('Ride', RideSchema);
