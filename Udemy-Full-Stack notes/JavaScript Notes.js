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

// Another function to make sure I understand arguments 
function lifeInWeeks(ageInYears) {
  var left = 90 - ageInYears
  var months = left * 12;
  var weeks = left * 52;
  var days = left * 365;

  console.log("You have " + days + " days, " + weeks + " weeks, and " + months + " months left.")

}

lifeInWeeks(56);

// Numbers 
// Same as python really
var dogAge = prompt("What is your dogs age?");
humanAge = (dogAge - 2) * 4 + 21;
console.log("Your dog is " + humanAge + " in human years!");

var div = 11 / 2
var rem = 11 % 2
console.log(div + " " + rem);

// Simple for loop 
// ++ increment by one
// -- decrement by one
// *= increment by mult whatever number is after 
// /= decrement by div whatever number is after 
var index = 0;
for (; index <= 10; index++) {
  console.log(index);
}

// Creating simple BMI calculator in metric
var yourWeight = prompt("How much do you weigh?");
var yourHeight = prompt("How tall are you?");

function calculateBMI(weight, height) {
  var actual = weight / (Math.pow(height, 2));
  return Math.round(actual);
}

console.log(calculate(BMI(yourWeight, yourHeight)));
console.log(calculateBMI(65, 1.8))

// Random numbers
// Always random between 0 and .9999999999999999999 (a billion random number)

var percent = Math.random();
percent = percent * 100;
percent = Math.floor(percent) + 1;
console.log("Random percent: " + percent);

var dice = Math.random();
dice = dice * 6;
dice = Math.floor(dice) + 1;
console.log("Random Dice: " + dice)

//  Control Flow
//  === is equal and same type
//  ==  is equal can be different types
//  !== is not equal to
//  The rest are the same as python
if (percent > 70) {
  alert("Wow above 70% is quite rare");
} else if (percent > 30 && percent <= 70) {
  alert("That is just a normal percent");
}
else {
  alert("Big Yikes");
}

// Is leap year?
function isLeapYear(year) {
  var msg = "Not leap year.";

  if (year % 4 === 0) {
    if (year % 100 !== 0) {
      msg = "Leap year.";
    } else {
      if (year % 400 === 0) {
        msg = "Leap year.";
      }
    }
  }

  return msg;
}

// Collections and Arrays
var guestList = ["Kevin", "Kayla", "Jonothan", "Tiara", "Nicholas", "Komron"];
console.log(guestList[0] + guestList.length);

var potentialGuest = prompt("What is your name?");

if (guestList.includes(potentialGuest)) {
  alert("Welcome to the party " + potentialGuest);
} else {
  alert("You are not in the guest list please leave.")
}


// Fizz Buzz
// Print 1 to n where everything divisible by 3 is replaced with Fizz and 5 is replaced with Buzz (you can concatenate)
function fizzBuzz(n) {
  var result = [];
  var temp = "";
  for (index = 1; index <= n; index++) {
    temp = "";

    if (index % 3 === 0) {
      temp += "Fizz";
    }

    if (index % 5 === 0) {
      temp += "Buzz";
    }

    if (temp.length === 0) {
      result.push(index.toString());
    } else {
      result.push(temp);
    }

  }

  return result
}

// Fizz Buzz using while
function fizzBuzz(n) {
  var result = [];
  var temp = "";
  var index = 0;

  while (index < n) {
    index++
    temp = "";

    if (index % 3 === 0) {
      temp += "Fizz";
    }

    if (index % 5 === 0) {
      temp += "Buzz";
    }

    if (temp.length === 0) {
      result.push(index.toString());
    } else {
      result.push(temp);
    }

  }

  return result
}

// Who is Paying
var names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];

function whosPaying(names) {
  var number = Math.random() * (names.length - 1);
  number = Math.round(number);

  return (names[number] + " is going to buy lunch today!");
}

console.log(whosPaying(names));

// Fibonacci sequence
function fibonacci(n) {
  if (n === 1) {
    return 1;
  }
  if (n === 0) {
    return 0;
  }

  return fibonacci(n - 2) + fibonacci(n - 1);
}

console.log(fibonacci(14))

// Fibonacci but creating an array of all values up to n
// This can be updated to only use the result [0,1] thus usin O(1) space instead
function fibonacci_iterative(n) {
  var result = [0, 1]
  if (n === 1) {
    return result;
  }
  if (n === 0) {
    return [0];
  }

  for (i = 2; i <= n; i++) {
    result.push(result[i - 2] + result[i - 1]);
  }

  return result
}

console.log(fibonacci_iterative(14))

// This is how you add scripts to website however you want to load JS last so you can query by all selectors
// <!-- Inline JS -->
// <body onload="alert('Hello');">
//   <h1>Hello</h1>
//   <!-- Script Tag -->
//   <script type="text/javascript">
//     alert('Hello World');
//   </script>

//   <!-- Script Tag with Source -->
//   <script src="index.js"></script>