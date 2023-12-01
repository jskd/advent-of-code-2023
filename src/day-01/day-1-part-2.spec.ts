import { Day1Part2 } from "./day-1-part-2"

describe("Part 2", function() {
    it("Evaluate one line", function() {
        expect(Day1Part2.solve("two1nine")).toBe(29);
        expect(Day1Part2.solve("eightwothree")).toBe(83);
        expect(Day1Part2.solve("abcone2threexyz")).toBe(13);
        expect(Day1Part2.solve("xtwone3four")).toBe(24);
        expect(Day1Part2.solve("4nineeightseven2")).toBe(42);
        expect(Day1Part2.solve("zoneight234")).toBe(14);
        expect(Day1Part2.solve("7pqrstsixteen")).toBe(76);
    });

    it("Evaluate hard line", function() {
        expect(Day1Part2.solve("five61oneightr")).toBe(58);
    });

    it("Solve full example", function() {
        const example = "two1nine\r\n\
        eightwothree\r\n\
        abcone2threexyz\r\n\
        xtwone3four\r\n\
        4nineeightseven2\r\n\
        zoneight234\r\n\
        7pqrstsixteen";
        expect(Day1Part2.solve(example)).toBe(281);
    });
});

