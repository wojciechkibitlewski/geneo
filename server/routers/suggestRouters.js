const express = require ('express');
const router = express.Router();
const suggestController = require('../controllers/suggestController')

router.route('/:search')
.get(suggestController.getSuggest)


module.exports = router;