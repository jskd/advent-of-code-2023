import fs from "fs";
import { Day01Part2 } from "./day-01-part-2";

describe("Day 1 part 2", function () {
  it("Get first digit value", function () {
    expect(Day01Part2.getFirstDigit("two1nine", "leftToRight")).toBe(2);
    expect(Day01Part2.getFirstDigit("eightwothree", "leftToRight")).toBe(8);
    expect(Day01Part2.getFirstDigit("abcone2threexyz", "leftToRight")).toBe(1);
    expect(Day01Part2.getFirstDigit("xtwone3four", "leftToRight")).toBe(2);
    expect(Day01Part2.getFirstDigit("4nineeightseven2", "leftToRight")).toBe(4);
    expect(Day01Part2.getFirstDigit("zoneight234", "leftToRight")).toBe(1);
    expect(Day01Part2.getFirstDigit("7pqrstsixteen", "leftToRight")).toBe(7);
    expect(Day01Part2.getFirstDigit("five61oneightr", "leftToRight")).toBe(5);
  });

  it("Get last digit value", function () {
    expect(Day01Part2.getFirstDigit("two1nine", "rightToLeft")).toBe(9);
    expect(Day01Part2.getFirstDigit("eightwothree", "rightToLeft")).toBe(3);
    expect(Day01Part2.getFirstDigit("abcone2threexyz", "rightToLeft")).toBe(3);
    expect(Day01Part2.getFirstDigit("xtwone3four", "rightToLeft")).toBe(4);
    expect(Day01Part2.getFirstDigit("4nineeightseven2", "rightToLeft")).toBe(2);
    expect(Day01Part2.getFirstDigit("zoneight234", "rightToLeft")).toBe(4);
    expect(Day01Part2.getFirstDigit("7pqrstsixteen", "rightToLeft")).toBe(6);
    expect(Day01Part2.getFirstDigit("five61oneightr", "rightToLeft")).toBe(8);
  });

  it("Evaluate simple line", function () {
    expect(Day01Part2.solve("two1nine")).toBe(29);
    expect(Day01Part2.solve("eightwothree")).toBe(83);
    expect(Day01Part2.solve("abcone2threexyz")).toBe(13);
    expect(Day01Part2.solve("xtwone3four")).toBe(24);
    expect(Day01Part2.solve("4nineeightseven2")).toBe(42);
    expect(Day01Part2.solve("zoneight234")).toBe(14);
    expect(Day01Part2.solve("7pqrstsixteen")).toBe(76);
  });

  it("Evaluate mixed literal line", function () {
    expect(Day01Part2.solve("five61oneightr")).toBe(58);
  });

  it("Solve full example", function () {
    const example =
      "two1nine\r\n" +
      "eightwothree\r\n" +
      "abcone2threexyz\r\n" +
      "xtwone3four\r\n" +
      "4nineeightseven2\r\n" +
      "zoneight234\r\n" +
      "7pqrstsixteen";
    expect(Day01Part2.solve(example)).toBe(281);
  });

  it("Solve day 1 part 2", function () {
    const content = fs.readFileSync(`${__dirname}/day-01-input.txt`);
    expect(Day01Part2.solve(content.toString())).toBe(55614);
  });
});
