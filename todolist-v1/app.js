const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

// Tells app to use EJS as the vie engine
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    var today = new Date();
    var day = ""

    if (today.getDay() === 6 || today.getDay() === 0) {
        // res.write("Its the freaken weekend baby");
        day = "Weekend";
    } else {
        // res.write("Its a weekday --- BOOO");
        day = "Weekday"
    }

    // res.send();

    res.render("list", { weekDay: day });
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started on port", process.env.PORT || 3000);
})