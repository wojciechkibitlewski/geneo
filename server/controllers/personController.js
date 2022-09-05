const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Promise = require("bluebird");
const _ = require("lodash"); 

const Person = require('../models/Person');
const Wedding = require('../models/Wedding');

// @desc Get person
// @route GET /persons/:id
// @access Private

const getPerson = asyncHandler( async(req,res) => {
    /* 
    potrzebuję:
    [x] wszystkie dane z kolekcji Person
    [x] imiona i nazwiska rodziców (wyciągniete na podstawie mother i father)
    - małżeństwo - oddzielna kolekcja
    - dzieci (wyciągniete na podstawie mother i father, tylko w drugą stronę)
    Wszystko przekazane w jednym zapytaniu

    */
   
    const person = await Person.findById(req.params.id)
        .populate({ path: 'father', select: 'fullname age birthday birthmonth birthyear birthyeartwo birthplace birthpar' })
        .populate({ path: 'mother', select: 'fullname age birthday birthmonth birthyear birthyeartwo birthplace birthpar' })
        .exec()

    if(!person) {
        return res.status(400).json( {message: 'Person not found'})
    } 
        
    const kidsPerson = await Person.find( {$or:[ {father: person._id}, {mother: person._id} ] }, 'fullname age birthday birthmonth birthyear birthyeartwo birthplace birthpar' ).exec()
     
    const k = {
        kids: kidsPerson
    };
    
    const r = {...person._doc, ...k};

    res.json(r);
    
    
})
// @desc Get all users
// @route GET /users
// @access Private

const getAllPersons = asyncHandler( async(req,res) => {
    const {editor } = req.body;
    const persons = await Person.find(editor)
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
    
    const {gender, name, surname, surnameMarried, fullname, fullnameMarried, 
        nobility, profession, 
        age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, 
        fatherName, father, motherName, mother,  
        info } = req.body

    const personObj = {gender, name, surname, surnameMarried, fullname, fullnameMarried, 
        nobility, profession, 
        age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, 
        fatherName, father, motherName, mother, 
        info }
    
    const person = await Person.create(personObj);
    if(person) {
        res.status(201).json( {message: `New person ${name} ${surname} created`})
    } else {
        res.status(400).json({message: 'Invalid person data received'})
    }
})

// @desc Update persons
// @route PATCH /persons
// @access Private

const updatePerson = asyncHandler( async(req,res) => {
    const {id, gender, name, surname, surnameMarried, fullname, fullnameMarried, nobility, profession, 
        age, birthday, birthmonth, birthyear, birthyeartwo, birthplace, birthpar, link, 
        father, fatherName, mother, motherName, 
        living, age2, deathday, deathmonth, deathyear, deathplace, deathlink,
        info } = req.body
    
    const person = await Person.findById(id).exec()
    if(!person) {
        return res.status(400).json( {message: 'Person not found'})
    }
    person.gender = gender
    person.name = name
    person.surname = surname
    person.surnameMarried = surnameMarried
    person.fullname = fullname
    person.fullnameMarried = fullnameMarried
    person.nobility = nobility
    person.profession = profession
    person.age = age
    person.birthday = birthday
    person.birthmonth = birthmonth
    person.birthyear = birthyear
    person.birthyeartwo = birthyeartwo
    person.birthplace = birthplace
    person.birthpar = birthpar
    person.link = link 

    
    person.father = father
    person.fatherName = fatherName
    person.mother = mother
    person.motherName = motherName

    person.living = living
    person.age2 = age2
    person.deathday = deathday
    person.deathmonth = deathmonth
    person.deathyear = deathyear
    person.deathplace = deathplace
    person.deathlink = deathlink 

    person.info = info 

    const updatePerson = await person.save()
    res.json({ message: `${updatePerson.name} ${updatePerson.surname} updated`})
    
    
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

    const person = await Person.findById(id).exec()

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
    deletePerson,
    getPerson
}