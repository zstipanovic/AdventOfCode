import * as fs from "fs";

const input = fs.readFileSync("2023/day09/input.txt", "utf8");

const lines = input.split("\n");

function extractNumbersFromString(str: any) {
  return str
    .split(/\s+/)
    .filter(function (el: any) {
      return el !== "" && !isNaN(el);
    })
    .map(Number);
}

let sum = 0;

for (const line of lines) {
  const numbers = extractNumbersFromString(line);

  let keepCouting = true;
  let index = 0;
  const arrayToIterate: number[][] = [numbers];

  while (keepCouting) {
    for (let i = 0; i < arrayToIterate[index].length; i++) {
      if (i + 2 > arrayToIterate[index].length) break;

      const diff = arrayToIterate[index][i + 1] - arrayToIterate[index][i];

      if (!arrayToIterate[index + 1]) arrayToIterate[index + 1] = [];

      arrayToIterate[index + 1][i] = diff;
    }

    if (arrayToIterate[index].every((el) => el === 0)) keepCouting = false;
    else index++;
  }

  let numberToSum = 0;

  while (index >= 0) {
    const lastNumber = arrayToIterate[index][arrayToIterate[index].length - 1];

    /*   arrayToIterate[index][arrayToIterate[index].length] =
      numberToSum + lastNumber; */

    numberToSum = numberToSum + lastNumber;
    if (index == 0) sum += numberToSum;
    index--;
  }
}

console.log(sum);
