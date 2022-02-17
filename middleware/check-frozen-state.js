
const Card = require("../models/card");

///Ελέγχεται η αν η κατάσταση της κάρτας είναι ενεργή ώσε να προχωρήσει στο επόμενο βήμα
//Αλλιώς στέλνεται μήνυμα λάθους στον χρήστη
module.exports = (req, res, next) => {

    const id = req.body.id;


    console.log(id);

    Card.findById(id)
        .exec()
        .then(card => {

            if (card.cardState === "frozen")
                next();

            else
                res.status(401).json({
                    message: "Can't edit on tha state!"
                });
        });




};