import fs from "fs";
import { Day9Part1, Day9Part2, History } from "./day-09";

describe("Day 9", () => {
  test.each([
    [
      [0, 3, 6, 9, 12, 15],
      [3, 3, 3, 3, 3],
    ],
    [
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ],
    [
      [1, 3, 6, 10, 15, 21],
      [2, 3, 4, 5, 6],
    ],
    [
      [2, 3, 4, 5, 6],
      [1, 1, 1, 1],
    ],
    [
      [1, 1, 1, 1],
      [0, 0, 0],
    ],
  ])("Day 9 Evaluate difference of %j", (input, expected) =>
    expect(History.getDifference(input)).toStrictEqual(expected)
  );

  test.each([
    [
      [
        [0, 3, 6, 9, 12, 15],
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ],
      [
        [0, 3, 6, 9, 12, 15, 18],
        [3, 3, 3, 3, 3, 3],
        [0, 0, 0, 0, 0],
      ],
    ],
    [
      [
        [1, 3, 6, 10, 15, 21],
        [2, 3, 4, 5, 6],
        [1, 1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 3, 6, 10, 15, 21, 28],
        [2, 3, 4, 5, 6, 7],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
    ],
  ])("Day 9 Extrapolate of %j", (input, expected) =>
    expect(History.extrapolate(input)).toStrictEqual(expected)
  );

  test.each([
    [[0, 3, 6, 9, 12, 15], 18],
    [[1, 3, 6, 10, 15, 21], 28],
    [[10, 13, 16, 21, 30, 45], 68],
  ])("Day 9 Extrapolate of %j", (input, expected) =>
    expect(History.nextValue(input)).toStrictEqual(expected)
  );

  it("Solve Day 9 part 1 exemple", () => {
    const example = [
      [0, 3, 6, 9, 12, 15],
      [1, 3, 6, 10, 15, 21],
      [10, 13, 16, 21, 30, 45],
    ];
    expect(History.sumOfNextValues(example)).toBe(114);
  });
  it("Solve Day 9 part 2 exemple", () => {
    const example = [[10, 13, 16, 21, 30, 45].reverse()];
    expect(History.sumOfNextValues(example)).toBe(5);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-09-input.txt`);
  it("Solve Day 9 part 1 puzzle", () => {
    expect(Day9Part1.solve(puzzle.toString())).toBe(1581679977);
  });
  it("Solve Day 9 part 2 puzzle", () => {
    expect(Day9Part2.solve(puzzle.toString())).toBe(889);
  });
});
