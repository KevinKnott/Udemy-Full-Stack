const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
var items = [];

// Tells app to use EJS as the vie engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    // if (today.getDay() === 6 || today.getDay() === 0) {
    //     // res.write("Its the freaken weekend baby");
    //     day = "Weekend";
    // } else {
    //     // res.write("Its a weekday --- BOOO");
    //     day = "Weekday"
    // }

    // switch (today.getDay()) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("invalid date please review", today);
    //         break;
    // }

    // res.send();
    // First variable is on EJS side and second is the variable in your app.js
    res.render("list", { weekDay: day, newListItems: items });
})

app.post("/", function (req, res) {
    items.push(req.body.newItem);

    // console.log(item);
    // Will not work
    // res.render("list", { newListItem: item })
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started on port", process.env.PORT || 3000);
})