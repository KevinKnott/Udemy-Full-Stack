const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// Add structure
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No name specified please include the name of the fruit!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid"
})

// fruit.save()

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

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("The fruits were added!");
//     }
// })

// Find all that we have added
Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        // Logs an array of the fruits that we have found
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        })
        // console.log(fruits);
    }
})

// Update
Fruit.updateOne({ _id: "uniqueID" }, { name: "Peach" }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Updated the document!");
    }
})

// Delete
Fruit.deleteOne({ name: "Peach" }, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Deleted the peach")
    }
})

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: {
        type: fruitSchema,
        required: true
    }
})

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "So sharp and sweet"
})

pineapple.save()

const person = new Person({
    name: "Shelby",
    age: 29,
    favoriteFruit: pineapple
})


person.save()


mongoose.connection.close()