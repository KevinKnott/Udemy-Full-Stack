exports.getDate = function () {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);

}

exports.temp = function () {

}

// console.log(module.exports)

// if (today.getDay() === 6 || today.getDay() === 0) {
//     // res.write("Its the freaken weekend baby");
//     day = "Weekend";
// } else {
//     // res.write("Its a weekday --- BOOO");
//     day = "Weekday"
// }

// switch (today.getDay()) {
//     case 0:
//         day = "Sunday";
//         break;
//     case 1:
//         day = "Monday";
//         break;
//     case 2:
//         day = "Tuesday";
//         break;
//     case 3:
//         day = "Wednesday";
//         break;
//     case 4:
//         day = "Thursday";
//         break;
//     case 5:
//         day = "Friday";
//         break;
//     case 6:
//         day = "Saturday";
//         break;
//     default:
//         console.log("invalid date please review", today);
//         break;
// }

// res.send();
// First variable is on EJS side and second is the variable in your app.js