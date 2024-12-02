import * as fs from "fs";

const input = fs.readFileSync("2024/day01/example.txt", "utf8");

const lines = input.split("\n");

const leftSide: number[] = [];
const rightSide: number[] = [];

lines.forEach((line: any) => {
  const parts = line.split("   ");

  const left = parseInt(parts[0]);
  const right = parseInt(parts[1]);

  leftSide.push(left);
  rightSide.push(right);
});

leftSide.sort((a, b) => a - b);
rightSide.sort((a, b) => a - b);

let totalSum = 0;

for (let i = 0; i < leftSide.length; i++) {
  const currentSum = Math.abs(leftSide[i] - rightSide[i]);
  totalSum += currentSum;
}

console.log(totalSum);
