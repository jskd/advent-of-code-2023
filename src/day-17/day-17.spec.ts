import { Day16 as Day17 } from "./day-17";
import fs from "fs";

describe("Day 17", () => {
  const example =
    "2413432311323\r\n" +
    "3215453535623\r\n" +
    "3255245654254\r\n" +
    "3446585845452\r\n" +
    "4546657867536\r\n" +
    "1438598798454\r\n" +
    "4457876987766\r\n" +
    "3637877979653\r\n" +
    "4654967986887\r\n" +
    "4564679986453\r\n" +
    "1224686865563\r\n" +
    "2546548887735\r\n" +
    "4322674655533";
  it("Solve day 17 part 1 exemple", () => {
    expect(Day17.solve(example)).toBe(102);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-17-input.txt`).toString();
  it("Solve day 17 part 1 puzzle", () => {
    expect(Day17.solve(puzzle)).toBe(817);
  });
});
