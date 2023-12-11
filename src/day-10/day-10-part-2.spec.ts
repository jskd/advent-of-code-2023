import { Day10Part2 } from "./day-10-part-2";
import fs from "fs";

describe("Day 10", function () {
  it("Solve day 10 part 2 exemple 1", function () {
    const example =
      "...........\r\n" +
      ".S-------7.\r\n" +
      ".|F-----7|.\r\n" +
      ".||.....||.\r\n" +
      ".||.....||.\r\n" +
      ".|L-7.F-J|.\r\n" +
      ".|..|.|..|.\r\n" +
      ".L--J.L--J.\r\n" +
      "...........";
    expect(Day10Part2.solve(example)).toBe(4);
  });

  it("Solve day 10 part 2 exemple 2", function () {
    const example =
      ".F----7F7F7F7F-7....\r\n" +
      ".|F--7||||||||FJ....\r\n" +
      ".||.FJ||||||||L7....\r\n" +
      "FJL7L7LJLJ||LJ.L-7..\r\n" +
      "L--J.L7...LJS7F-7L7.\r\n" +
      "....F-J..F7FJ|L7L7L7\r\n" +
      "....L7.F7||L7|.L7L7|\r\n" +
      ".....|FJLJ|FJ|F7|.LJ\r\n" +
      "....FJL-7.||.||||...\r\n" +
      "....L---J.LJ.LJLJ...";
    expect(Day10Part2.solve(example)).toBe(8);
  });

  it("Solve day 10 part 2 exemple 2", function () {
    const example =
      "FF7FSF7F7F7F7F7F---7\r\n" +
      "L|LJ||||||||||||F--J\r\n" +
      "FL-7LJLJ||||||LJL-77\r\n" +
      "F--JF--7||LJLJ7F7FJ-\r\n" +
      "L---JF-JLJ.||-FJLJJ7\r\n" +
      "|F|F-JF---7F7-L7L|7|\r\n" +
      "|FFJF7L7F-JF7|JL---7\r\n" +
      "7-L-JL7||F7|L7F-7F7|\r\n" +
      "L.L7LFJ|||||FJL7||LJ\r\n" +
      "L7JLJL-JLJLJL--JLJ.L";
    expect(Day10Part2.solve(example)).toBe(10);
  });

  it("Solve day 10 part 2 puzzle", function () {
    const puzzle = fs.readFileSync(`${__dirname}/day-10-input.txt`);
    expect(Day10Part2.solve(puzzle.toString())).toBe(529);
  });
});
