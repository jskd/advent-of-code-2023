import { Day02Part1 } from "./day-02-part-1";
import fs from "fs";

describe("Day 2 part 1", function () {
  it("Check game is playable", function () {
    expect(
      Day02Part1.isPlayable(
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      ),
    ).toBe(true);
    expect(
      Day02Part1.isPlayable(
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      ),
    ).toBe(true);
    expect(
      Day02Part1.isPlayable(
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      ),
    ).toBe(false);
    expect(
      Day02Part1.isPlayable(
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      ),
    ).toBe(false);
    expect(
      Day02Part1.isPlayable(
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      ),
    ).toBe(true);
  });

  it("Sum of number of playable game", function () {
    const input =
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\r\n" +
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\r\n" +
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\r\n" +
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\r\n" +
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
    expect(Day02Part1.solve(input)).toBe(8);
  });

  it("Solve day 2 part 1", function () {
    const content = fs.readFileSync(`${__dirname}/day-02-input.txt`);
    expect(Day02Part1.solve(content.toString())).toBe(2879);
  });
});
