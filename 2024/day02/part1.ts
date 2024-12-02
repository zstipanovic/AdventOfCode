import * as fs from "fs";

const input = fs.readFileSync("2024/day02/input.txt", "utf8");

const lines = input.split("\n").map((line) => line.split(" ").map(Number));

let safe = 0;

lines.forEach((line: number[]) => {
  let isSafe = true;
  let isIncreasing = line[0] < line[1];

  for (let i = 0; i < line.length - 1; i++) {
    const diff = Math.abs(line[i] - line[i + 1]);
    if (diff > 3) {
      console.log(
        `Difference greater than 3 between ${line[i]} and ${line[i + 1]}`
      );
      isSafe = false;
    }
    if (isIncreasing && line[i] >= line[i + 1]) {
      console.log(
        `Not consistently increasing at ${line[i]} -> ${line[i + 1]}`
      );
      isSafe = false;
    } else if (!isIncreasing && line[i] <= line[i + 1]) {
      console.log(
        `Not consistently decreasing at ${line[i]} -> ${line[i + 1]}`
      );
      isSafe = false;
    }
  }
  if (isSafe) safe++;
});

console.log(safe);
