import { solveDay22 } from "./day-22";
import fs from "fs";

describe("Day 22", () => {
  const example =
    "1,0,1~1,2,1\r\n" +
    "0,0,2~2,0,2\r\n" +
    "0,2,3~2,2,3\r\n" +
    "0,0,4~0,2,4\r\n" +
    "2,0,5~2,2,5\r\n" +
    "0,1,6~2,1,6\r\n" +
    "1,1,8~1,1,9";
  it("Solve day 19 part 1 exemple", () => {
    expect(solveDay22(example)).toBe(5);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-22-input.txt`).toString();
  it("Solve day 19 part 1 puzzle", () => {
    expect(solveDay22(puzzle)).toBe(-1);
  });
});
