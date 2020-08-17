require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Setup passport session
app.use(session({
    secret: process.env.ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connnect to mongoose 
const uri =
    'mongodb+srv://' +
    process.env.ATLAS_USER +
    ':' +
    process.env.ATLAS_PASS +
    '@first-cluster.r9nhd.mongodb.net/' +
    process.env.ATLAS_DB +
    '?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function (err) {
    if (err) {
        console.log("Unable to connect to DB", err);
    } else {
        console.log("Connected to DB");
    }
})
mongoose.set('useCreateIndex', true);

// Create a Schema for Users (Email and PASS)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    }
})


// Use encryption - MUST BE DONE BEFORE THE MODEL IS CREATED
// userSchema.plugin(encrypt, { secret: process.env.ENCRYPTION_KEY, encryptedFields: ['password'] });
userSchema.plugin(passportLocalMongoose);

// Create a model to use
const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home", {});
})

app.get("/login", function (req, res) {
    res.render("login", {});
})

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    req.login(user, function (err) {
        if (err) {
            console.log("err")
        } else {
            passport.authenticate("local")(req, res, function (err) {
                res.redirect("secrets")
            })
        }
    })
    // User.findOne({ email: req.body.username }, function (err, foundUser) {
    //     if (!err) {
    //         if (!foundUser) {
    //             // console.log("No results");
    //             res.redirect("login");
    //         } else {
    //             bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
    //                 if (err) {
    //                     res.redirect("register")
    //                 } else {
    //                     if (result) {
    //                         res.render("secrets");
    //                     } else {
    //                         res.redirect("login");
    //                     }
    //                 }
    //             });
    //         }

    //     } else {
    //         res.redirect("login");
    //     }
    // })
})

app.get("/register", function (req, res) {
    res.render("register", {});
})

app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("login");
    }
})

app.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
})
app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    })

    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     if (err) {
    //         res.redirect("register")
    //     } else {
    //         const newUser = new User({
    //             email: req.body.username,
    //             password: hash,
    //         })

    //         newUser.save(function (err) {
    //             if (!err) {
    //                 res.render("secrets")
    //             } else {
    //                 console.log(err)
    //             }
    //         })
    //     }
    // });
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})