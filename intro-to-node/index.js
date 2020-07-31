// Internal module use
// const fs = require('fs');

// fs.copyFileSync("file1.txt", "file2.txt");

// External module use
// npm install <module>
var superheroes = require("superheroes");
var supervillains = require("supervillains");


var mySuperHeroName = superheroes.random();
var myNemisis = supervillains.random();

console.log("The super hero showdown of a lifetime!")
console.log(mySuperHeroName + " vs " + myNemisis);