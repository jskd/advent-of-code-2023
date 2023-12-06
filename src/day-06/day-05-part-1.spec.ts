import { Day06Part1, Race } from "./day-06-part-1";
import fs from "fs";

describe("Day 6 part 1", function () {
  it("Evaluate one race", function () {
    expect(new Race(7, 9).numberWay).toBe(4);
    expect(new Race(15, 40).numberWay).toBe(8);
    expect(new Race(30, 200).numberWay).toBe(9);
  });

  it("Evaluate min hold", function () {
    expect(new Race(7, 9).searchHold("min")).toBe(2);
    expect(new Race(15, 40).searchHold("min")).toBe(4);
    expect(new Race(30, 200).searchHold("min")).toBe(11);
  });

  it("Evaluate max hold", function () {
    expect(new Race(7, 9).searchHold("max")).toBe(5);
    expect(new Race(15, 40).searchHold("max")).toBe(11);
    expect(new Race(30, 200).searchHold("max")).toBe(19);
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
