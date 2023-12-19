import {
  NodeType,
  solveDay14Part1,
  solveDay14Part2,
  tiltOneLine,
  Direction,
  tiltMultipleLine,
} from "./day-14";
import fs from "fs";

describe("Day 14", () => {
  const toNode = (v: string) => v.split("").map((v) => v as NodeType);
  test.each([
    [".#....#...", ".#....#..."],
    ["#.O...O...", "#OO......."],
    [".O...O...#", "OO.......#"],
    [".OO...#.O.", "OO....#O.."],
    ["..O.#O#.O.", "O...#O#O.."],
  ])("Tilt line %s", (input, expected) =>
    expect(tiltOneLine(toNode(input), false)).toEqual(toNode(expected))
  );

  test.each([
    [".#....#...", ".#....#..."],
    ["#.O...O...", "#.......OO"],
    [".O...O...#", ".......OO#"],
    [".OO...#.O.", "....OO#..O"],
    ["..O.#O#.O.", "...O#O#..O"],
  ])("Tilt line reverse %s", (input, expected) =>
    expect(tiltOneLine(toNode(input), true)).toEqual(toNode(expected))
  );

  const toNodeGrid = (line: string[]) => line.map((node) => toNode(node));
  test.each([
    [
      // prettier-ignore
      ["O....#....", 
       "O.OO#....#", 
       ".....##...", 
       "OO.#O....O"],
      "north",
      // prettier-ignore
      ["OOOO.#....", 
       "O...#....#", 
       "O...O##..O", 
       "...#......"],
    ],
    [
      // prettier-ignore
      ["O....#....", 
       "O.OO#....#", 
       ".....##...", 
       "OO.#O....O"],
      "east",
      // prettier-ignore
      ["....O#....", 
       ".OOO#....#", 
       ".....##...", 
       ".OO#....OO"],
    ],
    [
      // prettier-ignore
      ["O....#....", 
       "O.OO#....#", 
       ".....##...", 
       "OO.#O....O"],
      "south",
      // prettier-ignore
      [".....#....", 
       "O...#....#", 
       "O..O.##...", 
       "OOO#O....O"],
    ],
    [
      // prettier-ignore
      ["O....#....", 
       "O.OO#....#", 
       ".....##...", 
       "OO.#O....O"],
      "west",
      // prettier-ignore
      ["O....#....", 
       "OOO.#....#", 
       ".....##...", 
       "OO.#OO...."],
    ],
  ])("Tilt multiple lines %s %s", (input, direction, expected) =>
    expect(tiltMultipleLine(toNodeGrid(input), direction as Direction)).toEqual(
      toNodeGrid(expected)
    )
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
