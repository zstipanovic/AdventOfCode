import * as fs from "fs";

const input = fs.readFileSync("2023/day01/input.txt", "utf8");

const numberRegex = /\d/g;
const wordRegex = /(one|two|three|four|five|six|seven|eight|nine)/g;

const lines = input.split("\n");

let arrayOfDigits: number[] = [];

for (const line of lines) {
  const replacedNumbers = line.replace(wordRegex, (match) =>
    match
      .replace("one", "1")
      .replace("two", "2")
      .replace("three", "3")
      .replace("four", "4")
      .replace("five", "5")
      .replace("six", "6")
      .replace("seven", "7")
      .replace("eight", "8")
      .replace("nine", "9")
  );

  const numbers = replacedNumbers.match(numberRegex);

  if (numbers) {
    const firstNumber = numbers[0];
    const lastNumber = numbers[numbers.length - 1];

    console.log(firstNumber, lastNumber);

    arrayOfDigits = [...arrayOfDigits, parseInt(firstNumber + lastNumber)];
  }
}

let sum = 0;
for (const digit of arrayOfDigits) {
  sum += digit;
}

console.log("Sum: ", sum);
