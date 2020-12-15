const fs = require("fs");

var input = fs.readFileSync("input/day15.txt", "utf8");

input = input.match(/\d+/g).map(Number);

let last = new Map();

turn = (n) => {
    var spoken = 0;
    for (var i = 0; i < n; i++) {
        if (i < input.length) {
            // read out loud starting numbers
            last.set(input[i], [i + 1]);
            spoken = input[i];
        } else {
            if (last.get(spoken).length == 1) {
                spoken = 0;
                try {
                    last.set(spoken, [i + 1, last.get(spoken)[0]]);
                } catch (err) {
                    last.set(spoken, [i + 1]);
                }
            } else {
                spoken = last.get(spoken)[0] - last.get(spoken)[1];
                try {
                    last.set(spoken, [i + 1, last.get(spoken)[0]]);
                } catch (err) {
                    last.set(spoken, [i + 1]);
                }
            }
        }
    }
    return spoken;
};

console.log("Part 1: " + turn(2020));
console.log("Part 2: " + turn(30000000));
