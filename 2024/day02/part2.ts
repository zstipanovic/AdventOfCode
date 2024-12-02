import * as fs from "fs";

const input = fs.readFileSync("2024/day02/input.txt", "utf8");

const lines = input.split("\n").map((line) => line.split(" ").map(Number));

let safe = 0;

const isLineSafe = (line: number[]) => {
  let isIncreasing = line[0] < line[1];
  for (let i = 0; i < line.length - 1; i++) {
    const diff = Math.abs(line[i] - line[i + 1]);
    if (
      diff > 3 ||
      (isIncreasing && line[i] >= line[i + 1]) ||
      (!isIncreasing && line[i] <= line[i + 1])
    ) {
      return false;
    }
  }
  return true;
};

lines.forEach((line: number[]) => {
  if (isLineSafe(line)) {
    safe++;
  } else {
    for (let j = 0; j < line.length; j++) {
      let tempLine = line.slice(0, j).concat(line.slice(j + 1));
      if (isLineSafe(tempLine)) {
        safe++;
        break;
      }
    }
  }
});

console.log(safe);
