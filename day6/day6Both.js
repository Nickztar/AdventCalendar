const { readFileSync } = require('fs');
const re = new RegExp('\r', 'g');
const input = readFileSync("./day6Input.txt", "utf8").replace(re, '').split('\n').map(s => s.split(')'));
console.time("RuntimeP1");
console.time("RuntimeP2");
//Maps out all of the points and their parents
//AAA: { parent: {parent: { parent: ....}}},
//...
const nodes = {};
for ([base, orbit] of input){
    const x = nodes[orbit] || {};
    const y = nodes[base] || {};
    x.parent = y;
    nodes[orbit] = x;
    nodes[base] = y
}

//Loop over each node and count the amount of orbits.
let orbitCheck = 0;
for(const key of Object.keys(nodes)){
    let temp = nodes[key];
    while(temp.parent){
        orbitCheck++;
        temp = temp.parent
    }
}
console.log(`Part 1: ${orbitCheck}`);
console.timeEnd("RuntimeP1");


//Walk from both directions. Walk from me and santa and count the steps it took from each directon
let me = nodes.YOU.parent;
let fromMe = 0;
while(me.parent){
    let santa = nodes.SAN.parent;
    let fromSanta = 0;
    while(santa.parent){
        santa = santa.parent;
        fromSanta++;
        if (santa === me){ //If me and santa meet. Somewhere in the middle
            console.log(`Part 2: ${fromMe + fromSanta}`);
            console.timeEnd("RuntimeP2");
            process.exit(0);
        }
    }
    me = me.parent;
    fromMe++;
}
/* 
Part 1: 147807
RuntimeP1: 25.881ms
Part 2: 229
RuntimeP2: 32.357ms
*/