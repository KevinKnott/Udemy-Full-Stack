const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
require('dotenv').config();

// View Exports
// console.log(date);
// console.log(date());


const app = express();
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = []

// Tells app to use EJS as the vie engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();
    res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function (req, res) {
    // console.log(req.body.list)

    if (req.body.list === "Work List") {
        workItems.push(req.body.newItem)
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }


    // console.log(item);
    // Will not work
    // res.render("list", { newListItem: item })
    // res.redirect("/");
})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.get("/about", function (req, res) {
    res.render("about");
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started on port", process.env.PORT || 3000);
})