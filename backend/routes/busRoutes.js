const express = require("express");
const { getBusLocation, updateBusLocation } = require("../controllers/busController");

const router = express.Router();

// Route for getting all bus locations
router.get("/", getBusLocation);

// Route for updating a bus's location
router.put("/update-location", updateBusLocation);

module.exports = router;
