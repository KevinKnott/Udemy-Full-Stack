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
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Mongoose use Model
const Article = mongoose.model("Article", articleSchema);

// Since this is for a REST api we will follow standards

// GET all Articles
// endpoint/articles
app.get("/", function (req, res) {
    Article.find(function (err, foundArticles) {
        if (!err) {
            foundArticles.forEach(function (article) {
                console.log("Article", article.title, article.content);
            })
        }
    })
})

// Post a new article
// endpoint/articles

// Delete all articles
// endpoint/

// GET a specific article
// endpoint/article/:id

// Put a Specific article (updated with replacement)
// endpoint/article/:id

// Patch a specific article (update current found article)
// endpoint/article/:id

// Delete a specific article
// endpoint/article/:id




app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})