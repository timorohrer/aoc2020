const fs = require("fs");

// I can't import packages that are installed globally wtf?
// npm link <package>
const clone = require("rfdc")();

var input = fs.readFileSync("input/day11.txt", "utf8").split("\n");
//var input = fs.readFileSync("input/test.txt", "utf8").split("\n");
let arr = new Array();

for (const line of input) {
    arr.push(line.split(""));
}
// remove last empty array
arr.pop();

function adjacent(loc, arr) {
    var count = 0;
    let positions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];
    for (const pos of positions) {
        var new_loc = loc.map(function (num, idx) {
            return num + pos[idx];
        });
        try {
            if (arr[new_loc[0]][new_loc[1]] == "#") {
                count++;
            }
        } catch (err) {}
    }
    return count;
}

function first_adjacent(loc, arr) {
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
        var go = dir;
        // per himmelsrichtung
        for (var i = 1; i < 150; i++) {
            // go until seat found or end of seating area
            // get the location of loc+direction
            var adj = loc.map(function (num, idx) {
                return num + go[idx];
            });
            try {
                // see what is at that location
                if (arr[adj[0]][adj[1]] == "#") {
                    // found occupied seat
                    count++;
                    break;
                } else if (arr[adj[0]][adj[1]] == "L") {
                    // found empty seat
                    break;
                } else if (arr[adj[0]][adj[1]] == undefined) {
                    break;
                }
            } catch (err) {
                //end of seating area
                break;
            }

            // increase himmelsrichtung
            go = go.map(function (num, idx) {
                return num + dir[idx];
            });
        }
    }
    return count;
}

function apply(arr, empty) {
    // rules are applied to every seat simultaneously

    // shallow copy doesn't work because nested references will be
    // changed in the origional array
    let newArr = clone(arr);

    for (let row = 0; row < arr.length; row++) {
        var innerLength = arr[row].length;
        for (let col = 0; col < innerLength; col++) {
            //var adj = adjacent([row, col], arr);
            var adj = first_adjacent([row, col], arr);
            if (arr[row][col] == "L" && adj == 0) {
                newArr[row][col] = "#";
            } else if (arr[row][col] == "#" && adj >= empty) {
                newArr[row][col] = "L";
            }
        }
    }
    return newArr;
}

function part1(input) {
    let newArr = apply(input, 5);
    //console.table(newArr);
    if (JSON.stringify(input) == JSON.stringify(newArr)) {
        return JSON.stringify(newArr).match(/#/g).length;
    } else {
        return part1(newArr);
    }
}

//console.log(part1(arr));
console.log(part1(arr));
