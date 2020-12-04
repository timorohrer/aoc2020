const fs = require("fs");

var input = fs.readFileSync("input/day4.txt", "utf8").split("\n\n");

let expected_fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    //'cid'
];

function present(exp, passport) {
    for (const field of exp) {
        if (passport.includes(field)) {
            continue;
        } else return false;
    }
    return true;
}

function split(passport) {
    // split on any whitespace
    var fields = passport.split(/\s+/);
    // create faux key value pairs
    let out = [];
    for (const field of fields) {
        var single = field.split(":");
        out.push(single);
    }
    return out;
}

function get_pair(field, passport) {
    for (const pair of passport) {
        if (pair[0] == field) {
            return pair;
        }
    }
}

function valid(exp, passport) {
    passport = split(passport);
    for (const field of exp) {
        var pair = get_pair(field, passport);
        switch (field) {
            case "byr":
                if (pair[1].length != 4) {
                    //console.log("byr");
                    return false;
                } else if (pair[1] < 1920 || pair[1] > 2002) {
                    //console.log("byr");
                    return false;
                }
                break;
            case "iyr":
                if (pair[1].length != 4) {
                    //console.log("iyr");
                    return false;
                } else if (pair[1] < 2010 || pair[1] > 2020) {
                    //console.log("iyr");
                    return false;
                }
                break;
            case "eyr":
                if (pair[1].length != 4) {
                    //console.log("eyr");
                    return false;
                } else if (pair[1] < 2020 || pair[1] > 2030) {
                    //console.log("eyr");
                    return false;
                }
                break;
            case "hgt":
                if (pair[1].includes("cm")) {
                    pair[1] = pair[1].replace("cm", "");
                    if (pair[1] < 150 || pair[1] > 193) {
                        //console.log("hgt");
                        return false;
                    }
                } else if (pair[1].includes("in")) {
                    pair[1] = pair[1].replace("in", "");
                    if (pair[1] < 59 || pair[1] > 76) {
                        //console.log("hgt");
                        return false;
                    }
                }
                break;
            case "hcl":
                if (pair[1][0] != "#") {
                    //console.log("hcl");
                    return false;
                } else if (pair[1].length != 7) {
                    //console.log("hcl");
                    return false;
                } else if (!pair[1].match(/^[a-f0-9#]*$/)) {
                    //console.log("hcl");
                    return false;
                }
                break;
            case "ecl":
                let colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                if (!colors.includes(pair[1])) {
                    //console.log("ecl");
                    return false;
                }
                break;
            case "pid":
                if (pair[1].length != 9) {
                    //console.log("pid");
                    return false;
                }
                break;
        }
    }
    return true;
}

var part1 = 0;
var part2 = 0;
for (const passport of input) {
    if (present(expected_fields, passport)) {
        part1++;

        if (valid(expected_fields, passport)) {
            //console.log(passport + "\n");
            part2++;
        } else {
            ////console.log(passport + "\n");
        }
    }
}
console.log("Part 1: " + part1);
console.log("Part 2: " + part2);
