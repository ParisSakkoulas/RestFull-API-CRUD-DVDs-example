
const mongoose = require("mongoose");
const User = require("../models/user");
const Employee = require("../models/employee");
const Costumer = require("../models/costumer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//συνάρτηση για την εγγραφή ενός χρήστη στο σύστημα
exports.user_signup = (req, res, next) => {

    //εύρεση σε περίπτωση που υπάρχει ήδη το όνομα του χρήστη στο σύστημα
    User.find({ userName: req.body.userName })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Username exists!"
                });

            }
            //αλλιώς κάνει hash τον κωδικό του για αποθήκευση στη βάση και στέλνει το αποτέλεσμα στο χρήστη 
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {

                        //δημηιοργία του αντικειμένου χρ΄ήστη με βάση τα στοιχεία που δίνει 
                        const user = new User({

                            _id: new mongoose.Types.ObjectId(),
                            userName: req.body.userName,
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            userRole: req.body.userRole



                        });

                        // αν επιλεχθεί ο ρόλος υπάλληλος τότε δημιουργείτε ένα επιπλέον αντικείμενο τύπου υπάλληλος με πεδίο το μοναδικό ονομα του χρ΄γστη και τον τύπου του υπαλλήλου
                        if (user.userRole === "employee") {
                            const employee = new Employee({

                                user: req.body.user,
                                EmployeeType: req.body.EmployeeType
                            });

                            employee.save()

                            console.log(employee);

                        }

                        //αν επιλεχθεί ο ρόλος πελάτης εισάγωνται κάποια επιπλέον στοιχεία σε ένα νέο αντικείμενο πελάτη και αποθηκευεται στη βάση
                        if (user.userRole === "costumer") {
                            const costumer = new Costumer({
                                user: req.body.userName,
                                Address: req.body.Address,
                                CardType: req.body.CardType,
                                CardNumber: req.body.CardNumber,
                                ExpirationDate: req.body.ExpirationDate,
                                Cvv: req.body.Cvv
                            });

                            costumer.save()
                            console.log(costumer);
                        }

                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created!!!"
                                });
                            })
                            .catch(err => {

                                console.log(err);
                                res.status(500).json({

                                    error: err
                                });

                            });

                    }
                });

            }
        });

};

//συνάρτηση για την είσοδο του χρ΄ήστη στο σύστηαμ 
exports.user_login = (req, res, next) => {

    User.find({ userName: req.body.userName })
        .exec()
        .then(user => {

            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            //αποκρυπτογράφηση του κωδικού
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if (err) {
                    return res.status(401).json({ message: "Auth failed" });

                }

                //αν όλα τα στοιχεία της σύνδεσης ταυτιζονται με τον χρήστη τότε του παραχωρείται ένα κλειδί το όποίο μπορεί να χρησιμοποιεί για 1 ώρα στο σύστημα 
                if (result) {

                    const token = jwt.sign({

                        userName: user[0].userName,
                        userId: user[0]._id

                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        })

                    return res.status(200).json({

                        message: "Auth successful",
                        token: token
                    });
                }

                res.status(401).json({ message: "Auth failed" });


            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err

            });
        });

}

//μέθοδος για διαγραφή χρήστη με βάση το id
exports.user_delete = (req, res, next) => {

    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err

            });
        });
}