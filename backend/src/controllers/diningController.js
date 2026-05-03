const Restaurant = require('../models/Restaurant');

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Dining]
 */
exports.getRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({ isActive: true });
    res.status(200).json({ success: true, data: restaurants });
};

exports.createRestaurant = async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({ success: true, data: restaurant });
};
