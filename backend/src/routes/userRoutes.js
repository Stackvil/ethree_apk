const express = require('express');
const User = require('../models/User');
const { protect } = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put('/me', protect, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json({ success: true, data: user });
});

module.exports = router;
