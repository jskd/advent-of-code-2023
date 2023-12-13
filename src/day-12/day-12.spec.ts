import { evaluateArrangement } from "./day-12";

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
  });
});
