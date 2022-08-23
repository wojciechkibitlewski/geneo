const express = require ('express');
const router = express.Router();
const suggestController = require('../controllers/suggestController')

router.route('/f/:search')
.get(suggestController.getSuggestFather)
router.route('/m/:search')
.get(suggestController.getSuggestMother)


module.exports = router;