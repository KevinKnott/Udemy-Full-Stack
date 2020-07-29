// Adding simple event listener for button
// document.querySelector("button").addEventListener("click", handleClick);

function handleClick() {
    alert("The " + this.textContent + " button was pressed!");
}

// Annonymous function call
// document.querySelectorAll("button")[1].addEventListener("click", function () {
//     alert("Number 2 baby");
// });

var buttons = document.querySelectorAll(".drum");
// console.log(buttons)
// buttons.forEach(doSomething);

// function doSomething(button) {
//     button.addEventListener("click", handleClick);
// }

// This is the same as
// Adding Event Listeners
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", playSound);

}

document.addEventListener("keydown", function (event) {
    // pass in event key
    // console.log(event.key);
    playSound(event);
})

function playSound(event) {
    console.log(event.key);

    switchKey = event.key || this.textContent;
    switch (switchKey) {
        case "w":
            snare.play()
            break;
        case "a":
            tom1.play()
            break;
        case "s":
            tom2.play()
            break;
        case "d":
            tom3.play()
            break;
        case "j":
            tom4.play()
            break;
        case "k":
            kick.play()
            break;
        case "l":
            crash.play()
            break;
        default:
            console.log("Unknown button pressed")
            break;
    }
}

var tom1 = new Audio("sounds/tom-1.mp3");
var tom2 = new Audio("sounds/tom-2.mp3");
var tom3 = new Audio("sounds/tom-3.mp3");
var tom4 = new Audio("sounds/tom-4.mp3");
var crash = new Audio("sounds/crash.mp3");
var kick = new Audio("sounds/kick-bass.mp3");
var snare = new Audio("sounds/snare.mp3");

// Potentially better used function for creating obj (but these are simple)
// function DrumAudio(mappedLetter, audio) {
//     this.mappedLetter = mappedLetter;
//     this.audio = new Audio("sounds/" + audio);
//     this.play = audo.play
// }

// Object
// var houseKeeper = {
//     name: "Jane",
//     yearsOfExperience: 12,
//     skills: ["Toilets", "Sinks", "Sweeping", "Mopping"],
//     clean: function () {
//         alert("I will now begin cleaning the house");
//     }
// }


// For multiple we can create a constructor
// function HouseKeeper(name, yearsOfExperience, skills) {
//     this.name = name;
//     this.yearsOfExperience = yearsOfExperience;
//     this.skills = skills;
// }

// var houseKeeper1 = new HouseKeeper("Jane", 12, ["Toilets", "Sinks"]);

// Now for methods on objects
// function HouseKeeper(name, yearsOfExperience, skills) {
//     this.name = name;
//     this.yearsOfExperience = yearsOfExperience;
//     this.skills = skills;
//     this.clean = function () {
//         alert("I will now begin cleaning the house")
//     }
// };
