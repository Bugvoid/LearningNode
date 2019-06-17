
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const spoilerSchema = new Schema({
  titulo:{
    type:String,
    required:true
  },
  
  espoliador: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  author: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("post", postSchema);
