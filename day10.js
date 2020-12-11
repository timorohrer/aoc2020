const fs = require("fs");

var input = fs.readFileSync("input/day10.txt", "utf8").split("\n").map(Number);

// sort as numbers
input.sort(function (a, b) {
    return a - b;
});

// add device's built-in adapter
input.push(input[input.length - 1] + 3);

let diff1 = 0,
    diff3 = 0;

for (var i = 0; i < input.length; i++) {
    var diff = input[i + 1] - input[i];
    if (diff == 1) {
        diff1++;
    } else if (diff == 3) {
        diff3++;
    }
}

let SEEN = new Map();
function rec(i) {
    if (i == input.length - 1) {
        return 1;
    }
    if (SEEN.has(i)) {
        return SEEN.get(i);
    }
    var ans = 0;
    for (var j = i + 1; j < input.length; j++) {
        if (input[j] - input[i] <= 3) {
            ans += rec(j);
        }
    }
    SEEN.set(i, ans);
    return ans;
}

console.log("Part 1: " + diff1 * diff3);
console.log("Part 2: " + rec(0));
