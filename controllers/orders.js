
const mongoose = require("mongoose");
const Order = require("../models/order");
const Card = require("../models/card");
const Costumer = require("../models/costumer");

//εμφάνιση όλων τα παραγγελιών
exports.order_get_all_orders = (req, res, next) => {


    Order.find()
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

//εμφάνιση όλων των παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName })
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

//εμφάνιση όλων των δημιουργημένων παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_created_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName, orderState: "created" })
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

//εμφάνιση όλων των χρεωμένων παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_charged_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName, orderState: "charged" })
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

//εμφάνιση όλων των ακυρωμένων παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_canceled_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName, orderState: "canceled" })
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

//εμφάνιση όλων των εκρεμμών παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_pending_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName, orderState: "pending" })
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

//εμφάνιση όλων των ολοκληρωμένων παραγγελιών ενός συγκεκριμένου χρήστη με βάση το όνομα χρήστη
exports.order_get_my_complete_orders = (req, res, next) => {

    const userName = req.userData.userName;

    Order.find({ user: userName, orderState: "complete" })
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

//συνάρτηση για την δημιουργία μιας παραγγελίας 
exports.order_createOrder = (req, res, next) => {

    //Εύρεση τρέχοντως ημερομηνίας 
    let today = new Date();
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    //τρέχον χρήστης
    // για να δουλέυει θα πρέπει να ελέγχεται αρχικά το jwb απο το middleware check auth
    const userName = req.userData.userName;

    console.log(userName);

    const order = new Order({

        _id: new mongoose.Types.ObjectId(),
        address: req.body.address,
        card: req.body.id,
        user: userName,
        orderState: "created",
        createdDate: dateTime,
        completeDate: dateTime

    });
    //ανανέωση και της κάρτας αγοράς που υπάρχει στη συγκεκριμένη παραγγελία
    Card.findByIdAndUpdate(req.body.id, { cardState: "frozen" }, (err, obj) => {

        if (err)
            console.log(err);

        else
            console.log(obj);
    });


    order.save().then(result => {

        console.log(result);
        res.status(200).json({
            message: "Order created!",

            createdOrder:
            {
                _id: result._id,
                address: result.address,
                card: result.card,
                user: result.user,
                orderState: result.orderState,
                createdDate: result.createdDate,
                completeDate: result.completeDate

            }


        });

    }).catch(err => {

        console.log(err);
        res.status(500).json({ error: err });
    });

};

//Ακύρωση μιας παραγγελίας 
exports.order_cancel_order = (req, res, next) => {

    const id = req.body.id;

    //Εύρεση τρέχοντως ημερομηνίας 
    let today = new Date();
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;

    console.log(id);

    Order.findByIdAndUpdate(id, { orderState: "canceled", completeDate: dateTime })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));

    Order.find({ _id: id }, (err, obj) => {


        console.log("idcard", obj[0].card);


        //ενημέρωση και της αντίστοιχης κάρτας αγοράς
        Card.findByIdAndUpdate(obj[0].card, { cardState: "canceled" }, (err, obj) => {

            if (err)
                console.log(err);
            else
                console.log(obj);
        });


    });
};

//μέθοδος για την πληρωμή μιας παραγγελίας με βάση το id 
exports.order_pay_order = (req, res, next) => {

    const idOrder = req.body.id;

    Order.findByIdAndUpdate(idOrder, { orderState: "charged" }, (err, obj) => {

        if (err)
            console.log(err);
        else
            console.log(obj);
    });

    const userName = req.userData.useName;

    console.log(userName);

    Costumer.find({ user: userName })
        .exec()
        .then(docs => {
            res.status(200).json({
                message: "You will charged!"
            });
        })
        .catch(err => {

            res.status(500).json({ error: err });
        });

};

//ολοκλήρωση μιας παραγγελίας με βάση το id που εισάγεται 
exports.order_complete_order = (req, res, next) => {

    //Εύρεση τρέχοντως ημερομηνίας 
    let today = new Date();
    let date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;



    const id = req.body.id;

    console.log(id);

    Order.findByIdAndUpdate(id, { orderState: "complete", completeDate: dateTime })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));


    //ενημέρωση και της αντιστοιχης κάρτας αγοράς 
    Card.findByIdAndUpdate(obj[0].card, { cardState: "completed" }, (err, obj) => {

        if (err)
            console.log(err);
        else
            console.log(obj);
    });


};



