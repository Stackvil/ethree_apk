const express = require('express');
const { getPrivacyPolicy, getTerms, getAbout } = require('../controllers/metaController');

const router = express.Router();

router.get('/privacy-policy', getPrivacyPolicy);
router.get('/terms', getTerms);
router.get('/about', getAbout);

module.exports = router;
