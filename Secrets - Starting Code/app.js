require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const e = require("express");

const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Setup passport session
app.use(session({
    secret: process.env.ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connnect to mongoose 
const uri =
    'mongodb+srv://' +
    process.env.ATLAS_USER +
    ':' +
    process.env.ATLAS_PASS +
    '@first-cluster.r9nhd.mongodb.net/' +
    process.env.ATLAS_DB +
    '?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function (err) {
    if (err) {
        console.log("Unable to connect to DB", err);
    } else {
        console.log("Connected to DB");
    }
})
mongoose.set('useCreateIndex', true);

// Create a Schema for Users (Email and PASS)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: String,
    spotifyId: String,
    secret: String,
})


// Use encryption - MUST BE DONE BEFORE THE MODEL IS CREATED
// userSchema.plugin(encrypt, { secret: process.env.ENCRYPTION_KEY, encryptedFields: ['password'] });
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Create a model to use
const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
}, function (accessToken, refreshToken, profile, cb) {
    // console.log(profile.id)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}
));

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/spotify/secrets",
}, function (accessToken, refreshToken, expires_in, profile, done) {
    // console.log(profile.id)

    User.findOne({ spotifyId: profile.id }, function (err, foundUser) {
        if (err) {
            return done(err)
        } else {
            if (!foundUser) {
                foundUser = new User({
                    spotifyId: profile.id,
                })

                console.log(foundUser)
                foundUser.save(function (err) {
                    if (err) {
                        return done(err)
                    } else {
                        return done(err, foundUser)
                    }
                })
            } else {
                // console.log("Yo")
                return done(err, foundUser)
            }
        }
    })

    // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
    //     console.log("User was added", user)
    //     return done(err, user);
    // })
}
));

app.get("/", function (req, res) {
    res.render("home", {});
})

app.get("/auth/google",
    passport.authenticate("google", { scope: ['profile'] })
);

app.get("/auth/google/secrets",
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect("/secrets")
    }
)

app.get("/auth/spotify",
    passport.authenticate('spotify')
);

app.get("/auth/spotify/secrets",
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect("/secrets")
    }
)

app.get("/login", function (req, res) {
    res.render("login", {});
})

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    req.login(user, function (err) {
        if (err) {
            console.log("err")
        } else {
            passport.authenticate("local")(req, res, function (err) {
                res.redirect("secrets")
            })
        }
    })
    // User.findOne({ email: req.body.username }, function (err, foundUser) {
    //     if (!err) {
    //         if (!foundUser) {
    //             // console.log("No results");
    //             res.redirect("login");
    //         } else {
    //             bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
    //                 if (err) {
    //                     res.redirect("register")
    //                 } else {
    //                     if (result) {
    //                         res.render("secrets");
    //                     } else {
    //                         res.redirect("login");
    //                     }
    //                 }
    //             });
    //         }

    //     } else {
    //         res.redirect("login");
    //     }
    // })
})

app.get("/register", function (req, res) {
    res.render("register", {});
})

app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("login");
    }
})

app.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
})
app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    })

    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     if (err) {
    //         res.redirect("register")
    //     } else {
    //         const newUser = new User({
    //             email: req.body.username,
    //             password: hash,
    //         })

    //         newUser.save(function (err) {
    //             if (!err) {
    //                 res.render("secrets")
    //             } else {
    //                 console.log(err)
    //             }
    //         })
    //     }
    // });
})

app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("login");
    }
})

app.post("/submit", function (req, res) {
    const submittedSecret = req.body.secret;

    console.log(req.user.id)

    User.findById(req.user.id, function (err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save(function () {
                    res.redirect("/secrets")
                })
            }
        }
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started");
})