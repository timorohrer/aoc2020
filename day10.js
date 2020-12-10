const fs = require("fs");

var input = fs.readFileSync("input/day10.txt", "utf8").split("\n").map(Number);
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n").map(Number);

// sort as numbers
input.sort(function (a, b) {
    return a - b;
});

// add device's built-in adapter
input.push(input[input.length - 1] + 3);

var diff1 = 0;
var diff3 = 0;
var pow2 = 0;
var pow7 = 0;
for (var i = 0; i < input.length; i++) {
    var diff = input[i + 1] - input[i];
    var neg = (i >=3 ? input[i-3] : null);
    // part 1 checks
    if (diff == 1) {
        diff1++;
    } else if (diff == 3) {
        diff3++;
    }
    // part 2 checks
    if (input[i+1] - neg == 4) {
        pow2 -= 2;
        pow7++;
    } else if (input[i+1] - input[i-1] == 2) {
        pow2++;
    }
}

console.log("Part 1: " + (diff1 * diff3)),
console.log("Part 2: " + (2**pow2*7**pow7));
