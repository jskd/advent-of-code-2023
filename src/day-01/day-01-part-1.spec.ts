import fs from "fs";
import { Day01Part1 } from "./day-01-part-1";

describe("Day 1 part 1", () => {
  it("Evaluate one line", () => {
    expect(Day01Part1.evaluateLine("1abc2")).toBe(12);
    expect(Day01Part1.evaluateLine("pqr3stu8vwx")).toBe(38);
    expect(Day01Part1.evaluateLine("a1b2c3d4e5f")).toBe(15);
    expect(Day01Part1.evaluateLine("treb7uchet")).toBe(77);
  });

  it("Solve day 1 part 1 exemple", () => {
    // prettier-ignore
    const example =
      "1abc2\r\n" + 
      "pqr3stu8vwx\r\n" +
      "a1b2c3d4e5f\r\n" + 
      "treb7uchet";
    expect(Day01Part1.solve(example)).toBe(142);
  });

  it("Solve day 1 part 1", () => {
    const content = fs.readFileSync(`${__dirname}/day-01-input.txt`);
    expect(Day01Part1.solve(content.toString())).toBe(55488);
  });
});
