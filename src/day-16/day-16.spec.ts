import { Day16 } from "./day-16";
import fs from "fs";

describe("Day 12", function () {
  it("Solve day 10 part 2 exemple 1", function () {
    const example =
      ".|...\\....\r\n" +
      "|.-.\\.....\r\n" +
      ".....|-...\r\n" +
      "........|.\r\n" +
      "..........\r\n" +
      ".........\\\r\n" +
      "..../.\\\\..\r\n" +
      ".-.-/..|..\r\n" +
      ".|....-|.\\\r\n" +
      "..//.|....";
    expect(Day16.solve(example)).toBe(46);
  });

  const content = fs.readFileSync(`${__dirname}/day-16-input.txt`).toString();
  it("Solve day 12 part 1", function () {
    expect(Day16.solve(content)).toBe(8249);
  });
});
