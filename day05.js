const fs = require("fs");

var input = fs.readFileSync("input/day5.txt", "utf8").split("\n");

function binary(pass, range) {
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

function find(input) {
    var max = 0;
    var seats = new Array();
    for (const pass of input) {
        var seatID =
            binary(pass.slice(0, 7), [0, 127]) * 8 +
            binary(pass.slice(7), [0, 7]);
        // find max
        if (seatID > max) {
            max = seatID;
        }
        // add to all seats
        seats.push(seatID);
    }
    console.log("Part 1: " + max);

    // sort based on numerical value, not comparing strings
    seats.sort(function (a, b) {
        return a - b;
    });
    for (const i in seats) {
        if (seats[parseInt(i) + 1] != seats[i] + 1) {
            console.log("Part 2: " + parseInt(seats[i] + 1));
            return;
        }
    }
}

find(input);
