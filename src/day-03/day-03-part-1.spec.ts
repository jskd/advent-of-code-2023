import { Day03Part1, NumberPos } from "./day-03-part-1";
import fs from "fs";

describe("Day 3 part 1", () => {
  const example = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  const symbols = [[], [3], [], [6], [3], [5], [], [], [3, 5], []];

  it("Find symbols position", () => {
    expect(Day03Part1.findSymbolPos(example)).toStrictEqual(symbols);
  });

  it("Find numbers position", () => {
    expect(Day03Part1.getNumberPos(example)).toStrictEqual([
      new NumberPos(0, 0, "467"),
      new NumberPos(0, 5, "114"),
      new NumberPos(2, 2, "35"),
      new NumberPos(2, 6, "633"),
      new NumberPos(4, 0, "617"),
      new NumberPos(5, 7, "58"),
      new NumberPos(6, 2, "592"),
      new NumberPos(7, 6, "755"),
      new NumberPos(9, 1, "664"),
      new NumberPos(9, 5, "598"),
    ]);
  });

  it("Find if number is adjacent", function () {
    expect(Day03Part1.isAdjacent({ value: "467", x: 0, y: 0 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "114", x: 0, y: 5 }, symbols)).toBe(
      false
    );
    expect(Day03Part1.isAdjacent({ value: "35", x: 2, y: 2 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "633", x: 2, y: 6 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "617", x: 4, y: 0 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "58", x: 5, y: 7 }, symbols)).toBe(
      false
    );
    expect(Day03Part1.isAdjacent({ value: "592", x: 6, y: 2 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "755", x: 7, y: 6 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "664", x: 9, y: 1 }, symbols)).toBe(
      true
    );
    expect(Day03Part1.isAdjacent({ value: "598", x: 9, y: 5 }, symbols)).toBe(
      true
    );
  });

  it("Solve day 3 part 1 exemple", () => {
    expect(Day03Part1.solve(example.join("\r\n"))).toBe(4361);
  });

  it("Solve day 3 part 1 exemple", () => {
    const puzzle = fs.readFileSync(`${__dirname}/day-03-input.txt`).toString();
    expect(Day03Part1.solve(puzzle)).toBe(540131);
  });
});
