const jwt = require('jsonwebtoken');
const card = require('../models/card');
const User = require("../models/user");
const Card = require("../models/card");

//Η παρακάτω μέθοδος χρησιμοποιείται για να επιτρέπει μόνο σε χρήστες κατόχους των καρτών να κάνουν τις αλλαγές 
module.exports = (req, res, next) => {


    const id = req.userData.userId;

    const userName = req.userData.userName;
    const idCard = req.body.id;

    Card.find({ _id: idCard }, (err, obj) => {

        console.log(obj[0]);
        console.log(obj[0].user);

        if (obj[0].user === userName) {
            next();
        }
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