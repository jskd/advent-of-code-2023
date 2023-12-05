import { Day03Part2, GearPos } from "./day-03-part-2";
import fs from "fs";

describe("Day 3 part 2", function () {
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
  const numbers = [
    { value: "467", x: 0, y: 0 },
    { value: "114", x: 0, y: 5 },
    { value: "35", x: 2, y: 2 },
    { value: "633", x: 2, y: 6 },
    { value: "617", x: 4, y: 0 },
    { value: "58", x: 5, y: 7 },
    { value: "592", x: 6, y: 2 },
    { value: "755", x: 7, y: 6 },
    { value: "664", x: 9, y: 1 },
    { value: "598", x: 9, y: 5 },
  ];

  const gear1 = new GearPos(1, 3);
  const gear2 = new GearPos(4, 3);
  const gear3 = new GearPos(8, 5);
  const gears = [[], [gear1], [], [], [gear2], [], [], [], [gear3], []];

  const associatedGear1 = new GearPos(1, 3, [
    +numbers[0].value,
    +numbers[2].value,
  ]);
  const associatedGear2 = new GearPos(4, 3, [+numbers[4].value]);
  const associatedGear3 = new GearPos(8, 5, [
    +numbers[7].value,
    +numbers[9].value,
  ]);
  const associatedGears = [
    [],
    [associatedGear1],
    [],
    [],
    [associatedGear2],
    [],
    [],
    [],
    [associatedGear3],
    [],
  ];

  it("Find gear position", function () {
    expect(Day03Part2.findGearPosition(example)).toStrictEqual(gears);
  });

  it("Associate number adjacent to gear", function () {
    numbers.forEach((pos) => Day03Part2.associateGearAdjacent(pos, gears));
    expect(gears).toStrictEqual(associatedGears);
  });

  it("Calculate gear ratio", function () {
    expect(associatedGear1.getRatio()).toBe(16345);
    expect(associatedGear2.getRatio()).toBe(0);
    expect(associatedGear3.getRatio()).toBe(451490);
  });

  it("Calculate sum of gear ratio", function () {
    expect(Day03Part2.getSumGearRatio(associatedGears)).toBe(467835);
  });

  it("Solve example", function () {
    expect(Day03Part2.solve(example.join("\r\n"))).toBe(467835);
  });

  it("Solve day 3 part 2", function () {
    const content = fs.readFileSync(`${__dirname}/day-03-input.txt`);
    expect(Day03Part2.solve(content.toString())).toBe(86879020);
  });
});
