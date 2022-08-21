const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose);


const personSchema = new mongoose.Schema({

    gender: String,
    name: String,
    surname: String,
    surnameMarried: String,
    fullname: String,
    fullnameMarried: String,
    nobility: String,
    profession: String,
    age: String,
    birthday: Number,
    birthmonth: Number,
    birthyear: Number,
    birthyeartwo: Number,
    birthplace: String,
    birthpar: String,
    fatherName: String,
    father: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: "Person",
    },
    motherName: String,
    mother: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: "Person",
    },
    living: String,
    age2: String,
    deathday: Number,
    deathmonth: Number,
    deathyear: Number,
    deathplace: String,
    info: String,  
})

module.exports = mongoose.model('Person', personSchema)