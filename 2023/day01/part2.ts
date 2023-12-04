import * as fs from "fs";

const input = fs.readFileSync("2023/day01/input.txt", "utf8");

const wordRegex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;

const lines = input.split("\n");

let arrayOfDigits: number[] = [];

function replaceStringWithNumber(str: string) {
  return str
    .replace("one", "1")
    .replace("two", "2")
    .replace("three", "3")
    .replace("four", "4")
    .replace("five", "5")
    .replace("six", "6")
    .replace("seven", "7")
    .replace("eight", "8")
    .replace("nine", "9");
}

for (const line of lines) {
  let mock,
    numbers = [];

  while ((mock = wordRegex.exec(line))) {
    numbers.push(mock[0]);
    wordRegex.lastIndex = mock.index + 1; // avoid infinite loop
  }

  if (numbers) {
    const firstNumber = replaceStringWithNumber(numbers[0]);
    const lastNumber = replaceStringWithNumber(numbers[numbers.length - 1]);

    console.log(firstNumber, lastNumber);

    arrayOfDigits = [...arrayOfDigits, parseInt(firstNumber + lastNumber)];
  }
}

let sum = 0;
for (const digit of arrayOfDigits) {
  sum += digit;
}

console.log("Sum: ", sum);
