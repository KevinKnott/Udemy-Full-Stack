// // Check if jQuery is ready if you have script tag in header
// $(document).ready(function () {
//     $('h1').css("color", "red");

// })

// Simple JQ selector
console.log($("h1"));
console.log($("button"))

// Manipulations of selectors
$("h1").css("color", "green");
console.log($("h1").css("color") + " " + $("h1").css("font-size"));

// Adding titles
$("h1").addClass("big-title margin-50");
setTimeout(function () {
    $("h1").removeClass("big-title");
}, 1500);

console.log("Does h1 have the margin-50 class: " + $("h1").hasClass("margin-50"))

// Set text for all matching
$("h1").text("Bye");
$("button").text("Don't Click Me");

// Set html
$("button").html("<strong>CLICK ME!</strong>");

// Update attributes
console.log($("a").attr("href"));
$("a").attr("href", "https://yahoo.com");
console.log("H1 has the classes: " + $("h1").attr("class"));

// Add event listener
$("h1").click(function () {
    $("h1").css("color", "purple");
});

$("button").click(function () {
    $("h1").css("color", "pink");
    doSometing();
});

$("input").keydown(function () {
    console.log("You pressed the key " + event.key);
});

// Listen to all
$(document).keydown(function () {
    console.log("You pressed the key " + event.key + " in the body");
    $("h1").text(event.key)
});


$("h1").on("mouseover", function () {
    $("h1").css("color", "red");
});


function doSometing() {
    alert("The button was pressed!" + this);
}

