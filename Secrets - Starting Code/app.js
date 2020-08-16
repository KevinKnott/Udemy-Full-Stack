const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
require("dotenv").config();

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


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

// Create a Schema for Users (Email and PASS)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// Create a model to use
const User = mongoose.model("User", userSchema)

app.get("/", function (req, res) {
    res.render("home", {});
})

app.get("/login", function (req, res) {
    res.render("login", {});
})

app.get("/register", function (req, res) {
    res.render("register", {});
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})