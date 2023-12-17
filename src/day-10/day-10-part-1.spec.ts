import { Day10 } from "./day-10-part-1";
import fs from "fs";

describe("Day 10", () => {
  it("Solve day 10 part 1 exemple", () => {
    // prettier-ignore
    const example =
      ".....\r\n" + 
      ".S-7.\r\n" + 
      ".|.|.\r\n" + 
      ".L-J.\r\n" + 
      ".....";
    expect(Day10.solve(example)).toBe(4);
  });

  it("Solve day 10 part 1 puzzle", () => {
    const puzzle = fs.readFileSync(`${__dirname}/day-10-input.txt`);
    expect(Day10.solve(puzzle.toString())).toBe(6923);
  });
});
