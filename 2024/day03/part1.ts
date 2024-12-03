import * as fs from "fs";

const input = fs.readFileSync("2024/day03/input.txt", "utf8");

const lines =
  input
    .match(/mul\(\d+,\d+\)/g)
    ?.map((match) => match.slice(4, -1).split(",").map(Number)) || [];

let sum = 0;

lines.forEach((line) => {
  sum += line[0] * line[1];
});

console.log(sum);
