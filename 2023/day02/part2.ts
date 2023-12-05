import * as fs from "fs";

const input = fs.readFileSync("2023/day02/input.txt", "utf8");

let redCubes = 1;
let greenCubes = 1;
let blueCubes = 1;

const inputLines = input.split("\n");

const colorRegex = /(\d+) (\w+)/g;

function resetCubes() {
  redCubes = 1;
  greenCubes = 1;
  blueCubes = 1;
}

let totalSum = 0;

for (const line of inputLines) {
  // Extracting color counts in each section
  const colorSections = line.split(";");

  for (const colorSection of colorSections) {
    const colorMatches = colorSection.match(colorRegex);

    if (colorMatches) {
      colorMatches.forEach((match) => {
        const [count, color] = match.split(" ");
        const numberOfCubes = parseInt(count);

        if (color === "red" && numberOfCubes > redCubes)
          redCubes = numberOfCubes;
        if (color === "green" && numberOfCubes > greenCubes)
          greenCubes = numberOfCubes;
        if (color === "blue" && numberOfCubes > blueCubes)
          blueCubes = numberOfCubes;
      });
    }
  }

  const lineMultipliedCubes = redCubes * greenCubes * blueCubes;
  totalSum += lineMultipliedCubes;
  resetCubes();
}

console.log(totalSum);
