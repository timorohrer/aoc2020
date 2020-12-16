const fs = require("fs");

var input = fs.readFileSync("input/day16.txt", "utf8").split("\n\n");

parse = (input) => {
    input = input.split("\n");
    let out = new Array();
    for (const t of input) {
        try {
            out.push(t.match(/\d+/g).map(Number));
        } catch (err) {}
    }
    return out;
};

let [rules, your, nearby] = input;

rules = parse(rules);
nearby = parse(nearby);
your = parse(your);

let needed = Array(rules.length)
    .fill(true)
    .map((x) => Array(rules.length).fill(true));

let part1Ans = new Number();

for (const ticket of nearby) {
    let validTicket = true;
    for (const field of ticket) {
        let validField = false;
        for (var j = 0; j < rules.length; j++) {
            let [l1, h1, l2, h2] = rules[j];
            if ((l1 <= field && field <= h1) || (l2 <= field && field <= h2)) {
                validField = true;
            }
        }
        if (!validField) {
            part1Ans += parseInt(field);
            validTicket = false;
        }
    }
    if (validTicket) {
        for (var i = 0; i < ticket.length; i++) {
            for (var j = 0; j < rules.length; j++) {
                let [l1, h1, l2, h2] = rules[j];
                if (
                    !(
                        (l1 <= ticket[i] && ticket[i] <= h1) ||
                        (l2 <= ticket[i] && ticket[i] <= h2)
                    )
                ) {
                    needed[i][j] = false;
                }
            }
        }
    }
}

console.log("Part 1: " + part1Ans);

let correspond = new Map();
let usedRule = Array(rules.length).fill(false);
let found = 0;

while (true) {
    for (var i = 0; i < rules.length; i++) {
        let temp = new Array();
        for (var j = 0; j < rules.length; j++) {
            if (needed[i][j] && !usedRule[j]) {
                temp.push(j);
            }
        }
        if (temp.length == 1) {
            correspond.set(i, temp[0]);
            usedRule[temp[0]] = true;
            found++;
        }
    }
    if (found == rules.length) {
        break;
    }
}

let part2Ans = 1;
for (let [pos, rule] of correspond.entries()) {
    if (rule < 6) {
        part2Ans *= your[0][pos];
    }
}

console.log("Part 2: " + part2Ans);
