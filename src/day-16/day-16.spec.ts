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
    expect(Day16.solve(example, "1")).toBe(46);
  });

  it("Solve day 10 part 2 exemple 2", function () {
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
    expect(Day16.solve(example, "2")).toBe(51);
  });

  const content = fs.readFileSync(`${__dirname}/day-16-input.txt`).toString();
  it("Solve day 12 part 1", function () {
    expect(Day16.solve(content, "1")).toBe(8249);
  });

  it("Solve day 12 part 2", function () {
    expect(Day16.solve(content, "2")).toBe(8444);
  });
});
