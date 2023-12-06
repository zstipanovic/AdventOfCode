import * as fs from "fs";

const input = fs.readFileSync("2023/day04/input.txt", "utf8");

const lines = input.split("\n");

const separatorIndex = input.indexOf("|");

function countCommonNumbers(leftNumbers: number[], rightNumbers: number[]) {
  const commonNumbers = leftNumbers.filter((num) => rightNumbers.includes(num));
  return commonNumbers.length;
}

let copies: number[] = [];
let totalSum = 0;

for (const [index, line] of lines.entries()) {
  const indexCopy = copies[index] || 0;

  const colonIndex = input.indexOf(":");

  const leftSubstring = line.slice(colonIndex + 1, separatorIndex).trim();
  const rightSubstring = line.slice(separatorIndex + 1).trim();

  const leftNumbers = leftSubstring
    .split(" ")
    .map(Number)
    .filter((num) => num !== 0);
  const rightNumbers = rightSubstring
    .split(" ")
    .map(Number)
    .filter((num) => num !== 0);

  let commonCount = countCommonNumbers(leftNumbers, rightNumbers);
  let copy = indexCopy;

  for (let i = 1; i <= commonCount; i++) {
    copies[i + index] = copies[i + index] + 1 || 1;
  }

  while (copy > 0) {
    for (let i = 1; i <= commonCount; i++) {
      copies[i + index] = copies[i + index] + 1 || 1;
    }
    copy--;
  }
}

copies.forEach((copy) => {
  if (copy) totalSum += copy;
});

console.log(totalSum + lines.length);
