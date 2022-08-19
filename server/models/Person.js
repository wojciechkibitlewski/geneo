const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({

    gender: String,
    name: String,
    surname: String,
    surnameMarried: String,
    nobility: String,
    profession: String,
    age: String,
    birthday: Number,
    birthmonth: Number,
    birthyear: Number,
    birthyeartwo: Number,
    birthplace: String,
    birthpar: String,
    living: String,
    age2: String,
    deathday: Number,
    deathmonth: Number,
    deathyear: Number,
    deathplace: String,
    info: String,  
})

module.exports = mongoose.model('Person', personSchema)