const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

// Tells app to use EJS as the vie engine
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    var today = new Date();
    var day = ""

    // if (today.getDay() === 6 || today.getDay() === 0) {
    //     // res.write("Its the freaken weekend baby");
    //     day = "Weekend";
    // } else {
    //     // res.write("Its a weekday --- BOOO");
    //     day = "Weekday"
    // }

    switch (today.getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            console.log("invalid date please review", today);
            break;
    }

    // res.send();
    // First variable is on EJS side and second is the variable in your app.js
    res.render("list", { weekDay: day });
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started on port", process.env.PORT || 3000);
})