const mongoose = require("mongoose");
const Card = require("../models/card");

//Δημιουργία σχήματος για την οντότητα του Χρήστη
const orderSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    address:
    {
        required: true,
        type: String
    },

    //Αφορά μια κάρτα αγοράς 
    card:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    },

    //Αφορά εναν χρήστη 
    user:
    {
        type: mongoose.Schema.Types.String,
        ref: "User"

    },

    orderState:
    {
        type: String,
        enum: ["created", "charged", "canceled", "pending", "complete"],
        required: true
    },

    createdDate:
    {
        type: String,
        required: true
    },

    completeDate:
    {
        type: String,
        required: true
    }




});

//Εξαγωγή
module.exports = mongoose.model("Order", orderSchema);