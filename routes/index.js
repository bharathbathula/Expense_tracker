const express = require("express");
const router = express.Router();
const ctrlLocations = require("../controllers/locations");
const ctrlOthers = require("../controllers/others");

/* Locations pages */
router.get("/", ctrlLocations.homepage);
router.get("/transactions", ctrlLocations.transactionInfo);
router.get("/transactions/addexpense", ctrlLocations.addExpense);
router.post("/expenses", ctrlLocations.createExpense); // Add this route to handle form submission for adding an expense

/* Other pages */
router.get("/about", ctrlOthers.about);

module.exports = router;
