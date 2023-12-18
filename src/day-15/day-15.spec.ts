import { Day15 } from "./day-15";
import fs from "fs";

describe("Day 15", () => {
  const example = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
  it("Solve day 15 part 1 exemple", () => {
    expect(Day15.solve(example)).toBe(1320);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-15-input.txt`).toString();
  it("Solve day 15 part 1 puzzle", () => {
    expect(Day15.solve(puzzle)).toBe(517315);
  });
});
