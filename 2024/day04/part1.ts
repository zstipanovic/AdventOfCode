import * as fs from "fs";

const input = fs.readFileSync("2024/day04/input.txt", "utf8");
const grid = input.split("\n").map((line) => line.split(""));

function countXMAS(grid: string[][]): number {
  const target = "XMAS";
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // down-right
    [1, -1], // down-left
    [0, -1], // left
    [-1, 0], // up
    [-1, -1], // up-left
    [-1, 1], // up-right
  ];

  let count = 0;

  function search(x: number, y: number, dx: number, dy: number): boolean {
    for (let i = 0; i < target.length; i++) {
      // Calculate the new position based on the direction and step
      const nx = x + i * dx;
      const ny = y + i * dy;
      // Check if the new position is out of bounds or the character does not match
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= grid.length ||
        ny >= grid[0].length ||
        grid[nx][ny] !== target[i]
      ) {
        return false;
      }
    }
    return true; // All characters match in the given direction
  }

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      // Check all directions from the current cell
      for (const [dx, dy] of directions) {
        if (search(x, y, dx, dy)) {
          count++;
        }
      }
    }
  }

  return count;
}
console.log(countXMAS(grid));
