import * as fs from "fs";

const input = fs.readFileSync("2023/day03/input.txt", "utf8");

const lines = input.split("\n");

let positions = [];

// GET SYMBOL POSITIONS
for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];

  for (let j = 0; j < currentLine.length; j++) {
    const char = currentLine[j];
    const isNumber = parseInt(char);

    if (!isNumber && char != ".") {
      positions.push({ x: j, y: i });
    }
  }
}

function checkAndGetNumber(char: string, line: string, x: number) {
  const isNumberChar = parseInt(char);

  //Check if Top is number
  if (isNumberChar) {
    let number = char;
    let isLeftNumber = true;
    let isRightNumber = true;

    //check leftNumber
    while (isLeftNumber) {
      const charBefore = line[x - 1];
      const isNumberCharBefore = parseInt(charBefore);

      if (isNumberCharBefore) {
        number = charBefore + number;
        isRightNumber = false;
        x--;
      } else {
        isLeftNumber = false;
      }
    }

    while (isRightNumber) {
      const charAfter = line[x + 1];
      const isNumberCharAfter = parseInt(charAfter);

      if (isNumberCharAfter) {
        number = number + charAfter;
        x++;
      } else {
        isRightNumber = false;
      }
    }

    return parseInt(number);
  }
}

function checkLine(line: string, x: number) {
  if (!line) return;

  const char = line[x];
  const charBefore = line[x - 1];
  const charAfter = line[x + 1];

  const isTop = checkAndGetNumber(char, line, x);
  if (isTop) return isTop;
  const isTopLeft = checkAndGetNumber(charBefore, line, x - 1);
  if (isTopLeft) return isTopLeft;
  const isTopRight = checkAndGetNumber(charAfter, line, x + 1);
  if (isTopRight) return isTopRight;
}

let allNumbersArray: number[] = [];

for (let i = 0; i < positions.length; i++) {
  const { x, y } = positions[i];

  const lineBefore = lines[y - 1];
  const lineAfter = lines[y + 1];

  const lineBeforeNumber = checkLine(lineBefore, x);
  const lineAfterNumber = checkLine(lineAfter, x);
  const currentLine = checkLine(lines[y], x);

  const allNumbers = [lineBeforeNumber, lineAfterNumber, currentLine].filter(
    Number
  );

  allNumbers.forEach((number) => {
    if (number) allNumbersArray.push(number);
  });
}

let sum = 0;
allNumbersArray.forEach((number) => (sum += number));
console.log(sum);
