const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    surname: String,
    birthyear: Number,
    birth: Date,
    birthplace: String,
    birthpar: String,
    deathhyear: Number,
    death: Date,
    deathplace: String,
    deathpar: String,

    father: String,
    mother: String,
    
    akt: String,
    info: String,
  
})

module.exports = mongoose.model('Person', personSchema)