const fs = require("fs");

var input = fs.readFileSync("input/day11.txt", "utf8").split("\n");

let arr = new Array();

var changed = false;

for (const line of input) {
    arr.push(line.split(""));
}
// remove last limit array
arr.pop();

adjacent = (loc, arr, part1) => {
    var count = 0;
    let directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];

    // look over floor if part 2
    var end = part1 ? 2 : arr[0].length;

    for (const dir of directions) {
        // only look at adjacent if part 1
        var go = dir;
        // per himmelsrichtung
        for (var i = 1; i < end; i++) {
            // go until seat found or end of seating area
            // get the location of loc+direction
            var adj = loc.map(function (num, idx) {
                return num + go[idx];
            });
            if (arr[adj[0]] && arr[adj[1]]) {
                // only look at in bounds seats
                var atIndex = arr[adj[0]][adj[1]];
                // see what is at that location
                if (atIndex == "#") {
                    count++;
                    break;
                } else if (atIndex == "L" || (part1 && atIndex == ".")) {
                    break;
                }
            }
            // increase himmelsrichtung
            go = go.map(function (num, idx) {
                return num + dir[idx];
            });
        }
    }
    return count;
};

apply = (arr, part1) => {
    // rules are applied to every seat simultaneously

    // shallow copy doesn't work because nested references will be
    // changed in the original array
    var newArr = arr.map((x) => x.map((y) => y));

    var limit = part1 ? 4 : 5;

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] == ".") {
                continue;
            }
            var adj = adjacent([row, col], arr, part1);
            if (arr[row][col] == "L" && adj == 0) {
                changed = true;
                newArr[row][col] = "#";
            } else if (arr[row][col] == "#" && adj >= limit) {
                changed = true;
                newArr[row][col] = "L";
            }
        }
    }
    return newArr;
};

iterations = (input, part1) => {
    let newArr = apply(input, part1);
    if (changed) {
        changed = false;
        return iterations(newArr, part1);
    } else {
        return JSON.stringify(newArr).match(/#/g).length;
    }
};

//console.table(arr);
console.log("Part 1: " + iterations(arr, true));
console.log("Part 2: " + iterations(arr, false));
