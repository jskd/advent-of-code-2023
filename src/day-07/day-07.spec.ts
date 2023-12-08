import { Card, Day7, Hand } from "./day-07";
import fs from "fs";

fdescribe("Day 7", function () {
  it("Get strengh match", function () {
    expect(Hand.getStrenghtMatch([1, 1, 1, 1, 1])).toBe(6);
    expect(Hand.getStrenghtMatch([1, 1, 1, 1, 2])).toBe(5);
    expect(Hand.getStrenghtMatch([1, 1, 1, 2, 2])).toBe(4);
    expect(Hand.getStrenghtMatch([1, 1, 1, 2, 3])).toBe(3);
    expect(Hand.getStrenghtMatch([1, 1, 2, 2, 3])).toBe(2);
    expect(Hand.getStrenghtMatch([1, 1, 2, 3, 4])).toBe(1);
    expect(Hand.getStrenghtMatch([1, 2, 3, 4, 5])).toBe(0);
  });

  it("Get strengh order", function () {
    expect(Hand.getStrenghtOrder([1, 4, 1, 9, 9])).toBe(0x14199);
    expect(Hand.getStrenghtOrder([4, 7, 4, 1, 3])).toBe(0x47413);
  });

  it("Get strengh hand", function () {
    expect(Hand.getStrengthHand([1, 1, 1, 1, 1], false)).toBe(0x611111);
    expect(Hand.getStrengthHand([1, 1, 1, 1, 2], false)).toBe(0x511112);
    expect(Hand.getStrengthHand([1, 1, 1, 2, 2], false)).toBe(0x411122);
    expect(Hand.getStrengthHand([1, 1, 1, 2, 3], false)).toBe(0x311123);
    expect(Hand.getStrengthHand([1, 1, 2, 2, 3], false)).toBe(0x211223);
    expect(Hand.getStrengthHand([1, 1, 2, 3, 4], false)).toBe(0x111234);
    expect(Hand.getStrengthHand([1, 2, 3, 4, 5], false)).toBe(0x012345);
  });

  it("Map joker as wildcard", function () {
    const J = Card.J;
    const hand1 = [2, 2, 9, J, 9];
    const hand2 = [J, 7, 9, 9, 9];
    expect(Hand.mapJokerAsWildcard(hand1)).toStrictEqual([2, 2, 9, 2, 9]);
    expect(Hand.mapJokerAsWildcard(hand2)).toStrictEqual([9, 7, 9, 9, 9]);
  });

  it("Map joker as weakest", function () {
    const J = Card.J;
    const W = Card.W;
    const hand1 = [J, 2, 9, J, 9];
    const hand2 = [J, 2, J, 9, 9];
    expect(Hand.mapJokerAsWeakest(hand1)).toStrictEqual([W, 2, 9, W, 9]);
    expect(Hand.mapJokerAsWeakest(hand2)).toStrictEqual([W, 2, W, 9, 9]);
  });

  it("Solve Day 7 part 1 example ", function () {
    // prettier-ignore
    const example = "32T3K 765\r\n" + 
                    "T55J5 684\r\n" + 
                    "KK677 28\r\n" + 
                    "KTJJT 220\r\n" + 
                    "QQQJA 483";
    expect(Day7.solve(example, false)).toBe(6440);
  });

  it("Solve Day 7 part 2 example ", function () {
    // prettier-ignore
    const example = "32T3K 765\r\n" + 
                    "T55J5 684\r\n" + 
                    "KK677 28\r\n" + 
                    "KTJJT 220\r\n" + 
                    "QQQJA 483";
    expect(Day7.solve(example, true)).toBe(5905);
  });

  it("Solve Day 7 part 1 puzzle", function () {
    const content = fs.readFileSync(`${__dirname}/day-07-input.txt`);
    expect(Day7.solve(content.toString(), false)).toBe(253638586);
  });

  it("Solve Day 7 part 2 puzzle", function () {
    const content = fs.readFileSync(`${__dirname}/day-07-input.txt`);
    expect(Day7.solve(content.toString(), true)).toBe(253253225);
  });
});
