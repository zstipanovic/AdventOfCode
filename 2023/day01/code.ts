import * as fs from "fs";

const input = fs.readFileSync("2023/day01/input.txt", "utf8");

const numberRegex = /\d/g;

const lines = input.split("\n");

let arrayOfDigits: number[] = [];

for (const line of lines) {
  const numbers = line.match(numberRegex);

  if (numbers) {
    const firstNumber = numbers[0];
    const lastNumber = numbers[numbers.length - 1];

    arrayOfDigits = [...arrayOfDigits, parseInt(firstNumber + lastNumber)];
  }
}

let sum = 0;
for (const digit of arrayOfDigits) {
  sum += digit;
}

console.log("Sum: ", sum);
