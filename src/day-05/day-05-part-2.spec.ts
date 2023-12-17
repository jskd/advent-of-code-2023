import { Day05Part2 } from "./day-05-part-2";
import fs from "fs";

describe("Day 5", function () {
  const example =
    "seeds: 79 14 55 13\r\n" +
    "seed-to-soil map:\r\n" +
    "50 98 2\r\n" +
    "52 50 48\r\n" +
    "soil-to-fertilizer map:\r\n" +
    "0 15 37\r\n" +
    "37 52 2\r\n" +
    "39 0 15\r\n" +
    "fertilizer-to-water map:\r\n" +
    "49 53 8\r\n" +
    "0 11 42\r\n" +
    "42 0 7\r\n" +
    "57 7 4\r\n" +
    "water-to-light map:\r\n" +
    "88 18 7\r\n" +
    "18 25 70\r\n" +
    "light-to-temperature map:\r\n" +
    "45 77 23\r\n" +
    "81 45 19\r\n" +
    "68 64 13\r\n" +
    "temperature-to-humidity map:\r\n" +
    "0 69 1\r\n" +
    "1 0 69\r\n" +
    "humidity-to-location map:\r\n" +
    "60 56 37\r\n" +
    "56 93 4";
  it("Solve day 5 part 2 exemple", () => {
    expect(Day05Part2.solve(example)).toBe(46);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-05-input.txt`).toString();
  it("Solve day 5 part 2 puzzle", () => {
    expect(Day05Part2.solve(puzzle)).toBe(50855035);
  });
});
