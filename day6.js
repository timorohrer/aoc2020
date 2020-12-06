const fs = require("fs");

var input = fs.readFileSync("input/day6.txt", "utf8").split("\n\n");

var sum1 = 0;
var sum2 = 0;
for (var group of input) {
    let answered = new Set();
    for (var person of group) {
        for (const q of person) {
            answered.add(q);
        }
    }
    sum1 += answered.size;
    if (answered.has("\n")) {
        sum1--;
    }

    // Part 2
    let common = new Set();
    group = group.split("\n");
    if (group.includes('')) {
        group.pop();
    }
    for (const q of group[0]) {
        common.add(q);
    }
    for (const person of group) {
        for (const char of common) {
            if (!person.includes(char)) {
                common.delete(char);
            }
        }
    }
    sum2 += common.size;
    
}

console.log(sum1);
console.log(sum2);
