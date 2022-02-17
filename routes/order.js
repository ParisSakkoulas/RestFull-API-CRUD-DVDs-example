
//Προσθήκη όλων των προαπαιτούμενων
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user-params-orders");
const checkEmployee = require("../middleware/check-employee");
const ordersController = require("../controllers/orders");

//router για την εμφάνιση όλων των παραγγελιών, μπορεί να γίνει μόνο απο τους υπαλλήλους
router.get("/getAllOrders", checkAuth, checkEmployee, ordersController.order_get_all_orders);

//router για την εμφάνιση όλων των παραγγελιών ενός χρήστη
router.get("/getAllMyOrders", checkAuth, ordersController.order_get_my_orders);

//router για την εμφάνιση όλων των δημιουργημένων παραγγελιών, ενός χρήστη
router.get("/getAllMyCreatedOrders", checkAuth, ordersController.order_get_my_created_orders);

//router για την εμφάνιση όλων των χρεωμένων παραγγελιών, ενός χρήστη
router.get("/getAllMyChargedOrders", checkAuth, ordersController.order_get_my_charged_orders);

//router για την εμφάνιση όλων των ακυρωμένων παραγγελιών, ενός χρήστη
router.get('/getAllMyCanceledOrders', checkAuth, ordersController.order_get_my_canceled_orders);

//router για την εμφάνιση όλων των εκρεμμών παραγγελιών, ενός χρήστη
router.get("/getAllMyPendingOrders", checkAuth, ordersController.order_get_my_pending_orders);

//router για την εμφάνιση όλων των ολοκληρωμένων παραγγελιών, ενός χρήστη
router.get("/getAllMyCompleteOrders", checkAuth, ordersController.order_get_my_complete_orders);

//route για την δημιουργία κάρτας, την λειτουργία την χειρίζεται η μέθοδος που βρίσκεται στo controllers
router.post("/createOrder", checkAuth, ordersController.order_createOrder);

//router για την ακύρωση μιας παραγγελίας 
router.put("/cancelOrder", checkAuth, checkUser, ordersController.order_cancel_order);

//router για την πληρωμή μιας παραγγελίας
router.put("/payOrder", checkAuth, checkUser, ordersController.order_pay_order);

//router για την ολοκλήρωση μιας παραγγελίας 
router.put("/completeOrder", checkAuth, checkEmployee, ordersController.order_complete_order);

//Εξαγωγή των routes
module.exports = router;