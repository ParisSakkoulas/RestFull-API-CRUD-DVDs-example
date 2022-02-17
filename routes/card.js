const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkActive = require("../middleware/check-active-state");
const checkFrozen = require("../middleware/check-frozen-state");
const checkUserBody = require("../middleware/check-user-body");
const checkUserParams = require("../middleware/check-user-params");
const checkEmployee = require("../middleware/check-employee");
const cardsController = require("../controllers/cards");


//route για την εμφάνιση όλων των καρτών, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.get("/getAllCards", checkAuth, checkEmployee, cardsController.card_get_all);

//route για την εμφάνιση όλων των καρτών αγοράς ενός συγκεκριμένου χρήστη
router.get("/getMyCards", checkAuth, cardsController.card_get_my_cards);

//route για την εμφάνιση όλων των ενεργών καρτών αγοράς ενός συγκεκριμένου χρήστη
router.get("/getMyActiveCards", checkAuth, cardsController.card_get_my_active_cards);

//route για την εμφάνιση όλων των παγωμένων καρτών αγοράς ενός συγκεκριμένου χρήστη
router.get("/getMyFrozenCards", checkAuth, cardsController.card_get_my_frozen_cards);

//route για την εμφάνιση όλων των ακυρωμένων καρτών αγοράς ενός συγκεκριμένου χρήστη
router.get("/getMyCancelledCards", checkAuth, cardsController.card_get_my_cancelled_cards);

//route για την εμφάνιση όλων των ολοκληρωμένων καρτών αγοράς ενός συγκεκριμένου χρήστη
router.get("/getMyCompletedCards", checkAuth, cardsController.card_get_my_completed_cards);

//route για την εμφάνιση συγκεκριμένης κάρτας, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.get("/getSingleCard/:idCard", checkAuth, checkUserParams, cardsController.card_getSingle_card);

//route για την δημιουργία κάρτας, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.post("/createCard", checkAuth, cardsController.card_create_card);

//route για την είσοδο dvd σε μια κάρτα, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.put("/addToCard", checkAuth, checkActive, checkUserBody, cardsController.card_addDvdTo_card);

//route για την είσοδο dvd σε μια κάρτα, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.put("/removeFromCard", checkAuth, checkActive, checkUserBody, cardsController.card_removeFrom_card);

//route για την ακύρωση μιας κάρτας
router.post("/cancelCard", checkAuth, checkFrozen, checkUserBody, cardsController.card_cancel_card);

//route για την διαγραφή της κάρτας, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.delete("/:idCard", checkAuth, checkActive, checkUserParams, cardsController.card_delete_card);

//εξαγωγή 
module.exports = router;