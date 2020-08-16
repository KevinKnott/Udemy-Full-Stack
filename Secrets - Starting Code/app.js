const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
require("dotenv").config();

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})