function rollDice() {
    var diceRoll = Math.random() * 6;
    diceRoll = Math.floor(diceRoll) + 1;

    return diceRoll
}

function determinWinner(player1, player2) {

    if (player1 > player2) {
        return "<i class=\"fas fa-trophy\"></i> Player 1 wins!"
    } else if (player1 < player2) {
        return "Player 2 wins! <i class=\"fas fa-trophy\">"
    } else {
        return "Draw!"
    }

}

function playGame() {
    var player1 = rollDice()
    var player2 = rollDice()

    // document.querySelector("a").setAttribute("href", "https://bing.com")
    document.querySelector(".img1").setAttribute("src", "images/dice" + player1 + ".png");
    document.querySelector(".img2").setAttribute("src", "images/dice" + player2 + ".png");

    var newTitle = determinWinner(player1, player2);
    document.querySelector("h1").innerHTML = newTitle;
}