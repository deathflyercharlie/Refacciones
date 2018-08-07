const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = 'refacciones';
mongoose.connect(`mongodb://localhost/${dbName}`);

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const boss = new User({
  username: "finkel",
  password: bcrypt.hashSync("admin", salt),
  role: "admin"
});


User.deleteMany()
  .then(() => User.create(boss))
  .then(userDocuments => {
    console.log(`Created the admin.`)
    mongoose.connection.close()
  })
  .catch(err => {throw(err)})