const mongoose = require("mongoose");

//Δημιουργία σχήματος για την οντότητα του Dvd
const dvdSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title:
    {
        type: String,
        required: true
    },
    actors:
    {
        type: [String],
        required: true

    },
    director:
    {
        type: String,
        required: true
    },
    produceDate:
    {
        type: String,
        required: true
    },
    languages:
    {
        type: [String],
        required: true
    },
    subtitles:
    {
        type: [String],
        required: true
    },
    length:
    {
        type: Number,
        required: true
    },
    genre:
    {
        type: [String],
        required: true
    },
    quantity:
    {
        type: Number,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    }


});

module.exports = mongoose.model("Dvd", dvdSchema);







