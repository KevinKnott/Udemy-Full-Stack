// First thing to test out is always
// alert("Hello World");

// Data Types in JS
// Variable
// String
var something = 'hello';
console.log(something);
typeof something;

// Number
var someNumber = 23;
console.log(something);
typeof something;

// boolean
var someBool = true;
console.log(something);
typeof something;

// Prompt
var myName = prompt('What is your name?');
var myAge = prompt('What is your age?');
console.log(myName);
console.log(myAge);

console.log(
  'Hello ' +
  myName +
  ' you have lived for ' +
  myAge +
  ' years what an achievement',
);

// Simple function that reverses variables a and b
function test() {
  var a = '8';
  var b = '3';

  var c = b;
  var b = a;
  var a = c;

  console.log('a is ' + a);
  console.log('b is ' + b);
}

// Properties
var tweet = prompt('Enter your tweet: ');
alert(
  'Your tweet has ' +
  tweet.length +
  ' characters, you have ' +
  (140 - tweet.length) +
  'characters left.',
);

// Taking a slice of arrays/strings
// The slice is (inclusive, exclusive) meaning start at 0 and end at exclusive - 1
alert('Your valid message reads as: ' + tweet.slice(0, 140));

// Simple function to capitalize first character of a users name
var usersName = prompt('What is your name?');

// TypeScript specific I am taking a user (string) and returning the updated string
// function capitalizeFirstLetter(user: string): string {
//   var firstLetter = user.slice(0, 1);
//   user = firstLetter.toUpperCase() + user.slice(1);
//   return user;
// }

function capitalizeFirstLetter(user) {
  var firstLetter = user.slice(0, 1);
  var restOfName = user.slice(1);
  user = firstLetter.toUpperCase() + restOfName.toLowerCase();
  return user;
}


console.log(capitalizeFirstLetter(usersName));


// Numbers 
// Same as python really
var dogAge = prompt("What is your dogs age?");
humanAge = (dogAge - 2) * 4 + 21;
console.log("Your dog is " + humanAge + " in human years!");

var div = 11 / 2
var rem = 11 % 2
console.log(div + " " + rem)

// Simple for loop
var x = 0;
for (; x <= 10; x++) {
  console.log(x)
}