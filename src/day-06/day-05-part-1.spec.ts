import { Day06Part1, Race } from "./day-06-part-1";
import fs from "fs";

describe("Day 6 part 1", function () {
  it("Evaluate one race", function () {
    expect(new Race(7, 9).numberWay).toBe(4);
    expect(new Race(15, 40).numberWay).toBe(8);
    expect(new Race(30, 200).numberWay).toBe(9);
  });

  it("Solve full example", function () {
    // prettier-ignore
    const example = "Time:      7  15   30 \r\n" + 
                    "Distance:  9  40  200";
    expect(Day06Part1.solve(example)).toBe(288);
  });

  it("Solve day 6 part 1", function () {
    const content = fs.readFileSync(`${__dirname}/day-06-input.txt`);
    expect(Day06Part1.solve(content.toString())).toBe(140220);
  });
});
