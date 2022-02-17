//Προσθήκη όλων των προαπαιτούμενων
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = require("../controllers/users");

const { password } = require("pg/lib/defaults");
const user = require("../models/user");


//route για την εγγραφή ενός χρήστη, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.post("/signup", UserController.user_signup);

//route για την σύνδεση ενός χρήστη, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.post("/login", UserController.user_login);

//route για την διαγραφή ενός χρήστη, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.delete("/:userId", UserController.user_delete);

//Εξαγωγή των route για χεησιμοποίηση τους στον server
module.exports = router;