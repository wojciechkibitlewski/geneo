const express = require ('express');
const router = express.Router();
const suggestController = require('../controllers/suggestController')

router.route('/:search')
.post(suggestController.getAllSuggest)

module.exports = router;