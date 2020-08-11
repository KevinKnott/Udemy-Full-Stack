const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// Add structure
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
})

fruit.save()

// Insert many
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 7,
    review: "Nice and sweet"
})
const orange = new Fruit({
    name: "Orange",
    rating: 3,
    review: "You have to peel it"
})
const banana = new Fruit({
    name: "Banana",
    rating: 10,
    review: "The best around"
})

Fruit.insertMany([kiwi, orange, banana], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("The fruits were added!");
    }
})

mongoose.disconnect()