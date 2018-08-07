// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const mongoose = require("mongoose")
const ensureLogin = require("connect-ensure-login");


// User model
const User = require("../models/user");
const Part = require("../models/parts")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});


//check roles

function checkRoles(roles){
  return function(req,res,next){
    if(req.isAuthenticated() && req.user.role === role){
      return next();
    }else{
      res.redirect("/login");
    }
  }
}

const checkAdmin = checkRoles("admin");
const checkProvider = checkRoles("provider");

//Get Home page
authRoutes.get('/', (req, res, next) => {
  res.render('index');
});

//Edit User

authRoutes.get("/edit-user", checkAdmin,(req, res, next)=>{ 
  User.find()
  .then( user =>{
    res.render("edit_user", { user });
  })
  .catch(err => {next(err)})
});

authRoutes.post("/edit-user", checkAdmin, (req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if(username === "" || password === "" || role === ""){
    res. render("edit_user", {message: "Todos los campos son requeridos"});
    return;
  }

  user.findOne({username})
  .then(user =>{
    if(user !== null){
      res.render("edit_user", {message: "El usuario ya existe"});
      return;
    }
    const newUser = new User({
      username,
      password: hashPass,
      email,
      store,
      role
    });

    newUser.save((err)=>{
      if(err){
        res.render("edit_user", {message: "Algo salio mal"});
      }else {
        res.redirect("/edito-user")
      }
    });
    })
  .catch(err =>{
      next(err)
  })
});

//Delete User

 authRoutes.get("/delete-user/:id", checkAdmin, async (req, res, next)=>{
  const result = await User.deleteOne({_id: req.pram.id})
  result.redirect("/edit-user")
 })
 
 authRoutes.get("/");

authRoutes.get("/singup", (req, res, next)=>{

})

// Get parts

authRoutes.get("/parts", (req, res ,next)=>{
  Part.find()
  .then (parts =>{
    let user = req.user._id
    res.render("parts", {parts});
  })
  .catch(err =>{
    next(err)
  })
});

authRoutes.get("/parts/add", checkAdmin,(req,res,next)=>{
  res.render("parts-add");
})

authRoutes.post("/parts/add",(req,res,next)=>{
  const {name, brand, carModel, year} = req.body;
  const newPart = new Part({ name, brand, carModel, year});
  newPart.save()
  .then((parts)=>{
    res.redirect("/parts")
  })
  .catch(err =>{
    res.render("parts",{message : req.flash("error")})
  })
})

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", {'message': req.flash('error')});
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
authRoutes.post('/login',
    function(req, res, next) {
        passport.authenticate('local', function(err, user) {
            if (err) { return next(err) }
            if (!user) {
                res.local("username", req.param('username'));
                return res.render('auth/login', { error: true });
            }

            // make passportjs setup the user object, serialize the user, ...
            req.login(user, {}, function(err) {
                if (err) { return next(err) };
                console.log('USER:   ---', user);
                console.log('USER in FRONT:   ---', req.user);
                return res.redirect("/");
            });
        })(req, res, next);
        return;
    }
);

// // authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
// //   res.render("private", { user: req.user });
// });

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});


module.exports = authRoutes;