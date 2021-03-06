const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const _ = require('lodash');
const e = require('express');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const uri =
    'mongodb+srv://' +
    process.env.ATLAS_USER +
    ':' +
    process.env.ATLAS_PASS +
    '@first-cluster.r9nhd.mongodb.net/' +
    process.env.ATLAS_DB +
    '?retryWrites=true&w=majority';
//  Mongoose Connect
mongoose.connect(
    uri,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    function (err) {
        if (err) {
            console.log('Unable to connect to db', err);
            process.exit(1);
        } else {
            console.log('Connected to DB');
        }
    },
);

// Mongoose Create Schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Mongoose use Model
const Article = mongoose.model('Article', articleSchema);

// Since this is for a REST api we will follow standards

// Get the main page
app.get('/', function (req, res) {
    res.send('Invalid page please request articles');
});

app
    .route('/articles')
    // GET all Articles
    // endpoint/articles
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                foundArticles.forEach(function (article) {
                    // console.log("Article: ", article.title, article.content);
                });

                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    // Post a new article
    // endpoint/articles
    .post(function (req, res) {
        // get post info
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
        });
        // console.log(article, req.body)

        article.save(function (err) {
            if (err) {
                console.log('Unable to add ', article.title, 'to db ', err);
                res.send(err);
            } else {
                res.send('Article added successfully');
            }
        });
    })

    // Delete all articles
    // endpoint/
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send('Deleted all articles');
            } else {
                console.log('Unable to delete all articles ', err);
                res.send(err);
            }
        });
    });

app
    .route('/articles/:articleTitle')
    // GET a specific article
    // endpoint/article/:id
    .get(function (req, res) {
        articleTitle = req.params.articleTitle;
        // console.log(articleTitle)
        Article.findOne({ title: articleTitle }, function (err, article) {
            if (!err) {
                if (article == null) {
                    console.log('Couldnt find a matching article');
                    res.send('No article found with title ' + articleTitle);
                } else {
                    res.send(article);
                }
            } else {
                console.log('Couldnt find article', err);
                res.send(err);
            }
        });
    })

    // Put a Specific article (updated with replacement)
    // endpoint/article/:id
    .put(function (req, res) {
        // console.log(req.body, req.params.articleTitle);
        if (_.isEmpty(req.body)) {
            res.send('Unable to update with empty body');
        } else {
            Article.update(
                { title: req.params.articleTitle },
                req.body,
                { overwrite: true },
                function (err) {
                    if (!err) {
                        res.send('Successfully updated the article');
                    } else {
                        res.send(err);
                    }
                },
            );
        }
    })

    // Patch a specific article (update current found article)
    // endpoint/article/:id
    .patch(function (req, res) {
        if (_.isEmpty(req.body)) {
            res.send('Unable to update with empty body');
        } else {
            Article.update({ title: req.params.articleTitle },
                { $set: req.body },
                function (
                    err,
                ) {
                    if (!err) {
                        res.send('Successfully updated the article');
                    } else {
                        res.send(err);
                    }
                });
        }
    })

    // Delete a specific article
    // endpoint/article/:id
    .delete(function (req, res) {
        Article.findOneAndDelete({ title: req.params.articleTitle }, function (
            err,
            foundArticle,
        ) {
            if (!err) {
                if (foundArticle == null) {
                    res.send('No article found');
                } else {
                    res.send('Deleted article', foundArticle.title, foundArticle.content);
                }
            } else {
                res.send('Unable to delete article ', err);
            }
        });
    });

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started');
});
