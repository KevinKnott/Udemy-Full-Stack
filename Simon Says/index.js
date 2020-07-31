// Array of 1-4 for which button color to append to array 
// every button click advances through loop
// Fail causes game over class
// Pass causes index to move one until end

var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var blue = new Audio("sounds/blue.mp3");
var wrong = new Audio("sounds/wrong.mp3");


// Var create game object
function Game() {
    // Initialize
    this.simonOrder = [];
    this.index = 0;
    this.level = 0;
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
        color = this.colorMap[color]

        this.simonOrder.push(color);
        this.level += 1;
        $("#" + color).addClass("pressed")
        playButtonSound(color)
        setTimeout(function () {
            $("#" + color).removeClass("pressed")
        }, 200)
    }

    // wait for button click?
    this.checkColor = function (id) {
        if (!ourGame.isOver) {
            if (id === ourGame.simonOrder[this.index]) {
                this.index++;

                if (this.index === this.level) {
                    ourGame.addColor();
                    changeLevelTitle("Level " + this.level);
                    this.index = 0;
                }
            } else {
                gameOver();
            }

        } else {
            gameOver();
        }
    };

};

var ourGame = new Game();


function startGame() {

    console.log(ourGame);

    if (ourGame.isOver) {
        ourGame = new Game();
        ourGame.isOver = false;
        ourGame.addColor();
        changeLevelTitle("Level " + ourGame.level);
        // console.log(ourGame.simonOrder + " null ");
    }

}

function gameOver() {
    ourGame.isOver = true;
    wrong.play();
    changeLevelTitle("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200)
}

function changeLevelTitle(msg) {
    $("#level-title").text(msg);
}

function playButtonSound(id) {
    switch (id) {
        case "green":
            green.play();
            break;
        case "red":
            red.play();
            break;
        case "yellow":
            yellow.play();
            break;
        case "blue":
            blue.play();
            break;
        default:
            console.log("No id");
            break;
    }

}


$(document).on("keydown", function () {
    startGame();
});

$(".btn").on("click", function () {
    // console.log(this.id);
    ourGame.checkColor(this.id);
    playButtonSound(this.id);

});