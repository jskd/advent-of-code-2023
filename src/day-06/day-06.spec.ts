import { Day06Part1, Day06Part2, Race } from "./day-06";
import fs from "fs";

describe("Day 6", function () {
  it("Evaluate min hold", function () {
    expect(new Race(7, 9).searchHold("min")).toBe(2);
    expect(new Race(15, 40).searchHold("min")).toBe(4);
    expect(new Race(30, 200).searchHold("min")).toBe(11);
    expect(new Race(71530, 940200).searchHold("min")).toBe(14);
  });

  it("Evaluate max hold", function () {
    expect(new Race(7, 9).searchHold("max")).toBe(5);
    expect(new Race(15, 40).searchHold("max")).toBe(11);
    expect(new Race(30, 200).searchHold("max")).toBe(19);
    expect(new Race(71530, 940200).searchHold("max")).toBe(71516);
  });

  it("Evaluate way", function () {
    expect(new Race(7, 9).way).toBe(4);
    expect(new Race(15, 40).way).toBe(8);
    expect(new Race(30, 200).way).toBe(9);
    expect(new Race(71530, 940200).way).toBe(71503);
  });

  it("Solve part 1 example ", function () {
    // prettier-ignore
    const example = "Time:      7  15   30 \r\n" + 
                    "Distance:  9  40  200";
    expect(Day06Part1.solve(example)).toBe(288);
  });

  it("Solve day 6 part 1 puzzle", function () {
    const content = fs.readFileSync(`${__dirname}/day-06-input.txt`);
    expect(Day06Part1.solve(content.toString())).toBe(140220);
  });

  it("Solve day 6 part 2 example ", function () {
    // prettier-ignore
    const example = "Time:      7  15   30 \r\n" + 
                    "Distance:  9  40  200";
    expect(Day06Part2.solve(example)).toBe(71503);
  });

  it("Solve day 6 part 2 puzzle", function () {
    const content = fs.readFileSync(`${__dirname}/day-06-input.txt`);
    expect(Day06Part2.solve(content.toString())).toBe(39570185);
  });
});
