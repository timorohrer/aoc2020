const fs = require('fs')

var input = fs.readFileSync('input/day1.txt', 'utf8').split('\n').map(Number);

loop1:
for (const entry of input) {
    var sum = 0;
    for (const summand of input) {
        sum = entry + summand;
        if (sum == 2020) {
            console.log(entry*summand);
            break loop1;
        }
    }
}

loop2:
for (const i of input) {
    var sum = 0;
    for (const j of input) {
        for (const k of input) {
            if (i+j+k == 2020) {
                console.log(i*j*k);
                break loop2;
            }
        }
    }
}
