import { Day14Part1 } from "./day-14";
import fs from "fs";

describe("Day 14", () => {
  const example =
    "O....#....\r\n" +
    "O.OO#....#\r\n" +
    ".....##...\r\n" +
    "OO.#O....O\r\n" +
    ".O.....O#.\r\n" +
    "O.#..O.#.#\r\n" +
    "..O..#O..O\r\n" +
    ".......O..\r\n" +
    "#....###..\r\n" +
    "#OO..#....";
  it("Solve day 14 part 1 exemple", () => {
    expect(Day14Part1.solve(example)).toBe(136);
  });

  /*it("Solve day 14 part 2 exemple", () => {
    expect(Day14Part2.solve(example)).toBe(64);
  });*/

  /*const puzzle = fs.readFileSync(`${__dirname}/day-14-input.txt`).toString();
  it("Solve day 14 part 1 puzzle", () => {
    expect(Day14Part1.solve(puzzle)).toBe(109638);
  });*/
});
