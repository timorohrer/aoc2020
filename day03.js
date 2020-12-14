const fs = require("fs");

var input = fs.readFileSync("input/day3.txt", "utf8").split("\n");

// 0 index because modulus math

// position object
var pos = {
    line: 0,
    char: 0,
    move(slope) {
        // move to the right and wrap if necessary
        this.char = (this.char += slope[0]) % input[0].length;
        // move down
        this.line += slope[1];
    },
    reset() {
        this.line = 0;
        this.char = 0;
    },
};

// slopes to test
let slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

var results = "| ";
var product = 1;
for (const slope of slopes) {
    pos.reset();
    var trees = 0;
    for (var i = slope[1]; i < input.length; i += slope[1]) {
        pos.move(slope);
        if (input[i][pos.char] == "#") {
            trees++;
        }
    }
    results += "slope:" + slope + " trees:" + trees + " | ";
    product *= trees;
}
console.log(results);
console.log("Product: " + product);
