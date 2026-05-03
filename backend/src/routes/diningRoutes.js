const express = require('express');
const { getRestaurants, createRestaurant } = require('../controllers/diningController');

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', createRestaurant);

module.exports = router;
