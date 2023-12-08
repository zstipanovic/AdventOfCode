import * as fs from "fs";

const input = fs.readFileSync("2023/day08/input.txt", "utf8");

const lines = input.split("\n");

const instructions = lines[0];
const navigation: any = {};

for (let i = 1; i < lines.length; i++) {
  const [key, value] = lines[i].split(" = ");
  if (value) navigation[key] = value.slice(1, -1).split(", ");
}

let steps = 0;
let index = 0;

const startingPoints = Object.keys(navigation).filter((key) => {
  if (key[2] === "A") return key;
});

const time1 = performance.now();
console.log("started...");

let periods = new Array(Object.keys(startingPoints).length).fill(0);

function gcd(a: number, b: number): number {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

for (let i = 0; i < startingPoints.length; i++) {
  let keepLooking = true;
  steps = 0;
  index = 0;

  while (keepLooking) {
    const instruction = instructions[index];
    const currentState = navigation[startingPoints[i]];
    steps++;
    index++;

    if (instruction === "R") {
      startingPoints[i] = currentState[1];
      if (startingPoints[i][2] === "Z") {
        keepLooking = false;
        periods[i] = steps;
      }
    }

    if (instruction === "L") {
      startingPoints[i] = currentState[0];
      if (startingPoints[i][2] === "Z") {
        keepLooking = false;
        periods[i] = steps;
      }
    }

    if (instructions.length == index) index = 0;
  }
}

let result = periods[0];

for (let i = 1; i < periods.length; i++) {
  result = lcm(result, periods[i]);
}

const time8 = performance.now();

console.log("total time", time8 - time1);

console.log(result);
