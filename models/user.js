const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  provider: String,
  facebookID: String,
  displayName: String,
  emails: [{value: String}, {type: String}],
  name: Object,
  store: String,
  
  role:{type: String, enum:['admin', 'provider', 'normalUser'], default:'normalUser'}
}, 
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;