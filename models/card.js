const mongoose = require("mongoose");
const Dvd = require("../models/dvd");

//Δημιουργία σχήματος για την οντότητα κάρτας αγοράς
const cardSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    user:
    {
        type: mongoose.Schema.Types.String, ref: "User"

    },

    dvds:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dvd"
        }],

    createdDate:
    {
        type: String,
        required: true

    },

    cardCost:
    {
        type: Number,
        required: true
    },

    cardState:
    {
        type: String,
        enum: ["active", "frozen", "canceled", "completed"],
        required: true
    }




});

module.exports = mongoose.model("Card", cardSchema);