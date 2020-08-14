const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri = "mongodb+srv://" + process.env.ATLAS_USER + ":" + process.env.ATLAS_PASS + "@first-cluster.r9nhd.mongodb.net/" + process.env.ATLAS_DB + "?retryWrites=true&w=majority";
//  Mongoose Connect
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("Unable to connect to db", err);
        process.exit(1);
    } else {
        console.log("Connected to DB");
    }
})

// Mongoose Create Schema
const article = new mongoose.Schema({
    title: String,
    article: String,
});

// Mongoose use Model

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})