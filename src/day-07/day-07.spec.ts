import { Day7, Hand } from "./day-07";
import fs from "fs";
fdescribe("Day 7", function () {
  it("Evaluate matching score", function () {
    expect(Hand.getScoreMatching([1, 1, 1, 1, 1])).toBe(6);
    expect(Hand.getScoreMatching([1, 1, 1, 1, 2])).toBe(5);
    expect(Hand.getScoreMatching([1, 1, 1, 2, 2])).toBe(4);
    expect(Hand.getScoreMatching([1, 1, 1, 2, 3])).toBe(3);
    expect(Hand.getScoreMatching([1, 1, 2, 2, 3])).toBe(2);
    expect(Hand.getScoreMatching([1, 1, 2, 3, 4])).toBe(1);
    expect(Hand.getScoreMatching([1, 2, 3, 4, 5])).toBe(0);
  });

  it("Solve Day 7 part 1 example ", function () {
    // prettier-ignore
    const example = "32T3K 765\r\n" + 
                    "T55J5 684\r\n" + 
                    "KK677 28\r\n" + 
                    "KTJJT 220\r\n" + 
                    "QQQJA 483";
    expect(Day7.solve(example)).toBe(6440);
  });

  it("Solve Day 7 part 1 puzzle", function () {
    const content = fs.readFileSync(`${__dirname}/day-07-input.txt`);
    expect(Day7.solve(content.toString())).toBe(253638586);
  });
});
