const fs = require("fs");

var input = fs.readFileSync("input/day13.txt", "utf8").split("\n");
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n");

part1 = (input) => {
    var earliest = parseInt(input[0]);
    var notes = input[1].split(",");

    let buses = new Array();
    for (const id in notes) {
        if (notes[id] != "x") {
            buses.push(parseInt(notes[id]));
        }
    }

    waiting = (time) => {
        for (const bus of buses) {
            if (time % bus == 0) {
                return bus * (time - earliest);
            }
        }
        time++;
        return waiting(time);
    };

    console.log("Part 1: " + waiting(earliest));
};

part1(input);

function modInv(a, b) {

   if (b == 0) {
     return [1, 0, a];
   }

   temp = modInv(b, a % b);
   x = temp[0];
   y = temp[1];
   d = temp[2];
   return [y, x-y*Math.floor(a / b), d];
}

chineseRemainder = (m, x) => {
    while (true) {
        let temp1 =
            modInv(m[1], m[0])[0] * x[0] * m[1] + modInv(m[0], m[1])[0] * x[1] * m[0];
        let temp2 = m[0] * m[1];

        x = x.slice(2);
        x = [temp1 % temp2] + x;

        m = m.slice(2);
        m = [temp2] + m;

        if (x.length == 1) {
            break;
        }
    }
    return x[0];
};

/*
part2 = (input) => {
    // brute force, doesn't work
    // all bus id's are coprime to each other
    // can apply chinese remainder theorem

    var time = parseInt(input[0]);
    var notes = input[1].split(",");

    let buses = new Map();
    for (const id in notes) {
        if (notes[id] != "x") {
            buses.set(parseInt(id), parseInt(notes[id]));
        }
    }
    console.log(buses.values());
};

part2(input);
*/
