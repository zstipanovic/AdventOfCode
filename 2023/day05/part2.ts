import * as fs from "fs";

const input = fs.readFileSync("2023/day05/input.txt", "utf8");

const lines = input.split("\n");

function extractNumbersFromString(str: any) {
  return str
    .split(/\s+/)
    .filter(function (el: any) {
      return el !== "" && !isNaN(el);
    })
    .map(Number);
}

let currentSection: string | null = null;
const sections: any = {};

enum TypeOfMaps {
  seedToSoil = "seed-to-soil map:",
  soilToFertilizer = "soil-to-fertilizer map:",
  fertilizerToWater = "fertilizer-to-water map:",
  waterToLight = "water-to-light map:",
  lightToTemperature = "light-to-temperature map:",
  temperatureToHumidity = "temperature-to-humidity map:",
  humidityToLocation = "humidity-to-location map:",
}

let ranges: any = {};

function* generateRange(start: number, count: number) {
  for (let i = 0; i < count; i++) {
    yield start + i;
  }
}

lines.forEach((line) => {
  if (line.includes("seeds:")) {
    const seedNumbers = extractNumbersFromString(line);

    for (let i = 0; i < seedNumbers.length; i += 2) {
      const start = seedNumbers[i];
      const count = seedNumbers[i + 1] || 0;

      let variableName = `range${i / 2}`;
      ranges[variableName] = generateRange(start, count);
    }
  }

  switch (line) {
    case TypeOfMaps.seedToSoil:
      currentSection = TypeOfMaps.seedToSoil;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.soilToFertilizer:
      currentSection = TypeOfMaps.soilToFertilizer;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.fertilizerToWater:
      currentSection = TypeOfMaps.fertilizerToWater;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.waterToLight:
      currentSection = TypeOfMaps.waterToLight;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.lightToTemperature:
      currentSection = TypeOfMaps.lightToTemperature;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.temperatureToHumidity:
      currentSection = TypeOfMaps.temperatureToHumidity;
      sections[currentSection] = [];
      break;
    case TypeOfMaps.humidityToLocation:
      currentSection = TypeOfMaps.humidityToLocation;
      sections[currentSection] = [];
      break;
    default:
      break;
  }

  if (currentSection) {
    const numbers = extractNumbersFromString(line);
    if (numbers.length)
      sections[currentSection] = [...sections[currentSection], numbers];
  }
});

function convertFromTo(sectionArray: any, value: number) {
  for (let i = 0; i < sectionArray.length; i++) {
    const destinationRange = sectionArray[i][0];
    const sourceRange = sectionArray[i][1];
    const range = sectionArray[i][2];

    const lastSource = sourceRange + range - 1;

    if (value < sourceRange) continue;

    if (value > lastSource) continue;

    const delta = destinationRange - sourceRange;

    return value + delta;
  }

  return value;
}

let range0 = ranges["range0"];
let nextValue = range0.next();

let min = null;

const time1 = performance.now();
console.log("started...");
while (!nextValue.done) {
  const seedToSoil = convertFromTo(
    sections[TypeOfMaps.seedToSoil],
    nextValue.value
  );
  const soilToFertilizer = convertFromTo(
    sections[TypeOfMaps.soilToFertilizer],
    seedToSoil
  );
  const fertilizerToWater = convertFromTo(
    sections[TypeOfMaps.fertilizerToWater],
    soilToFertilizer
  );
  const waterToLight = convertFromTo(
    sections[TypeOfMaps.waterToLight],
    fertilizerToWater
  );
  const lightToTemperature = convertFromTo(
    sections[TypeOfMaps.lightToTemperature],
    waterToLight
  );
  const temperatureToHumidity = convertFromTo(
    sections[TypeOfMaps.temperatureToHumidity],
    lightToTemperature
  );
  const humidityToLocation = convertFromTo(
    sections[TypeOfMaps.humidityToLocation],
    temperatureToHumidity
  );

  if (min === null) min = humidityToLocation;

  if (humidityToLocation < min) min = humidityToLocation;

  nextValue = range0.next();
}
const time8 = performance.now();

console.log("total time", time8 - time1);

console.log(min);
