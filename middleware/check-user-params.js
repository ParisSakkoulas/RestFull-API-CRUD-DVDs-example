const jwt = require('jsonwebtoken');
const card = require('../models/card');
const User = require("../models/user");
const Card = require("../models/card");


//Η παρακάτω μέθοδος χρησιμοποιείται για να επιτρέπει μόνο σε χρήστες κατόχους των καρτών να κάνουν τις αλλαγές 
module.exports = (req, res, next) => {


    const id = req.userData.userId;

    const userName = req.userData.userName;
    const idCard = req.params.idCard;

    //Ευρεση της κάρτας με βάση το id
    Card.find({ _id: idCard }, (err, obj) => {

        console.log(obj[0]);
        console.log(obj[0].user);

        //αν το πεδίο user της κάρτας είναι ίδιο με το όνομα του τρέχοντος χρ΄στη τότε επιτρέπει να συνεχιστεί το πρόγραμμα με την επόμενη συνάρτηση
        if (obj[0].user === userName) {
            next();
        }

        //Αλλιώς ελέγχει τον ρόλο του, αν είναι υπάλληλος το πρόγραμμα συνεχίζει με την επόμενη συνάρτηση, αλλίως του εμφανίζει το αντίστοιχο μ΄ήνυμα
        else {

            User.findById(id)
                .exec()
                .then(user => {
                    if (user.userRole === "employee")
                        next();
                    else {
                        res.status(401).json({ message: "Wrong id!" });
                    }
                });

        }


    })


};