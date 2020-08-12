//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")
require('dotenv').config();


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri = "mongodb+srv://" + process.env.ATLAS_USER + ":" + process.env.ATLAS_PASS + "@first-cluster.r9nhd.mongodb.net/" + process.env.ATLAS_DB + "?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("DB connected");
  }
})

const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  }
})

const Item = mongoose.model("Item", itemsSchema);

// mongoose.connection.close()

// const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {

  const day = date.getDate();

  Item.find(function (err, foundItems) {
    if (err) {
      console.log("Unable to find items due to " + err)
    } else {
      // console.log(res)
      foundItems.forEach(function (item) {
        // items.push(item.name)
        console.log(item.name)

      })
      res.render("list", { listTitle: day, newListItems: foundItems });
    }
  })

});

app.post("/", function (req, res) {

  const item = new Item({
    name: req.body.newItem
  })

  item.save(function (err) {
    if (err) {
      console.log("Unable to add item due to " + err);
    } else {
      console.log(item.name, "Added successfully")
      res.redirect("/")
    }
  })
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }

});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
