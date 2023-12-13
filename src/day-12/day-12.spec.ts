import { Day12, evaluate, evaluateArrangement } from "./day-12";
import fs from "fs";

describe("Day 12", function () {
  it("Evaluate arrangement", function () {
    expect(evaluateArrangement("????????", 5)).toBe(4);
    expect(evaluateArrangement("????????", 3)).toBe(6);
    expect(evaluateArrangement("????????", 9)).toBe(0);
    expect(evaluateArrangement("???????#", 5)).toBe(1);
    expect(evaluateArrangement("????#??#", 5)).toBe(1);
    expect(evaluateArrangement("????##?#", 5)).toBe(1);
    expect(evaluateArrangement("#???????", 5)).toBe(1);
    expect(evaluateArrangement("#??#????", 5)).toBe(1);
    expect(evaluateArrangement("##?#????", 5)).toBe(1);
    expect(evaluateArrangement("???#????", 5)).toBe(4);
    expect(evaluateArrangement("???#??#?", 5)).toBe(2);
    expect(evaluateArrangement("??##?#??", 5)).toBe(2);
    expect(evaluateArrangement("??##?#??", 4)).toBe(1);
    expect(evaluateArrangement("??##?#??", 5)).toBe(2);
    expect(evaluateArrangement("??##?#??", 6)).toBe(3);
    expect(evaluateArrangement("??####??", 3)).toBe(0);
    expect(evaluateArrangement("########", 8)).toBe(1);

    expect(evaluateArrangement("###.####", 8)).toBe(0);
    expect(evaluateArrangement("???.????", 3)).toBe(3);
    expect(evaluateArrangement("??#.????", 3)).toBe(1);
    expect(evaluateArrangement("??#.??#?", 3)).toBe(0);
    expect(evaluateArrangement("?#?.??.?", 2)).toBe(2);
    expect(evaluateArrangement("?#?.??.?", 3)).toBe(1);
    expect(evaluateArrangement("??...?.?", 1)).toBe(4);
  });

  it("Evaluate arrangement", function () {
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

  /*it("Solve day 2 part 2", function () {
    const content = fs.readFileSync(`${__dirname}/day-12-input.txt`);
    expect(Day12.solve(content.toString())).toBe(65122);
  });*/
});
