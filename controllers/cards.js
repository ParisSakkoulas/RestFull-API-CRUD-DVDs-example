const Dvd = require("../models/dvd");
const mongoose = require("mongoose");
const Card = require("../models/card");
const User = require("../models/user");
const user = require("../models/user");


//Μέθοδος για την εμφάνιση όλων των καρτών αγοράς που υπάρχουν στη βάση
exports.card_get_all = (req, res, next) => {


    Card.find()
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({

                error: err
            });
        });


};

//Μέθοδος για την εμφάνιση όλων των καρτών αγοράς που υπάρχουν στη βάση του παρόντος χρήστη στο σ΄ύστημα
exports.card_get_my_cards = (req, res, next) => {

    const userName = req.userData.userName;
    console.log(userName);

    Card.find({ user: userName })
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });

        });


};

//Μέθοδος για την εμφάνιση όλων των ενεργών καρτών αγοράς που υπάρχουν στη βάση του παρόντος χρήστη στο σ΄ύστημα
exports.card_get_my_active_cards = (req, res, next) => {

    const userName = req.userData.userName;
    console.log(userName);

    Card.find({ user: userName, cardState: "active" })
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });

        });


};

//Μέθοδος για την εμφάνιση όλων των παγωμένων καρτών αγοράς που υπάρχουν στη βάση του παρόντος χρήστη στο σ΄ύστημα
exports.card_get_my_frozen_cards = (req, res, next) => {

    const userName = req.userData.userName;
    console.log(userName);

    Card.find({ user: userName, cardState: "frozen" })
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });

        });


};

//Μέθοδος για την εμφάνιση όλων των ακυρωμένων καρτών αγοράς που υπάρχουν στη βάση του παρόντος χρήστη στο σ΄ύστημα
exports.card_get_my_cancelled_cards = (req, res, next) => {

    const userName = req.userData.userName;
    console.log(userName);

    Card.find({ user: userName, cardState: "canceled" })
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });

        });


};

//Μέθοδος για την εμφάνιση όλων των ολοκληρωμένων καρτών αγοράς που υπάρχουν στη βάση του παρόντος χρήστη στο σ΄ύστημα
exports.card_get_my_completed_cards = (req, res, next) => {

    const userName = req.userData.userName;
    console.log(userName);

    Card.find({ user: userName, cardState: "completed" })
        .select("_id user dvds createdDate cardCost cardState")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });

        });


};


//Μέθοδος για την δημιουργία μιας κάρτας αγοράς 
exports.card_create_card = (req, res, next) => {

    const ids = req.body.dvds;

    let uniqueIds = [...new Set(ids)];

    let uniqueDvds = [...new Set(req.body.dvds)];


    //Εύρεση τρέχοντως ημερομηνίας 
    let today = new Date();
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;


    //Εύρεση των Dvd απο τα οποία θα αποτελείται η κάρτα γοράς 
    Dvd.find({ _id: uniqueIds }, (err, obj) => {

        let cost = 0;


        //Υπολογισμούς του κόστους για όλα τα Dvd που βρίσκονται στο καλάθι
        for (let i = 0; i < uniqueIds.length; i++) {
            cost += obj[i].price;
        }

        //Τρέχον χρήστης
        const userName = req.userData.userName;

        //Δηημιουργία αντικειμένου κάρτας για την αποθήκευση στη βάση
        const card = new Card({
            _id: new mongoose.Types.ObjectId(),
            user: userName,
            dvds: uniqueDvds,
            createdDate: dateTime,
            cardCost: cost,
            cardState: "active"
        });

        //Αποθήκευση κάρτας στη βάση με τα αντίστοιχα στοιχεία και εμφάνιση αποτελέσματος στον χρήστη
        card.save().then(result => {

            console.log(result);
            res.status(200).json({
                message: "Card created",

                createdCard:
                {
                    _id: result._id,
                    user: result.user,
                    dvds: result.dvds,
                    createdDate: result.createdDate,
                    cardCost: result.cardCost,
                    cardState: result.cardState

                }
            });

        }).catch(err => {

            console.log(err);
            res.status(500).json({ error: err });
        });



    });

};

//Μέθδοος για την προσθήκη dvd σε μια κάρτα αγοράς 
exports.card_addDvdTo_card = (req, res, next) => {


    let uniqueIds = [...new Set(req.body.dvds)];


    Dvd.find({ _id: req.body.dvds }, (err, obj) => {


        let cost = 0;
        //Υπολογισμούς του κόστους για όλα τα Dvd που βρίσκονται στο καλάθι
        for (let i = 0; i < uniqueIds.length; i++) {
            cost += obj[i].price;
            console.log(obj[i].price);
        }

        //για να γίνει και η προσθήκη αλλα και η αλλαγή στην τιμή πρέπει το inc και το push να είναι μέσα στο ίδιο αντικείμενο
        Card.findByIdAndUpdate(req.body.id, { $inc: { cardCost: cost }, $push: { dvds: req.body.dvds } })
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));


    });


};

//Μέθδοος για την αφαίρεση dvd απο μια κάρτα αγοράς 
exports.card_removeFrom_card = (req, res, next) => {

    let uniqueIds = [...new Set(req.body.dvds)];

    Dvd.find({ _id: req.body.dvds }, (err, obj) => {


        let cost = 0;

        //Υπολογισμούς του κόστους για όλα τα Dvd που βρίσκονται στο καλάθι
        for (let i = 0; i < uniqueIds.length; i++) {
            cost += obj[i].price;
        }

        let strUniqueIds = uniqueIds.toString();
        Card.findByIdAndUpdate(req.body.id,
            {
                $pull: { dvds: { $in: strUniqueIds } },
                $inc: { cardCost: -cost }


            })
            .exec()
            .then(result => res(200).json(result))
            .catch(err => res.status(500).json({ error: err }));


    });



};

//Μέθδοος για την διαγραφή μιας κάρτας αγοράς 
exports.card_delete_card = (req, res, next) => {

    const id = req.params.idCard;

    Card.remove({ _id: id })
        .exec()
        .then(result => {

            res.status(200).json({

                message: "Card deleted successfully!"
            });

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });


};

//Μέθοδος για την ακύρωση μιας κάρτας αγοράς 
exports.card_cancel_card = (req, res, next) => {


    const id = req.body.id;

    Card.findByIdAndUpdate(id, { cardState: "canceled" })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));


};

//Μέθοδος για την εμφάνιση συγκεκριμένης κάρτας αγοράς 
exports.card_getSingle_card = (req, res, next) => {

    const id = req.params.idCard;

    Card.find({ _id: id })
        .exec()
        .then(result => {

            res.status(200).json(result);

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });


};