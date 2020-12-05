const fs = require("fs");

var input = fs.readFileSync("input/day5.txt", "utf8").split("\n");

function binary(pass, range) {
    //console.log(pass, range);
    if (pass[0] == "F" || pass[0] == "L") {
        return binary(pass.slice(1), [
            range[0],
            Math.floor((range[0] + range[1]) / 2),
        ]);
    } else if (pass[0] == "B" || pass[0] == "R") {
        return binary(pass.slice(1), [
            Math.ceil((range[0] + range[1]) / 2),
            range[1],
        ]);
    } else if (range[0] == range[1]) {
        return range[0];
    }
}

function range(low, high) {
    let out = [];
    for (var i = low; i < high; i++) {
        out.push(i);
    }
    return out;
}

function find(input) {
    var max = 0;
    let seats = [];
    for (const pass of input) {
        var row = binary(pass.slice(0, 7), [0, 127]);
        var column = binary(pass.slice(7), [0, 7]);
        var seatID = row * 8 + column;
        seats.push(seatID);
        if (seatID > max) {
            max = seatID;
        }
    }
    // sort based on numerical value, not comparing strings
    seats.sort(function (a, b) {
        return a - b;
    });

    let noGap = range(seats[0], seats[seats.length - 2]);
    let possible = [];
    for (const seat of noGap) {
        if (!seats.includes(seat)) {
            possible.push(seat);
        }
    }
    console.log("Part 1: " + max);
    console.log("Part 2: " + possible);
}

find(input);
