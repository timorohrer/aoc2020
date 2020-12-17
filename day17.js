const fs = require("fs");

var input = fs.readFileSync("input/day17.txt", "utf8").split("\n");

main = (input, part1) => {
    const cube = (x, y, z, w) => {
        let out = new String();
        for (const d of [x, y, z, w]) {
            let sign = d < 0 ? "-" : "+";
            let tmp = new String(Math.abs(d));
            tmp = tmp.padStart(2, "0");
            out += sign + tmp;
        }
        return out;
    };

    const getCoord = (cube) => {
        let out = new Array();
        for (var i = 0; i < 12; i += 3) {
            out.push(
                cube.slice(i, i + 1) == "+"
                    ? parseInt(cube.slice(i + 1, i + 3))
                    : -parseInt(cube.slice(i + 1, i + 3))
            );
        }
        return out;
    };

    let space = new Set();

    for (var x = 0; x < input.length; x++) {
        for (var y = 0; y < input[x].length; y++) {
            if (input[x][y] == "#") {
                space.add(cube(x, y, 0, 0));
            }
        }
    }

    for (var i = 0; i < 6; i++) {
        let cache = new Set();
        let newSpace = new Set();

        for (const element of space) {
            [x, y, z, w] = getCoord(element);
            for (dx of [-1, 0, 1]) {
                for (dy of [-1, 0, 1]) {
                    for (dz of [-1, 0, 1]) {
                        for (dw of [-1, 0, 1]) {
                            if (w + dw == 0 || !part1) {
                                cache.add(cube(x + dx, y + dy, z + dz, w + dw));
                            }
                        }
                    }
                }
            }
        }

        for (const element of cache) {
            let count = 0;
            [x, y, z, w] = getCoord(element);
            for (dx of [-1, 0, 1]) {
                for (dy of [-1, 0, 1]) {
                    for (dz of [-1, 0, 1]) {
                        for (dw of [-1, 0, 1]) {
                            if (dx != 0 || dy != 0 || dz != 0 || dw != 0) {
                                if (
                                    space.has(
                                        cube(x + dx, y + dy, z + dz, w + dw)
                                    )
                                ) {
                                    count++;
                                }
                            }
                        }
                    }
                }
            }
            if (!space.has(element) && count == 3) {
                newSpace.add(cube(x, y, z, w));
            } else if (space.has(element) && [2, 3].includes(count)) {
                newSpace.add(cube(x, y, z, w));
            }
        }
        space = new Set(newSpace);
    }

    return space.size;
};

console.log("Part 1 " + main(input, true));
console.log("Part 1 " + main(input, false));
