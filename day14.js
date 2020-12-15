const fs = require("fs");

var input = fs.readFileSync("input/day14.txt", "utf8").split("\n");
input.pop();

replaceAt = function (str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
};

allAdr = (mask) => {
    if (!mask.includes("X")) {
        return mask;
    } else {
        return [
            allAdr(mask.replace("X", "0")),
            allAdr(mask.replace("X", "1")),
        ].flat();
    }
};

maskValue = (value, mask) => {
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] != "X") {
            value = replaceAt(value, i, mask[i]);
        }
    }
    return parseInt(value, 2);
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

main = (input, part1) => {
    let memory = new Object();
    let mask = new String();

    for (const line of input) {
        if (line.slice(0, 4) == "mask") {
            mask = line.slice(7);
        } else {
            let [adress, value] = line.match(/\d+/g);

            if (part1) {
                value = BigInt(value).toString(2);
                value = value.padStart(mask.length, "0");
                memory[BigInt(adress)] = maskValue(value, mask);
            } else {
                value = parseInt(value);
                adress = BigInt(adress).toString(2);
                adress = adress.padStart(mask.length, "0");

                let adresses = maskAdress(adress, mask);
                for (const adress of adresses) {
                    memory[adress] = value;
                }
            }
        }
    }

    return Object.values(memory).reduce((sum, x) => sum + x);
};

console.log("Part 1: " + main(input, true));
console.log("Part 2: " + main(input, false));
