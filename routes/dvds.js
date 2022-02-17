const express = require("express");
const router = express.Router();
const Dvd = require("../models/dvd");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const checkEmployee = require("../middleware/check-employee");
const dvdsController = require("../controllers/dvds");



//route για την εμφάνιση όλων των dvd, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.get("/getAllDvds", dvdsController.dvds_get_all);

//route για την δημιουργία νέου dvd,την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.post("/", checkAuth, checkEmployee, dvdsController.dvds_create_dvd);

//route για την εμφάνιση συγκεκριμένου dvd,την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.get("/:dvdId", dvdsController.dvds_get_single_dvd);

//route για την τροποποίηση συγκεκριμένου dvd,την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.patch("/:dvdId", checkAuth, dvdsController.dvds_update_dvd);

//route για την διαγραφή συγκεκριμένου dvd,την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.delete("/:dvdId", checkAuth, dvdsController.dvds_delete_dvd);

//Εξαγωγή των routes
module.exports = router;