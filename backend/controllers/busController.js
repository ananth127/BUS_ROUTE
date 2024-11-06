const Bus = require("../models/Bus");

const getBusLocation = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateBusLocation = async (req, res) => {
  const { busNumber, lat, lng } = req.body;
  try {
    let bus = await Bus.findOne({ busNumber });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    bus.currentLocation = { lat, lng };
    await bus.save();

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBusLocation, updateBusLocation };
