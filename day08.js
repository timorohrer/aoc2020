const fs = require("fs");

var input = fs.readFileSync("input/day8.txt", "utf8").split("\n");

function run(input, ip, acc) {
    switch (input[ip].slice(0, 3)) {
        case "nop":
            ip++;
            break;
        case "acc":
            acc += parseInt(input[ip].slice(3));
            ip++;
            break;
        case "jmp":
            ip += parseInt(input[ip].slice(3));
            break;
    }
    return [ip, acc];
}

function loop(input) {
    var acc = 0;
    var ip = 0;
    let seen = new Set();
    while (!seen.has(ip)) {
        seen.add(ip);
        [ip, acc] = run(input, ip, acc);
    }
    return [ip, acc];
}

function flip(input) {
    const length = input.length;
    for (const index in input) {
        // make actual copy
        let new_input = input.slice();

        if (input[index].includes("nop")) {
            new_input[index] = "jmp" + input[index].slice(3);
        } else if (input[index].includes("jmp")) {
            new_input[index] = "nop" + input[index].slice(3);
        } else {
            continue;
        }

        const [ip, acc] = loop(new_input);
        if (ip == length - 1) {
            return acc;
        }
    }
}

console.log("Part 1: " + loop(input)[1]);
console.log("Part 2: " + flip(input));
