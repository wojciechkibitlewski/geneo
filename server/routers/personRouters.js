const express = require ('express');
const router = express.Router();
const personsController = require('../controllers/personController')

router.route('/')
.get(personsController.getAllPersons)
.post(personsController.createNewPerson)
.patch(personsController.updatePerson)
.delete(personsController.deletePerson)

module.exports = router;