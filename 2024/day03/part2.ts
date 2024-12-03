import * as fs from "fs";

const input = fs.readFileSync("2024/day03/input.txt", "utf8");

const groupedMuls = [];
let currentGroup: number[][] = [];
let currentPrefix = "do";

input.split(/(don't|do)/i).forEach((segment, index) => {
  if (index % 2 === 0) {
    const muls =
      segment
        .match(/mul\(\d+,\d+\)/g)
        ?.map((match) => match.slice(4, -1).split(",").map(Number)) || [];
    currentGroup.push(...muls);
  } else {
    if (currentGroup.length > 0) {
      groupedMuls.push({ prefix: currentPrefix, muls: currentGroup });
      currentGroup = [];
    }
    currentPrefix = segment.toLowerCase();
  }
});

if (currentGroup.length > 0) {
  groupedMuls.push({ prefix: currentPrefix, muls: currentGroup });
}

console.log(groupedMuls);

let sum = 0;

groupedMuls.forEach((group) => {
  if (group.prefix === "do") {
    group.muls.forEach((numbers) => {
      sum += numbers[0] * numbers[1];
    });
  }
});

console.log(sum);
