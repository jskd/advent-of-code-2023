import { Day11 } from "./day-11";
import fs from "fs";

describe("Day 11", () => {
  const example =
    "...#......\r\n" +
    ".......#..\r\n" +
    "#.........\r\n" +
    "..........\r\n" +
    "......#...\r\n" +
    ".#........\r\n" +
    ".........#\r\n" +
    "..........\r\n" +
    ".......#..\r\n" +
    "#...#.....";
  it("Solve day 11 part 1 exemple", () => {
    expect(Day11.solve(example, 2)).toBe(374);
  });
  it("Solve day 11 part 2 exemple", () => {
    expect(Day11.solve(example, 100)).toBe(8410);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-11-input.txt`).toString();
  it("Solve day 11 part 1 puzzle", () => {
    expect(Day11.solve(puzzle, 2)).toBe(10490062);
  });
  it("Solve day 11 part 2 puzzle", () => {
    expect(Day11.solve(puzzle, 1000000)).toBe(382979724122);
  });
});
