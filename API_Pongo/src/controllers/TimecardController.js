const mongoose = require("mongoose");

const Timecard = mongoose.model("Timecard");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const timecard = await Timecard.paginate({}, { page, limit: 10 });

    return res.json(timecard);
  },

  async show(req, res) {
    const timecard = await Timecard.findById(req.params.id);

    return res.json(timecard);
  },

  async store(req, res) {
    const timecard = await Timecard.create(req.body);

    return res.json(timecard);
  },

  async update(req, res) {
    const timecard = await Timecard.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(timecard);
  },

  async destroy(req, res) {
    const timecard = await Timecard.findByIdAndDelete(req.params.id);
    return res.send();
  }
};
