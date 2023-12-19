import { solveDay15Part1, solveDay15Part2 } from "./day-15";
import fs from "fs";

describe("Day 15", () => {
  const example = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
  it("Solve day 15 part 1 exemple", () => {
    expect(solveDay15Part1(example)).toBe(1320);
  });
  it("Solve day 15 part 2 exemple", () => {
    expect(solveDay15Part2(example)).toBe(145);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-15-input.txt`).toString();
  it("Solve day 15 part 1 puzzle", () => {
    expect(solveDay15Part1(puzzle)).toBe(517315);
  });
  it("Solve day 15 part 2 puzzle", () => {
    expect(solveDay15Part2(puzzle)).toBe(247763);
  });
});
