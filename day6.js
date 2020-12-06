const fs = require("fs");

var input = fs.readFileSync("input/day6.txt", "utf8").split("\n\n");

var sum1 = 0;
var sum2 = 0;
for (var group of input) {
    // Part 1
    let set = new Set();
    let common = new Set();
    for (var person of group) {
        for (const q of person) {
            set.add(q);
        }
    }
    sum1 += set.size;
    if (set.has("\n")) {
        sum1--;
    }

    // Part 2
    group = group.split("\n");
    if (group.includes('')) {
        group.pop();
    }
    console.log("group******************");
    console.log(group);
    for (const q of group[0]) {
        common.add(q);
    }
    console.log("common******************");
    console.log(common);
    for (const person of group) {
        console.log("person************");
        console.log(person);
        for (const char of common) {
            if (!person.includes(char)) {
                console.log('yes');
                common.delete(char);
            }
        }
    }
    console.log(group);
    console.log(common);
    sum2 += common.size;
    
}

console.log(sum1);
console.log(sum2);
