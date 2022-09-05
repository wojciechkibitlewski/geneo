const express = require('express');
const router = express.Router();
const path = require('path');

const refreshController = require('../controllers/refreshTokenController');


router.get('/', refreshController.handleRefreshToken);

module.exports = router;