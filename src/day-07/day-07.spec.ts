import { Day7, Hand, Hands } from "./day-07";
import fs from "fs";

fdescribe("Day 7", function () {
  test.each([
    ["Q2TJK", 0x11],
    ["32T3K", 0x21],
    ["444J3", 0x31],
    ["J58JJ", 0x31],
    ["JKKJJ", 0x32],
  ])("Get %s strengh match", (input, expected) =>
    expect(Hand.getStrenghtMatch(Hand.mapCardStrength(input))).toBe(expected)
  );

  test.each([
    ["Q2TJK", 0xc2abd],
    ["32T3K", 0x32a3d],
    ["444J3", 0x444b3],
    ["J58JJ", 0xb58bb],
    ["JKKJJ", 0xbddbb],
  ])("Get %s strengh order", (input, expected) =>
    expect(Hand.getStrenghtOrder(Hand.mapCardStrength(input))).toBe(expected)
  );

  test.each([
    ["Q2TJK", 0x11c2abd],
    ["32T3K", 0x2132a3d],
    ["444J3", 0x31444b3],
    ["J58JJ", 0x31b58bb],
    ["JKKJJ", 0x32bddbb],
  ])("Get %s strengh without joker", (input, expected) =>
    expect(Hand.getStrengthHand(Hand.mapCardStrength(input), false)).toBe(
      expected
    )
  );

  it("Sort by strengh without joker", function () {
    const inputs = [
      new Hand("444J3", 365, false),
      new Hand("32T3K", 136, false),
      new Hand("Q2TJK", 488, false),
      new Hand("JKKJJ", 66, false),
      new Hand("J58JJ", 650, false),
    ];
    const hands = new Hands(...inputs);
    expect(hands.sortByStrength().map(({ cards }) => cards)).toStrictEqual([
      "Q2TJK",
      "32T3K",
      "444J3",
      "J58JJ",
      "JKKJJ",
    ]);
  });

  it("Get total bid without joker", function () {
    const inputs = [
      new Hand("444J3", 365, false),
      new Hand("32T3K", 136, false),
      new Hand("Q2TJK", 488, false),
      new Hand("JKKJJ", 66, false),
      new Hand("J58JJ", 650, false),
    ];
    const hands = new Hands(...inputs);
    expect(hands.getTotalBid()).toBe(4785);
  });

  test.each([
    ["Q2TJK", "Q2T2K"],
    ["32T3K", "32T3K"],
    ["444J3", "44443"],
    ["J58JJ", "55855"],
    ["JKKJJ", "KKKKK"],
  ])("Map %s jokers as wildcard", (input, expected) =>
    expect(Hand.mapJokerAsWildcard(Hand.mapCardStrength(input))).toStrictEqual(
      Hand.mapCardStrength(expected)
    )
  );

  test.each([
    ["Q2TJK", "Q2TWK"],
    ["32T3K", "32T3K"],
    ["KK677", "KK677"],
    ["AJTKT", "AWTKT"],
    ["444J3", "444W3"],
    ["J58JJ", "W58WW"],
  ])("Map %s jokers as weakest", (input, expected) =>
    expect(Hand.mapJokerAsWeakest(Hand.mapCardStrength(input))).toStrictEqual(
      Hand.mapCardStrength(expected)
    )
  );

  test.each([
    ["Q2TJK", 0x21c2a1d],
    ["444J3", 0x4144413],
    ["J58JJ", 0x4115811],
    ["JKKJJ", 0x501dd11],
  ])("Get %s strengh with joker", (input, expected) =>
    expect(Hand.getStrengthHand(Hand.mapCardStrength(input), true)).toBe(
      expected
    )
  );

  it("Sort by strengh with joker", function () {
    const inputs = [
      new Hand("444J3", 365, true),
      new Hand("32T3K", 136, true),
      new Hand("Q2TJK", 488, true),
      new Hand("JKKJJ", 66, true),
      new Hand("J58JJ", 650, true),
    ];
    const hands = new Hands(...inputs);
    expect(hands.sortByStrength().map(({ cards }) => cards)).toStrictEqual([
      "32T3K",
      "Q2TJK",
      "J58JJ",
      "444J3",
      "JKKJJ",
    ]);
  });

  it("Get total bid without joker", function () {
    const inputs = [
      new Hand("444J3", 365, true),
      new Hand("32T3K", 136, true),
      new Hand("Q2TJK", 488, true),
      new Hand("JKKJJ", 66, true),
      new Hand("J58JJ", 650, true),
    ];
    const hands = new Hands(...inputs);
    expect(hands.getTotalBid()).toBe(4852);
  });

  // prettier-ignore
  const example = "32T3K 765\r\n" + 
                    "T55J5 684\r\n" + 
                    "KK677 28\r\n" + 
                    "KTJJT 220\r\n" + 
                    "QQQJA 483";
  it("Solve Day 7 part 1 example", function () {
    expect(Day7.solve(example, false)).toBe(6440);
  });
  it("Solve Day 7 part 2 example", function () {
    expect(Day7.solve(example, true)).toBe(5905);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-07-input.txt`);
  it("Solve Day 7 part 1 puzzle", function () {
    expect(Day7.solve(puzzle.toString(), false)).toBe(253638586);
  });
  it("Solve Day 7 part 2 puzzle", function () {
    expect(Day7.solve(puzzle.toString(), true)).toBe(253253225);
  });
});
