import { Day12, evaluate } from "./day-12";
import fs from "fs";

describe("Day 12", () => {
  it("Evaluate possibilities", () => {
    expect(evaluate("????????", [5])).toBe(4);
    expect(evaluate("????????", [3])).toBe(6);
    expect(evaluate("????????", [9])).toBe(0);
    expect(evaluate("???????#", [5])).toBe(1);
    expect(evaluate("????#??#", [5])).toBe(1);
    expect(evaluate("????##?#", [5])).toBe(1);
    expect(evaluate("#???????", [5])).toBe(1);
    expect(evaluate("#??#????", [5])).toBe(1);
    expect(evaluate("##?#????", [5])).toBe(1);
    expect(evaluate("???#????", [5])).toBe(4);
    expect(evaluate("???#??#?", [5])).toBe(2);
    expect(evaluate("??##?#??", [5])).toBe(2);
    expect(evaluate("??##?#??", [4])).toBe(1);
    expect(evaluate("??##?#??", [5])).toBe(2);
    expect(evaluate("??##?#??", [6])).toBe(3);
    expect(evaluate("??####??", [3])).toBe(0);
    expect(evaluate("########", [8])).toBe(1);
    expect(evaluate("###.####", [8])).toBe(0);
    expect(evaluate("???.????", [3])).toBe(3);
    expect(evaluate("??#.????", [3])).toBe(1);
    expect(evaluate("??#.??#?", [3])).toBe(0);
    expect(evaluate("?#?.??.?", [2])).toBe(2);
    expect(evaluate("?#?.??.?", [3])).toBe(1);
    expect(evaluate("??...?.?", [1])).toBe(4);
    expect(evaluate("?#?#?#", [1, 3])).toBe(1);
    expect(evaluate("?#?#?#", [3, 1])).toBe(1);
    expect(evaluate("?#?#?#?#", [1, 3, 1])).toBe(1);
    expect(evaluate("?#?#?#?#?", [1, 3, 1])).toBe(1);
    expect(evaluate("?#?#?#?#?#?#?#?", [1, 3, 1, 6])).toBe(1);
    expect(evaluate("?###????", [3, 2, 1])).toBe(0);
    expect(evaluate("?###?????", [3, 2, 1])).toBe(1);
    expect(evaluate("?###??????", [3, 2, 1])).toBe(3);
    expect(evaluate("?###????????", [3, 2, 1])).toBe(10);
  });

  const example =
    "???.### 1,1,3\r\n" +
    ".??..??...?##. 1,1,3\r\n" +
    "?#?#?#?#?#?#?#? 1,3,1,6\r\n" +
    "????.#...#... 4,1,1\r\n" +
    "????.######..#####. 1,6,5\r\n" +
    "?###???????? 3,2,1";
  it("Solve day 12 part 1 exemple", () => {
    expect(Day12.solve(example)).toBe(21);
  });
  it("Solve day 12 part 2 exemple", () => {
    expect(Day12.solve(example, true)).toBe(525152);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-12-input.txt`).toString();
  it("Solve day 12 part 1 puzzle", () => {
    expect(Day12.solve(puzzle)).toBe(7110);
  });
  it("Solve day 12 part 2 puzzle", () => {
    expect(Day12.solve(puzzle, true)).toBe(1566786613613);
  });
});
