import * as fs from "fs";

console.time("Execution Time");

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

let inputData: number[] = [];

lines.forEach((line) => {
  if (line.includes("seeds:")) {
    inputData = extractNumbersFromString(line);
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

function convertFromTo(sectionArray: any) {
  inputData.forEach((inputNumber, index) => {
    let changedNumber = inputNumber;
    for (let i = 0; i < sectionArray.length; i++) {
      const destinationRange = sectionArray[i][0];
      const sourceRange = sectionArray[i][1];
      const range = sectionArray[i][2];

      const lastSource = sourceRange + range - 1;

      if (inputNumber < sourceRange) continue;

      if (inputNumber > lastSource) continue;

      const delta = destinationRange - sourceRange; // 50 - 50 = 0

      changedNumber = inputNumber + delta; // 79 + 0 = 79
    }

    inputData[index] = changedNumber;
  });
}

const time1 = performance.now();
console.log("started with converting", time1);
convertFromTo(sections[TypeOfMaps.seedToSoil]);
const time2 = performance.now();
console.log("seedToSoil", time2 - time1);
convertFromTo(sections[TypeOfMaps.soilToFertilizer]);
const time3 = performance.now();
console.log("soilToFertilizer", time3 - time2);
convertFromTo(sections[TypeOfMaps.fertilizerToWater]);
const time4 = performance.now();
console.log("fertilizerToWater", time4 - time3);
convertFromTo(sections[TypeOfMaps.waterToLight]);
const time5 = performance.now();
console.log("waterToLight", time5 - time4);
convertFromTo(sections[TypeOfMaps.lightToTemperature]);
const time6 = performance.now();
console.log("lightToTemperature", time6 - time5);
convertFromTo(sections[TypeOfMaps.temperatureToHumidity]);
const time7 = performance.now();
console.log("temperatureToHumidity", time7 - time6);
convertFromTo(sections[TypeOfMaps.humidityToLocation]);
const time8 = performance.now();
console.log("humidityToLocation", time8 - time7);

console.log("total time", time8 - time1);

console.log(inputData);

console.log(Math.min(...inputData));
