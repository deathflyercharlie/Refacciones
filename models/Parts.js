const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const partsSchema = new Schema({
  nombrePieza: String,
  cantidad: String,
  disponibilidad: String,
  precio: String,
  modeloAuto: String,
  categoria: String,
  subCategoria: String,
  
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Parts = mongoose.model("Parts", partsSchema);

module.exports = Parts;