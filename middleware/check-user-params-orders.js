
const User = require("../models/user");
const Order = require("../models/order");


//Συνα΄ρτηση που ελέγχει άν μια παραγγελίας αφορά τον τρέχων χρήστη για να συνεχίσει στο επόμενο βήμα 
module.exports = (req, res, next) => {


    const id = req.userData.userId;

    const userName = req.userData.userName;
    const idOrder = req.params.idCard;


    //Εύρεση παραγγελίας με βάη το id 
    Order.find({ _id: idOrder }, (err, obj) => {

        console.log(obj[0]);


        //αν το όνομα του χρήσητ στην παραγγελία είναι ίδιο με το όνομα του τρέχοντος χρήστη 
        if (obj[0] === userName) {
            next();
        }
        else {

            //Ελεγχος για τον ρόλο του τρέχων χρήστη
            User.findById(id)
                .exec()
                .then(user => {
                    //αν είναι υπάλληλος του το επιτρέπει
                    if (user.userRole === "employee")
                        next();
                    else {
                        res.status(401).json({ message: "Wrong id!" });
                    }
                });

        }


    })




};