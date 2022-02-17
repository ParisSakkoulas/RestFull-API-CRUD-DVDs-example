

//Προσθήκη όλων των προαπαιτούμενων
const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Επιλογή της πόρτας
const port = process.env.PORT || 3000;

//Δημιουργία του server να ακούει σε συγκεκριμένη πόρτα
const server = http.createServer(app);
server.listen(port);

//Καταγραφή κάθε κίνησης
app.use(morgan("dev"));

//Δημιουργια των data σε json μορφή
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Έλεγχος προσβασιμότητας
app.use((res, req, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();


});

//Σύνδεση με τη βάση 
mongoose.connect("mongodb://localhost/database1")
    .then(() => console.log("Connecting to DataBase..."))
    .catch(err => console.log("Could not connect to MongoDb...", err));

mongoose.Promise = global.Promise;

//Χειρισμός όλων των requests που ξεκινάνε με /users
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

//Χειρισμός όλων των requests που ξεκινάνε με /dvds
const dvdRoute = require("./routes/dvds");
app.use("/dvds", dvdRoute);

//Χειρισμός όλων των requests που ξεκινάνε με /card
const cardRoute = require("./routes/card");
app.use("/card", cardRoute);

//Χειρισμός όλων των requests που ξεκινάνε με /order
const orderRoute = require("./routes/order");
app.use("/order", orderRoute);

//Έλεγχος σε περίπτωση που ο χρήστης εισάγει κάποιο route που δεν υπάρχει
app.use((req, res, next) => {

    const error = new Error("Not found");
    error.status = 404;
    next(error);

});

//Χειρισμός όλων των λαθών
app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({

        error:
        {

            message: error.message
        }
    });


});






