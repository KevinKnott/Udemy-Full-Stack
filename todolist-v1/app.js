const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.get("/", function (req, res) {
    res.send("Hello");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started on port", process.env.PORT || 3000);
})