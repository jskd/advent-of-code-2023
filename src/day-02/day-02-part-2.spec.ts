import { Day02Part2 } from "./day-02-part-2"

describe("Part 2", function() {
    it("get power of set", function() {
        expect(Day02Part2.getPowerOfSet("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toBe(48);
        expect(Day02Part2.getPowerOfSet("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue")).toBe(12);
        expect(Day02Part2.getPowerOfSet("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red")).toBe(1560);
        expect(Day02Part2.getPowerOfSet("Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",)).toBe(630);
        expect(Day02Part2.getPowerOfSet("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green")).toBe(36);
    });
});

