const fs = require("fs");

var input = fs.readFileSync("input/day16.txt", "utf8").split("\n\n");
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n\n");

const range = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );

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

inRange = (field, rules) => {
    let reqRules = new Set();
    for (const rule of rules) {
        if (
            (field >= rule[0] && field <= rule[1]) ||
            (field >= rule[2] && field <= rule[3])
        ) {
            reqRules.add(rule);
        }
    }
    return reqRules.size > 0 ? [true, reqRules] : [false, undefined];
};

main = (input, part1) => {
    let [rules, your, nearby] = input;

    rules = parse(rules);
    nearby = parse(nearby);
    your = parse(your);

    let invalidFields = new Array();
    let validTickets = nearby.map((x) => x.map((y) => y));
    for (const ticket of nearby) {
        for (const field of ticket) {
            let [valid, rule] = inRange(parseInt(field), rules);
            if (!valid) {
                if (part1) {
                    invalidFields.push(field);
                } else {
                    validTickets.splice(nearby.indexOf(ticket));
                    break;
                }
            }
        }
    }
    if (part1) {
        return invalidFields.reduce((sum, x) => sum + x);
    } else {
        // get array of fields for the position
        transpose = (m) => m[0].map((x, i) => m.map((x) => x[i]));
        let positions = transpose(validTickets);

        let posRules = new Map();
        for (var pos = 0; pos < positions.length; pos++) {
            // loop over positions
            let temp = new Array();

            for (var i = 0; i < positions[pos].length; i++) {
                // loop over fields for a position

                // get valid rules for that field
                let [valid, reqRules] = inRange(positions[pos][i], rules);
                temp.push(reqRules);
            }
            // find itersection of the sets for the fields at the same position
            let req = temp.reduce((a, b) => [...a].filter((c) => b.has(c)));
            posRules.set(pos, req);
        }
        //console.log(posRules);

        let correspondRule = new Map();
        let tempRules = new Map(posRules);
        for (var l = 1; l < 22; l++) {
            // loop for different number possible rules
            for (let [pos, rule] of tempRules) {
                try {
                    if (rule.length == 1) {
                        // correspond positions with just one possible rule
                        correspondRule.set(rule[0], pos);
                        // remove assigned pos-rule pair
                        tempRules.delete(pos);
                    }
                } catch (err) {}
            }
            for (const key of correspondRule.keys()) {
                // remove corresponding pair from posRules
                for (let [pos, rule] of tempRules) {
                    // loop over tempRules
                    try {
                        // remove instances of key from correspondRule
                        if (rule.includes(key)) {
                            let newArr = rule;
                            newArr.splice(newArr.indexOf(key), 1);
                            tempRules.set(pos, newArr);
                        }
                    } catch (err) {}
                }
            }
            //console.log(tempRules);
            console.log(correspondRule);
        }
        let sum = new Number();
        let depature = rules.slice(0,6);
        for (const rule of depature) {
            let pos = correspondRule.get(rule);
            sum += your[pos];
        }
        console.log(correspondRule);
        return sum;
    }
};

//console.log("Part 1: " + main(input, true));
console.log("Part 2: " + main(input, false));
