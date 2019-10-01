const mongoose = require("mongoose");

const Timecard = mongoose.model("Timecard");

module.exports = {
  async index(req, res) {
    const timecard = await Timecard.find();

    return res.json(timecard);
  }
};
