import * as fs from "fs";

const input = fs.readFileSync("2024/day01/input.txt", "utf8");

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

let total = 0;

leftSide.forEach((left: number) => {
  const count = rightSide.filter((right: number) => right === left).length;
  total += count * left;
});

console.log(total);
