const express = require ('express');
const router = express.Router();
const personsController = require('../controllers/personController')

const verifyJWT = require('../middleware/verifyJWT');


router.route('/')
.get(personsController.getAllPersons)
.post(personsController.createNewPerson)
.patch(personsController.updatePerson)
.delete(personsController.deletePerson)

/* 
verifyJWT można zostosować również do pojedyńczej ścieżki, np. tak:

router.route('/')
.get(verifyJWT, personsController.getAllPersons)
.post(personsController.createNewPerson)
.patch(personsController.updatePerson)
.delete(personsController.deletePerson)

 */
router.route('/:id')
.get(personsController.getPerson)
module.exports = router;