const fs = require("fs");

var input = fs.readFileSync("input/day2.txt", "utf8").split("\n");

var task1 = 0;
var task2 = 0;
for (const line of input) {
    var [range, letter, password] = line.split(" ");
    try {
        var myRe = new RegExp(letter[0], "g");
        var count = password.match(myRe).length;
    } catch (error) {}

    var [low, high] = range.split("-");
    if (count >= low && count <= high) {
        task1++;
    }

    try {
        if (password[low - 1] == letter[0]) {
            if (password[high - 1] != letter[0]) {
                task2++;
            }
        } else {
            if (password[high - 1] == letter[0]) {
                task2++;
            }
        }
    } catch (eror) {}
}

console.log(task1, task2);
