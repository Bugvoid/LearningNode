var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
  product_name: { type: String, required: "Product name cannot be left blank" },
  price: { type: String, required: "Product price cannot be left blank" },
  category: { type: String, required: "Product category cannot be left blank" }
});

module.exports = mongoose.model("Products", productSchema);


