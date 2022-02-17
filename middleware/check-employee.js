
const User = require("../models/user");


//Συνάρτηση που χρησιμοποιείται για να επιτρέπει τη συνε΄χεια του προγράμματος μόνο σε υπαλλήλους του στυστήματος 
module.exports = (req, res, next) => {


    const id = req.userData.userId;

    User.findById(id)
        .exec()
        .then(user => {

            if (user.userRole === "employee")
                next();

            else {
                res.status(401).json({ message: "Auth failed" });
            }
        });


};