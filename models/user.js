const mongoose = require("mongoose");

//Δημιουργία σχήματος για την οντότητα του Χρήστη
const userSchema = mongoose.Schema({

    userName:
    {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true

    },

    password:
    {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },

    firstName:
    {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },

    lastName:
    {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },

    userRole:
    {
        type: String,
        enum: ["employee", "customer"],
        required: true,
        default: "employee"
    }



});

//Εξαγωγή
module.exports = mongoose.model("User", userSchema);