interface HashTable<T> {
    [key: string]: T;
}

const graph: HashTable<HashTable<number>> = {
    "start": {
        "a": 6,
        "b": 2,
    },
    "a": {
        "fin": 1,
    },
    "b": {
        "a": 3,
        "fin": 5,
    },
    "fin": {},
};

let costs: HashTable<number> = {};
costs["a"] = 6;
costs["b"] = 2;
costs["fin"] = Infinity;

let parents: HashTable<string> = {};
parents["a"] = "start";
parents["b"] = "start";
parents["fin"];

let processed: string[] = [];

function findLowestCostNode(costs: HashTable<number>) {
    let lowestCost = Infinity;
    let lowestCostNode = null;

    for (const node in costs) {
        const cost = costs[node];
        if (cost < lowestCost && processed.includes(node) === false) {
            lowestCost = cost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
}

let node = findLowestCostNode(costs);
while (node !== null) {
    const cost = costs[node];
    const neighbors = graph[node];
    for (const n of Object.keys(neighbors)) {
        const newCost = cost + neighbors[n];
        if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
        }
    }
    processed = processed.concat(node);
    node = findLowestCostNode(costs);
}

console.log("Costs from the start to each node:");
console.log(costs); // { a: 5, b: 2, fin: 6 }
