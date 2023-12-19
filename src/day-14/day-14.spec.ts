import {
  NodeType,
  solveDay14Part1,
  solveDay14Part2,
  tiltOneLine,
} from "./day-14";
import fs from "fs";

describe("Day 14", () => {
  const toNode = (v: string) => v.split("").map((v) => v as NodeType);
  test.each([
    [toNode(".#....#..."), toNode(".#....#...")],
    [toNode("#.O...O..."), toNode("#OO.......")],
    [toNode(".O...O...#"), toNode("OO.......#")],
    [toNode(".OO...#.O."), toNode("OO....#O..")],
    [toNode("..O.#O#.O."), toNode("O...#O#O..")],
  ])("Tilt line %j", (input, expected) =>
    expect(tiltOneLine(input, false)).toEqual(expected)
  );

  test.each([
    [toNode(".#....#..."), toNode(".#....#...")],
    [toNode("#.O...O..."), toNode("#.......OO")],
    [toNode(".O...O...#"), toNode(".......OO#")],
    [toNode(".OO...#.O."), toNode("....OO#..O")],
    [toNode("..O.#O#.O."), toNode("...O#O#..O")],
  ])("Tilt line reverse %j", (input, expected) =>
    expect(tiltOneLine(input, true)).toEqual(expected)
  );

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
