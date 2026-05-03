const express = require('express');
const { getRides, createRide, updateRide, deleteRide } = require('../controllers/rideController');

const router = express.Router();

router.get('/', getRides);
router.post('/', createRide);
router.put('/:id', updateRide);
router.delete('/:id', deleteRide);

module.exports = router;
