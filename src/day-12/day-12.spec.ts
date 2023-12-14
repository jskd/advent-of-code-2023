import { Day12, Day12Part2, Sequence, evaluate } from "./day-12";
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

  it("Solve day 2 part 1", function () {
    expect(new Sequence(".#", [1]).unfold()).toEqual({
      groups: [1, 1, 1, 1, 1],
      line: ".#?.#?.#?.#?.#",
    });
  });

  it("Evaluate arrangement", function () {
    let sequence = new Sequence(".??..??...?##.", [1, 1, 3]).unfold();
    expect(evaluate(sequence.line, sequence.groups)).toBe(16384);
    sequence = new Sequence("????.######..#####.", [1, 6, 5]).unfold();
    expect(evaluate(sequence.line, sequence.groups)).toBe(2500);
    sequence = new Sequence("?###????????", [3, 2, 1]).unfold();
    expect(evaluate(sequence.line, sequence.groups)).toBe(506250);
  });

  it("Solve day 2 part 1", function () {
    const content = fs.readFileSync(`${__dirname}/day-12-input.txt`);
    expect(Day12.solve(content.toString())).toBe(7110);
  });

  it("Solve day 2 part 2", function () {
    const content = fs.readFileSync(`${__dirname}/day-12-input.txt`);
    expect(Day12Part2.solve(content.toString())).toBe(7110);
  });
});
