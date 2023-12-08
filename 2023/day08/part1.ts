import * as fs from "fs";

const input = fs.readFileSync("2023/day08/input.txt", "utf8");

const lines = input.split("\n");

const instructions = lines[0];
const navigation: any = {};

for (let i = 1; i < lines.length; i++) {
  const [key, value] = lines[i].split(" = ");
  if (value) navigation[key] = value.slice(1, -1).split(", ");
}

let keepLooking = true;
let steps = 0;
let index = 0;
let lookingFor = "AAA";

while (keepLooking) {
  const instruction = instructions[index];
  steps++;
  index++;

  const currentState = navigation[lookingFor];

  if (instruction === "R") {
    lookingFor = currentState[1];
    if (lookingFor === "ZZZ") keepLooking = false;
  }

  if (instruction === "L") {
    lookingFor = currentState[0];
    if (lookingFor === "ZZZ") keepLooking = false;
  }

  if (instructions.length == index) index = 0;
}

console.log(steps);
