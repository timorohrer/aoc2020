const fs = require("fs");

var input = fs.readFileSync("input/day9.txt", "utf8").split("\n");

function sum2(index, input) {
    var arr = input.slice(index - 25, index);
    for (const s1 in arr) {
        for (const s2 in arr) {
            if (parseInt(arr[s1]) + parseInt(arr[s2]) == input[index]) {
                return true;
            }
        }
    }
    return false;
}

function sumN(n, value, input) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    for (const i in input) {
        var range = input.slice(i, parseInt(i) + n).map(Number);
        if (range.reduce(reducer) == value) {
            return range;
        }
    }
}

function part1(input) {
    for (var i = 25; i < input.length; i++) {
        if (!sum2(i, input)) {
            console.log("Part 1: ");
            return input[i];
        }
    }
}

function part2(input) {
    for (var i = 2; i < 20; i++) {
        var range = sumN(i, 57195069, input);
        if (range) {
            var max = Math.max(...range);
            var min = Math.min(...range);
            console.log("Part 2: ");
            return max + min;
        }
    }
}

console.log(part1(input));
console.log(part2(input));
