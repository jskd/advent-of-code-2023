import { Day11 } from "./day-11-part-1";
import fs from "fs";

describe("Day 10", function () {
  it("Solve day 11 part 1 exemple 1", function () {});

  const puzzle = fs.readFileSync(`${__dirname}/day-11-input.txt`);
  it("Solve day 11 part 1 puzzle", function () {
    expect(Day11.solve(puzzle.toString())).toBe(10490062);
  });
});
