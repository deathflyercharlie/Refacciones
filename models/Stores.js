const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const StoresSchema = new Schema({
  nombreTienda: String,
  direccion: String,
  coordenadas: Object,
  
  
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Stores = mongoose.model("Stores", StoresSchema);

module.exports = Stores;