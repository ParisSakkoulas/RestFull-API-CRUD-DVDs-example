const mongoose = require("mongoose");

//Δημιουργία σχήματος για την οντότητα του πελάτη
const costumerSchema = mongoose.Schema({

    user:
    {
        type: mongoose.Schema.Types.String, ref: "User"

    },

    Address:
    {
        type: String,
        required: true
    },

    CardType:
    {
        type: String,
        required: true
    },

    CardNumber:
    {
        type: String,
        required: true
    },

    ExpirationDate:
    {
        type: String,
        required: true
    },

    Cvv:
    {
        type: String,
        required: true,
        maxlength: 3,
        minLength: 3
    }




});

module.exports = mongoose.model("Costumer", costumerSchema);