const fs = require("fs");

var input = fs.readFileSync("input/day15.txt", "utf8");

input = input.match(/\d+/g).map(Number);

// last spoken will always be the turn before if it exists
// last before that is stored in a Map for fast lookups

turn = (n) => {
    let last = new Map();
    for (var i = 0; i < input.length; i++) {
        last.set(input[i], i);
    }
    let spoken = input[input.length - 1];
    for (var i = input.length; i < n; i++) {
        let temp = last.has(spoken) ? i - last.get(spoken) - 1 : 0;
        last.set(spoken, i - 1);
        spoken = temp;
    }
    return spoken;
};

console.log("Part 1: " + turn(2020));
console.log("Part 2: " + turn(30000000));
