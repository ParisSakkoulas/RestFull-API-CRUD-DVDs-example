const mongoose = require("mongoose");

//Δημιουργία σχήματος για την οντότητα του Υπάλληλος
const employeeSchema = mongoose.Schema({

    //αφορά έναν χρήστη
    user:
    {
        type: mongoose.Schema.Types.String, ref: "User"

    },

    EmployeeType:
    {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Employee", employeeSchema);