import {
  NodeType,
  solveDay14Part1,
  solveDay14Part2,
  tiltOneLine,
} from "./day-14";
import fs from "fs";

describe("Day 14", () => {
  it("tiltLine", () => {
    expect(
      tiltOneLine(
        ".OO...#.O.".split("").map((v) => v as NodeType),
        false
      )
    ).toEqual("OO....#O..".split("").map((v) => v as NodeType));
  });

  it("tiltLine reverse", () => {
    expect(
      tiltOneLine(
        ".OO...#.O.".split("").map((v) => v as NodeType),
        true
      )
    ).toEqual("....OO#..O".split("").map((v) => v as NodeType));
  });

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
    "#OO..#....\r\n";
  it("Solve day 14 part 1 exemple", () => {
    expect(solveDay14Part1(example)).toBe(136);
  });
  it("Solve day 14 part 2 exemple", () => {
    expect(solveDay14Part2(example)).toBe(64);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-14-input.txt`).toString();
  it("Solve day 14 part 1 puzzle", () => {
    expect(solveDay14Part1(puzzle)).toBe(109638);
  });
  it("Solve day 14 part 2 puzzle", () => {
    expect(solveDay14Part2(puzzle)).toBe(102657);
  });
});
