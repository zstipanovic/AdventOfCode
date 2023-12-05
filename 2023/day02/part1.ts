import * as fs from "fs";

const input = fs.readFileSync("2023/day02/input.txt", "utf8");

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const inputLines = input.split("\n");

const gameRegex = /Game (\d+):/;
const colorRegex = /(\d+) (\w+)/g;

let numberOfValidGames = 0;

for (const line of inputLines) {
  // Extracting game number
  const gameNumberMatch = line.match(gameRegex);

  if (!gameNumberMatch) break;

  const gameNumber = parseInt(gameNumberMatch[1]);

  // Extracting color counts in each section
  const colorSections = line.split(";");

  let isGameValid = true;
  for (const colorSection of colorSections) {
    const colorMatches = colorSection.match(colorRegex);

    if (colorMatches) {
      colorMatches.forEach((match) => {
        let [count, color] = match.split(" ");

        if (color === "red" && parseInt(count) > RED_CUBES) isGameValid = false;
        if (color === "green" && parseInt(count) > GREEN_CUBES)
          isGameValid = false;
        if (color === "blue" && parseInt(count) > BLUE_CUBES)
          isGameValid = false;
      });
    }
  }

  if (isGameValid) numberOfValidGames += gameNumber;
}

console.log(numberOfValidGames);
