const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose);

const weddingSchema = new mongoose.Schema({
    year: Number,
    fulldate: Date,
    
    groom: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    groomfather: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    groommother: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    bride: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    bridefather: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    bridemother: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Person",
    },
    
    place: String,
    par: String,
    akt: String,
    info: String,
  
})

module.exports = mongoose.model('Wedding', weddingSchema)