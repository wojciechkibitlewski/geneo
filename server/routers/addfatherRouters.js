const express = require ('express');
const router = express.Router();
const addfatherController = require('../controllers/addfatherController')

router.route('/:search')
.post(addfatherController.getAllSuggest)

module.exports = router;