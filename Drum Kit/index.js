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
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        alert("LOL " + this.textContent);
    })
}
