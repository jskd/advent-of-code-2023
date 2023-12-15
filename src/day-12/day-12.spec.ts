import { Day12, evaluate } from "./day-12";
import fs from "fs";

describe("Day 12", function () {
  it("Evaluate arrangement", function () {
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

  const content = fs.readFileSync(`${__dirname}/day-12-input.txt`).toString();
  it("Solve day 12 part 1", function () {
    expect(Day12.solve(content)).toBe(7110);
  });

  it("Solve day 12 part 2", function () {
    expect(Day12.solve(content, true)).toBe(1566786613613);
  });
});
