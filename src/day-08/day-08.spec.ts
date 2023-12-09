import { Day8Part1, Day8Part2, Node } from "./day-08";
import fs from "fs";

describe("Day 8", function () {
  it("Parse node", function () {
    const node = new Node("AAA = (BBB, CCC)");
    expect(node.left).toBe("BBB");
    expect(node.right).toBe("CCC");
    expect(node.value).toBe("AAA");
  });

  it("Solve Day 8 part 1 exemple 1", function () {
    const example =
      "RL\r\n" +
      "AAA = (BBB, CCC)\r\n" +
      "BBB = (DDD, EEE)\r\n" +
      "CCC = (ZZZ, GGG)\r\n" +
      "DDD = (DDD, DDD)\r\n" +
      "EEE = (EEE, EEE)\r\n" +
      "GGG = (GGG, GGG)\r\n" +
      "ZZZ = (ZZZ, ZZZ)\r\n";
    expect(Day8Part1.solve(example)).toBe(2);
  });

  it("Solve Day 8 part 1 exemple 2", function () {
    const example =
      "LLR\r\n" +
      "AAA = (BBB, BBB)\r\n" +
      "BBB = (AAA, ZZZ)\r\n" +
      "ZZZ = (ZZZ, ZZZ)\r\n";
    expect(Day8Part1.solve(example)).toBe(6);
  });

  it("Solve Day 8 part 2 exemple 1", function () {
    const example =
      "LR\r\n" +
      "11A = (11B, XXX)\r\n" +
      "11B = (XXX, 11Z)\r\n" +
      "11Z = (11B, XXX)\r\n" +
      "22A = (22B, XXX)\r\n" +
      "22B = (22C, 22C)\r\n" +
      "22C = (22Z, 22Z)\r\n" +
      "22Z = (22B, 22B)\r\n" +
      "XXX = (XXX, XXX)\r\n";
    expect(Day8Part2.solve(example)).toBe(6);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-08-input.txt`);
  it("Solve Day 8 part 1 puzzle", function () {
    expect(Day8Part1.solve(puzzle.toString())).toBe(18827);
  });

  it("Solve Day 8 part 2 puzzle", function () {
    expect(Day8Part2.solve(puzzle.toString())).toBe(20220305520997);
  });
});
