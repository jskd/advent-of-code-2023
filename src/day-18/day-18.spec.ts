import { Day18 } from "./day-18";
import fs from "fs";

describe("Day 18", () => {
  const example =
    "R 6 (#70c710)\r\n" +
    "D 5 (#0dc571)\r\n" +
    "L 2 (#5713f0)\r\n" +
    "D 2 (#d2c081)\r\n" +
    "R 2 (#59c680)\r\n" +
    "D 2 (#411b91)\r\n" +
    "L 5 (#8ceee2)\r\n" +
    "U 2 (#caa173)\r\n" +
    "L 1 (#1b58a2)\r\n" +
    "U 2 (#caa171)\r\n" +
    "R 2 (#7807d2)\r\n" +
    "U 3 (#a77fa3)\r\n" +
    "L 2 (#015232)\r\n" +
    "U 2 (#7a21e3)";
  it("Solve day 18 part 1 exemple", () => {
    expect(Day18.solve(example, 1)).toBe(62);
  });
  it("Solve day 18 part 2 exemple", () => {
    expect(Day18.solve(example, 2)).toBe(952408144115);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-18-input.txt`).toString();
  it("Solve day 18 part 1 puzzle", () => {
    expect(Day18.solve(puzzle, 1)).toBe(46334);
  });
  it("Solve day 18 part 2 puzzle", () => {
    expect(Day18.solve(puzzle, 2)).toBe(102000662718092);
  });
});
