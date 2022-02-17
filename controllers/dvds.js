
const Dvd = require("../models/dvd");
const mongoose = require("mongoose");

//Εμφάνιση όλων των dvd της βάσης 
exports.dvds_get_all = (req, res, next) => {

    Dvd.find()
        .select("_id title actors director produceDate languages subtitles length genre quantity")
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

//Δημιουργία ενός dvd και αποθήκευση αυτού στη βάση
exports.dvds_create_dvd = (req, res, next) => {

    const dvd = new Dvd({

        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        actors: req.body.actors,
        director: req.body.director,
        produceDate: req.body.produceDate,
        languages: req.body.languages,
        subtitles: req.body.subtitles,
        length: req.body.length,
        genre: req.body.genre,
        quantity: req.body.quantity,
        price: req.body.price,

    });

    dvd.save().then(result => {

        console.log(result);

        res.status(200).json({

            message: "Created dvd successfully!!!",
            createdDvd:
            {
                _id: result._id,
                title: result.title,
                actors: result.actors,
                director: result.director,
                produceDate: result.produceDate,
                languages: result.languages,
                subtitles: result.subtitles,
                length: result.length,
                genre: result.genre,
                quantity: result.quantity,
                price: result.price,
            }
        });

    })
        .catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            });


        });

};

//Εύρεση ενός συγκεκριμένου dvd με βάση το id
exports.dvds_get_single_dvd = (req, res, next) => {

    const id = req.params.dvdId;

    Dvd.findById(id)
        .select("_id title actors director produceDate languages subtitles length genre quantity")
        .exec()
        .then(doc => {

            console.log(doc);

            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "No valid entry found" });
            }


        })
        .catch(

            err => {
                console.log(err);

                res.status(500).json({ error: err });

            });


};

//ενημέρωση ενός πεδίου του dvd
exports.dvds_update_dvd = (req, res, next) => {

    const id = req.params.dvdId;

    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Dvd.findByIdAndUpdate(id, { $set: updateOps }, { new: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));

};

//διαγραφή ενόςς συγκεκριμένου dvd
exports.dvds_delete_dvd = (req, res, next) => {

    const id = req.params.dvdId;

    Dvd.remove({ _id: id })
        .exec()
        .then(result => {

            res.status(200).json({

                message: "Dvd deleted!!!"

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

};

//Εχουμε βάλει το παρακάτω κώδικα απλά για δοκιμή ώστε να μπορεί να γίνει η πραγματοποίηση μιας παραγγελίας
Dvd.insertMany([
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Inception",
        actors: ["Leonardo Di Caprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
        director: "Christopher Nolan",
        produceDate: "8/7/2010",
        languages: ["English"],
        subtitles: ["English", "Greek", "Spanish"],
        length: "228",
        genre: ["Science Fiction"],
        quantity: "150",
        price: "3.99"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Fight Club",
        actors: ["Edward Norton", "Brad Pitt", "Meat Loaf", "Zach Grenier"],
        director: "David Fincher",
        produceDate: "18/2/1999",
        languages: ["English"],
        subtitles: ["English", "Greek", "Spanish"],
        length: "228",
        genre: ["Ation", "Thriller", "Drama", "Crime", "Dark Comedy"],
        quantity: "150",
        price: "2.99"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Pulp Fiction",
        actors: ["Tim Roth", "Amanda Plummer", "Meat Loaf", "Laura Lovelace"],
        director: "Quentin Tarantino",
        produceDate: "1/3/1994",
        languages: ["English"],
        subtitles: ["English", "Greek", "Spanish"],
        length: "234",
        genre: ["Commedy", "Thriller", "Drama", "Crime", "Dark Comedy"],
        quantity: "150",
        price: "2.99"
    },


]);

