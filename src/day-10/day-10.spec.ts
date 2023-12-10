import { Day10 } from "./day-10";
import fs from "fs";

describe("Day 10", function () {
  it("Solve Day 8 part 1 exemple 1", function () {
    // prettier-ignore
    const example =
      ".....\r\n" + 
      ".S-7.\r\n" + 
      ".|.|.\r\n" + 
      ".L-J.\r\n" + 
      ".....";
    expect(Day10.solve(example)).toBe(4);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-10-input.txt`);
  it("Solve Day 10 part 1 puzzle", function () {
    expect(Day10.solve(puzzle.toString())).toBe(6923);
  });
});
