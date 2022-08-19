const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const Person = require('../models/Person');
const Wedding = require('../models/Wedding');

// @desc Get all users
// @route GET /users
// @access Private

const getAllPersons = asyncHandler( async(req,res) => {
    const persons = await Person.find()
    .limit(20)
    .lean()
    if(!persons?.length) {
        return res.status(400).json({message: 'No persons found'})
    }
    res.json(persons)
})

// @desc Create persons
// @route POST /persons
// @access Private

const createNewPerson = asyncHandler( async(req,res) => {
    
    const {gender, name, surname, surnameMarried, nobility, profession, age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, living, age2, deathday, deathmonth, deathyear, deathplace, info } = req.body
    const personObj = {gender, name, surname, surnameMarried, nobility, profession, age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, living, age2, deathday, deathmonth, deathyear, deathplace, info }
    
    const person = await Person.create(personObj);
    if(person) {
        res.status(201).json( {message: `New person ${name} ${surname} created`})
    } else {
        res.status(400).json({message: 'Invalid person data received'})
    }


    /* 
    const {name, surname, birthyear, birth, birthplace, birthpar, deathyear, death, deathplace, deathpar, father, mother, akt, info} = req.body
    
    const duplicate = await Person.findOne({
        name: name, surname: surname, birth: birth, father: father, mother: mother 
    }).lean().exec()
    if (duplicate) {
        return res.status(409).json( {message: 'Duplicate person'})
    }
    
    const personObj = {name, surname, birthyear, birth, birthplace, birthpar, deathyear, death, deathplace, deathpar, father, mother, akt, info}

    //create and store person
    const person = await Person.create(personObj);
    if(person) {
        res.status(201).json( {message: `New person ${name} ${surname} created`})
    } else {
        res.status(400).json({message: 'Invalid person data received'})
    }
     */
})

// @desc Update persons
// @route PATCH /persons
// @access Private

const updatePerson = asyncHandler( async(req,res) => {
    const {id, gender, name, surname, surnameMarried, nobility, profession, age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, living, age2, deathday, deathmonth, deathyear, deathplace, info } = req.body
    
    const person = await Person.findById(id).exec()
    if(!person) {
        return res.status(400).json( {message: 'Person not found'})
    }
    person.gender = gender
    person.name = name
    person.surname = surname
    person.surnameMarried = surnameMarried
    person.nobility = nobility
    person.profession = profession
    person.age = age
    person.birthday = birthday
    person.birthmonth = birthmonth
    person.birthyear = birthyear
    person.birthyeartwo = birthyeartwo
    person.birthplace = birthplace
    person.birthpar = birthpar
    person.living = living
    person.age2 = age2
    person.deathday = deathday
    person.deathmonth = deathmonth
    person.deathyear = deathyear
    person.deathplace = deathplace

    person.info = info 

    const updatePerson = await person.save()
    res.json({ message: `${updatePerson.name} ${updatePerson.surname} updated`})
    
    /* const {id, name, surname, birthyear, birth, birthplace, birthpar, deathyear, death, deathplace, deathpar, father, mother, akt, info} = req.body

    const person = await Person.findById(id).exec()
    if(!person) {
        return res.status(400).json( {message: 'Person not found'})
    }

    // check for duplicate
    const duplicate = await Person.findOne({
        name: name, surname: surname, birth: birth, father: father, mother: mother 
    }).lean().exec()
    // allow update to the orginal user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json( {message: 'Duplicate person name and surname'})
    }

    person.name = name
    person.surname = surname 
    person.birthyear = birthyear
    person.birth = birth
    person.birthplace = birthplace
    person.birthpar = birthpar
    person.deathyear = deathyear
    person.death = death
    person.deathplace = deathplace
    person.deathpar = deathpar
    person.father = father
    person.mother = mother
    person.akt = akt
    person.info = info
    
    const updatePerson = await person.save()
    res.json({ message: `${updatePerson.name} ${updatePerson.surname} updated`})
 */
})

// @desc Delete a person
// @route DELETE /persons
// @access Private

const deletePerson = asyncHandler( async(req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json( {message: 'Person ID required'})
    }

    const wedding = await Wedding.findOne( { person: id}).lean().exec()
    if(wedding?.length) {
        return res.status(400).json( { message: 'This person is married'})
    }

    const person = await Persons.findById(id).exec()

    if(!person) {
        return res.status(400).json( {message: 'Person not found'})
    }
    const result = await person.deleteOne()
    const reply = `Person ${result.name} ${result.surname} with ID ${_id} deleted`
    res.json (reply)

})

module.exports = {
    getAllPersons,
    createNewPerson,
    updatePerson,
    deletePerson
}