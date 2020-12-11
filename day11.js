const fs = require("fs");

var input = fs.readFileSync("input/day11.txt", "utf8").split("\n");
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n");

let arr = new Array();

var changed = false;

for (const line of input) {
    arr.push(line.split(""));
}
// remove last limit array
arr.pop();

function adjacent(loc, arr, part) {
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

    for (const dir of directions) {
        // only look at adjacent if part 1
        var end = part ? 2 : arr[0].length;
        var go = dir;
        // per himmelsrichtung
        for (var i = 1; i < end; i++) {
            // go until seat found or end of seating area
            // get the location of loc+direction
            var adj = loc.map(function (num, idx) {
                return num + go[idx];
            });
            try {
                // see what is at that location
                var atIndex = arr[adj[0]][adj[1]];
                if (atIndex == "#") {
                    // found occupied seat
                    count++;
                    break;
                } else if (atIndex == "L") {
                    // found limit seat
                    break;
                } else if (part && atIndex == ".") {
                    // found floor
                    break;
                } else if (atIndex == undefined) {
                    break;
                }
            } catch (err) {
                //end of seating area
                break;
            }
            //console.log(loc, dir, go);
            // increase himmelsrichtung
            go = go.map(function (num, idx) {
                return num + dir[idx];
            });
        }
    }
    return count;
}

function apply(arr, part) {
    // rules are applied to every seat simultaneously

    // shallow copy doesn't work because nested references will be
    // changed in the original array
    var newArr = arr.map((x) => x.map((y) => y));

    var limit = part ? 4 : 5;

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if (arr[row][col] == ".") {
                continue;
            }
            var adj = adjacent([row, col], arr, part);
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
}

function iterations(input, part) {
    let newArr = apply(input, part);
    if (changed) {
        changed = false;
        return iterations(newArr, part);
    } else {
        return JSON.stringify(newArr).match(/#/g).length;
    }
}

//console.table(arr);
console.log("Part 1: " + iterations(arr, true));
console.log("Part 2: " + iterations(arr, false));
