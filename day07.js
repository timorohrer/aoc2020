const fs = require("fs");

var input = fs.readFileSync("input/day7.txt", "utf8").split("\n");
// why do I have to do this?
input.pop();

// Can be seen as a DAG and done with DFS and BFS
// DAG's or any graph really best implemented as a Adjacency list
// Best implemented as hashmap of hash sets

function build(input) {
    const adjacencyList = new Map();
    for (const rule of input) {
        var bags = new Object();
        let values = new Set();
        var words = rule.split(" ");
        var key = words.splice(0, 2).join(" ");
        for (const index in words) {
            if (words[index].match(/[0-9]/g) != null) {
                /*
                With number of bags
                bags[
                    words[parseInt(index) + 1] +
                        " " +
                        words[parseInt(index) + 2]
                ] = words[index];
                */
                values.add(
                    words[parseInt(index) + 1] +
                        " " +
                        words[parseInt(index) + 2]
                );
            }
        }
        adjacencyList.set(key, values);
    }
    return adjacencyList;
}

bfs("shiny gold");
