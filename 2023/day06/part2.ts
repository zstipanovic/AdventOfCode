import * as fs from "fs";

const input = fs.readFileSync("2023/day06/input.txt", "utf8");

const lines = input.split("\n");

function extractNumbersFromString(str: any) {
  return str
    .split(/\s+/)
    .filter(function (el: any) {
      return el !== "" && !isNaN(el);
    })
    .map(Number);
}

let times: number[] = [];
let distances: number[] = [];
const numberRegex = /\D/g;

lines.forEach((line) => {
  if (line.includes("Time:")) {
    const fullNumber = line.replace(numberRegex, "");

    times = extractNumbersFromString(fullNumber);
  }

  if (line.includes("Distance:")) {
    const fullNumber = line.replace(numberRegex, "");
    distances = extractNumbersFromString(fullNumber);
  }
});

const allWaysToWin = [];

for (let i = 0; i < times.length; i++) {
  let waysToWin = 0;
  const currentTime = times[i];
  const currentDistance = distances[i];

  for (let j = currentTime - 1; j > 0; j--) {
    const holdingTime = times[i] - j;
    const remainingTime = times[i] - holdingTime;

    const holdingDistance = holdingTime * remainingTime;
    if (holdingDistance > currentDistance) waysToWin++;
  }

  allWaysToWin.push(waysToWin);
}

const totalWays = allWaysToWin.reduce(
  (accumulator, currentValue) => accumulator * currentValue,
  1
);

console.log(totalWays);
