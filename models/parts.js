const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partSchema = new Schema({
  name: String,
  brand: String,
  carModel: String,
  year: Number
  //store: String
},{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Parts = mongoose.model("Parts", partSchema);

module.exports = Parts;
