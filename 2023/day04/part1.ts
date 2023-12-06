import * as fs from "fs";

const input = fs.readFileSync("2023/day04/input.txt", "utf8");

const lines = input.split("\n");

const separatorIndex = input.indexOf("|");

let totalSum = 0;

function countCommonNumbers(leftNumbers: number[], rightNumbers: number[]) {
  const commonNumbers = leftNumbers.filter((num) => rightNumbers.includes(num));
  return commonNumbers.length;
}

for (const line of lines) {
  const leftSubstring = line
    .slice(line.indexOf(":") + 1, separatorIndex)
    .trim();
  const rightSubstring = line.slice(separatorIndex + 1).trim();

  const leftNumbers = leftSubstring
    .split(" ")
    .map(Number)
    .filter((num) => num !== 0);
  const rightNumbers = rightSubstring
    .split(" ")
    .map(Number)
    .filter((num) => num !== 0);

  const commonCount = countCommonNumbers(leftNumbers, rightNumbers);

  let points = 0;

  if (commonCount) {
    points = 1;

    for (let i = 1; i < commonCount; i++) {
      points *= 2;
    }
  }

  totalSum += points;
}

console.log(totalSum);
