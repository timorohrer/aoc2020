const fs = require("fs");

var input = fs.readFileSync("input/day14.txt", "utf8").split("\n");
input.pop();

replaceAt = function (str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
};

apply = (value, mask) => {
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] != "X") {
            value = replaceAt(value, i, mask[i]);
        }
    }
    return value;
};

part1 = (input) => {
    let memory = new Array();

    let mask = new String();
    let adress = new Number();
    let value = new Number();

    for (const line of input) {
        if (line.slice(0, 4) == "mask") {
            mask = line.slice(7);
        } else {
            [adress, value] = line.match(/\d+/g);
            value = BigInt(value).toString(2);
            value = value.padStart(mask.length, "0");
            memory[BigInt(adress)] = apply(value, mask);
        }
    }

    memory = memory.map((x) => parseInt(x, 2));

    return memory.reduce((a, b) => a + b, 0);
};

const allAdr = (mask) => {
    if (!mask.includes("X")) return mask;

    return [
        allAdr(mask.replace("X", "0")),
        allAdr(mask.replace("X", "1")),
    ].flat();
};

maskAdress = (adress, mask) => {
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] == "X") {
            adress = replaceAt(adress, i, "X");
        } else if (mask[i] == "1") {
            adress = replaceAt(adress, i, "1");
        }
    }
    return allAdr(adress);
};
part2 = (input) => {
    const memory = {};

    let mask = new String();
    let adress = new Number();
    let value = new Number();

    for (const line of input) {
        if (line.slice(0, 4) == "mask") {
            mask = line.slice(7);
        } else {
            [adress, value] = line.match(/\d+/g);
            value = parseInt(value);

            adress = BigInt(adress).toString(2);
            adress = adress.padStart(mask.length, "0");

            let adresses = maskAdress(adress, mask);
            for (const adress of adresses) {
                memory[adress] = value;
            }
        }
    }
    return Object.values(memory).reduce((sum, x) => sum + x);
};

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));

