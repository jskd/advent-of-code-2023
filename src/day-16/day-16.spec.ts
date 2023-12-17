import { Day16 } from "./day-16";
import fs from "fs";

describe("Day 16", () => {
  const example =
    ".|...\\....\r\n" +
    "|.-.\\.....\r\n" +
    ".....|-...\r\n" +
    "........|.\r\n" +
    "..........\r\n" +
    ".........\\\r\n" +
    "..../.\\\\..\r\n" +
    ".-.-/..|..\r\n" +
    ".|....-|.\\\r\n" +
    "..//.|....";
  it("Solve day 16 part 1 exemple", () => {
    expect(Day16.solve(example, "1")).toBe(46);
  });
  it("Solve day 16 part 2 exemple", () => {
    expect(Day16.solve(example, "2")).toBe(51);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-16-input.txt`).toString();
  it("Solve day 16 part 1 puzzle", () => {
    expect(Day16.solve(puzzle, "1")).toBe(8249);
  });
  it("Solve day 16 part 2 puzzle", () => {
    expect(Day16.solve(puzzle, "2")).toBe(8444);
  });
});
