const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const TimeSchema = new mongoose.Schema({
  employee: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hours: {
    time1: {
      type: String,
      require: true
    },
    time2: {
      type: String,
      require: true
    },
    time3: {
      type: String,
      require: true
    },
    time4: {
      type: String,
      require: true
    }
  },
  observation: {
    type: String
  }
});

TimeSchema.plugin(mongoosePaginate);

mongoose.model("Timecard", TimeSchema);
