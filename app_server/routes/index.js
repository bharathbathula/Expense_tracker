const express = require("express");
const router = express.Router();
const ctrlLocations = require("../controllers/locations");
const ctrlOthers = require("../controllers/others");
/* Locations pages */
router.get("/", ctrlLocations.homepage);
router.get("/transactions", ctrlLocations.transactionInfo);
router.get("/transactions/addexpense", ctrlLocations.addExpense);
/* Other pages */
router.get("/about", ctrlOthers.about);
module.exports = router;
