// Array of 1-4 for which button color to append to array 
// every button click advances through loop
// Fail causes game over class
// Pass causes index to move one until end




// Var create game object
function Game() {
    // Initialize
    this.simonOrder = [];
    this.index = 0;
    this.isOver = true;
    this.colorMap = {
        "1": "green",
        "2": "red",
        "3": "yellow",
        "4": "blue",
    }

    // call color
    this.addColor = function () {
        var color = Math.random() * 4;
        color = Math.floor(color) + 1;
        this.simonOrder.push(this.colorMap[color]);
    }

    // wait for button click?
    this.checkColor = function (id) {
        console.log(ourGame.isOver);
        console.log(!ourGame.isOver);
        if (!ourGame.isOver) {
            alert("Check back next time");

        } else {
            alert("Your Game is over");

        }
    };

    // Add first color for when game starts
    this.addColor();
};

var ourGame = new Game();


function startGame() {

    console.log(ourGame);

    if (ourGame.isOver) {
        ourGame = new Game();
        ourGame.isOver = false;
        console.log(ourGame.simonOrder + " null ");
    } else {
        console.log("still in our game");
    }

}



$(document).on("keydown", function () {
    startGame();
});

$(".btn").on("click", function () {
    // console.log(this.id);
    ourGame.checkColor(this.id);
});