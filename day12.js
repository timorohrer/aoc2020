const fs = require("fs");

var input = fs.readFileSync("input/day12.txt", "utf8").split("\n");
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n");

let directions = ["N", "E", "S", "W"];

run = (input, ip, pos) => {
    switch (input[ip].slice(0, 1)) {
        case "N":
            pos[1] += parseInt(input[ip].slice(1));
            break;
        case "S":
            pos[1] -= parseInt(input[ip].slice(1));
            break;
        case "E":
            pos[0] += parseInt(input[ip].slice(1));
            break;
        case "W":
            pos[0] -= parseInt(input[ip].slice(1));
            break;
        case "L":
            var amount = parseInt(input[ip].slice(1)) / 90;
            var index = directions.indexOf(pos[2]) - amount;
            index = index < 0 ? 4 - Math.abs(index) : index % 4;
            pos[2] = directions[index];
            break;
        case "R":
            var amount = parseInt(input[ip].slice(1)) / 90;
            var index = (directions.indexOf(pos[2]) + amount) % 4;
            pos[2] = directions[index];
            break;
        case "F":
            switch (pos[2]) {
                case "N":
                    pos[1] += parseInt(input[ip].slice(1));
                    break;
                case "S":
                    pos[1] -= parseInt(input[ip].slice(1));
                    break;
                case "E":
                    pos[0] += parseInt(input[ip].slice(1));
                    break;
                case "W":
                    pos[0] -= parseInt(input[ip].slice(1));
                    break;
            }
            break;
    }
    return pos;
};

loop = (input) => {
    var pos = [0, 0, "E"];
    for (const ip in input) {
        pos = run(input, ip, pos);
    }
    return Math.abs(pos[0]) + Math.abs(pos[1]);
};

newRules = (input, ip, pos, way) => {
    switch (input[ip].slice(0, 1)) {
        case "N":
            way[1] += parseInt(input[ip].slice(1));
            break;
        case "S":
            way[1] -= parseInt(input[ip].slice(1));
            break;
        case "E":
            way[0] += parseInt(input[ip].slice(1));
            break;
        case "W":
            way[0] -= parseInt(input[ip].slice(1));
            break;
        case "L":
            var amount = parseInt(input[ip].slice(1));
            while (amount > 0) {
                way = [-way[1], way[0]]
                amount -= 90
            }
            break;
        case "R":
            var amount = parseInt(input[ip].slice(1));
            while (amount > 0) {
                way = [way[1], -way[0]]
                amount -= 90
            }
            break;
        case "F":
            var times = parseInt(input[ip].slice(1));
            var move = way.map((x) => x * times);
            pos = pos.map(function (num, idx) {
                return num + move[idx];
            });
            break;
    }
    return [pos, way];
};

part2 = (input) => {
    var pos = [0, 0];
    var way = [10, 1];
    for (const ip in input) {
        [pos, way] = newRules(input, ip, pos, way);
    }
    return Math.abs(pos[0]) + Math.abs(pos[1]);
};

console.log("Part 1: " + loop(input));
console.log("Part 2: " + part2(input));
