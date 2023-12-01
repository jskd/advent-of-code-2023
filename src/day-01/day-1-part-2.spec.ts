import { Day1Part2 } from "./day-1-part-2"

describe("Part 2", function() {

    it("Replace first literal by digit", function() {
        expect(Day1Part2.replaceFirstLiteralByDigit("two1nine")).toBe("21nine");
        expect(Day1Part2.replaceFirstLiteralByDigit("eightwothree")).toBe("8wothree");
        expect(Day1Part2.replaceFirstLiteralByDigit("abcone2threexyz")).toBe("abc12threexyz");
        expect(Day1Part2.replaceFirstLiteralByDigit("xtwone3four")).toBe("x2ne3four");
        expect(Day1Part2.replaceFirstLiteralByDigit("4nineeightseven2")).toBe("49eightseven2");
        expect(Day1Part2.replaceFirstLiteralByDigit("zoneight234")).toBe("z1ight234");
        expect(Day1Part2.replaceFirstLiteralByDigit("7pqrstsixteen")).toBe("7pqrst6teen");
        expect(Day1Part2.replaceFirstLiteralByDigit("five61oneightr")).toBe("561oneightr");
    });

    it("Replace last literal by digit", function() {
        expect(Day1Part2.replaceLastLiteralByDigit("two1nine")).toBe("two19");
        expect(Day1Part2.replaceLastLiteralByDigit("eightwothree")).toBe("eightwo3");
        expect(Day1Part2.replaceLastLiteralByDigit("abcone2threexyz")).toBe("abcone23xyz");
        expect(Day1Part2.replaceLastLiteralByDigit("xtwone3four")).toBe("xtwone34");
        expect(Day1Part2.replaceLastLiteralByDigit("4nineeightseven2")).toBe("4nineeight72");
        expect(Day1Part2.replaceLastLiteralByDigit("zoneight234")).toBe("zon8234");
        expect(Day1Part2.replaceLastLiteralByDigit("7pqrstsixteen")).toBe("7pqrst6teen");
        expect(Day1Part2.replaceLastLiteralByDigit("five61oneightr")).toBe("five61on8r");
    });

    it("Evaluate one line", function() {
        expect(Day1Part2.solve("two1nine")).toBe(29);
        expect(Day1Part2.solve("eightwothree")).toBe(83);
        expect(Day1Part2.solve("abcone2threexyz")).toBe(13);
        expect(Day1Part2.solve("xtwone3four")).toBe(24);
        expect(Day1Part2.solve("4nineeightseven2")).toBe(42);
        expect(Day1Part2.solve("zoneight234")).toBe(14);
        expect(Day1Part2.solve("7pqrstsixteen")).toBe(76);
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

    it("Evaluate hard line", function() {
        expect(Day1Part2.solve("five61oneightr")).toBe(58);
    });
});

