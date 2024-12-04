import * as fs from "fs";

const input = fs.readFileSync("2024/day04/example.txt", "utf8");
const grid = input.split("\n").map((line) => line.split(""));

function countMASX(grid: string[][]): number {
  let count = 0;

  function searchX(x: number, y: number): boolean {
    const positions = [
      [x - 1, y - 1], // top-left
      [x - 1, y + 1], // top-right
      [x + 1, y - 1], // bottom-left
      [x + 1, y + 1], // bottom-right
    ];

    if (grid[x][y] !== "A") {
      return false;
    }

    const chars = positions.map(([nx, ny]) => {
      if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length) {
        return null;
      }
      return grid[nx][ny];
    });

    return (
      chars
        .filter((char) => char !== null)
        .sort()
        .join("") === "MSS"
    );
  }

  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      if (searchX(x, y)) {
        count++;
      }
    }
  }

  return count;
}

console.log(countMASX(grid));
