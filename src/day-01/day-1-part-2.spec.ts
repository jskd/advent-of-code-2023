import { Day1Part2 } from "./day-1-part-2"

describe("Part 2", function() {

    it("Replace first literal by digit", function() {
        expect(Day1Part2.replaceFirstLiteralByDigit("two1nine", "leftToRight")).toBe("21nine");
        expect(Day1Part2.replaceFirstLiteralByDigit("eightwothree", "leftToRight")).toBe("8wothree");
        expect(Day1Part2.replaceFirstLiteralByDigit("abcone2threexyz", "leftToRight")).toBe("abc12threexyz");
        expect(Day1Part2.replaceFirstLiteralByDigit("xtwone3four", "leftToRight")).toBe("x2ne3four");
        expect(Day1Part2.replaceFirstLiteralByDigit("4nineeightseven2", "leftToRight")).toBe("49eightseven2");
        expect(Day1Part2.replaceFirstLiteralByDigit("zoneight234", "leftToRight")).toBe("z1ight234");
        expect(Day1Part2.replaceFirstLiteralByDigit("7pqrstsixteen", "leftToRight")).toBe("7pqrst6teen");
        expect(Day1Part2.replaceFirstLiteralByDigit("five61oneightr", "leftToRight")).toBe("561oneightr");
    });

    it("Replace last literal by digit", function() {
        expect(Day1Part2.replaceFirstLiteralByDigit("two1nine", "rightToLeft")).toBe("two19");
        expect(Day1Part2.replaceFirstLiteralByDigit("eightwothree", "rightToLeft")).toBe("eightwo3");
        expect(Day1Part2.replaceFirstLiteralByDigit("abcone2threexyz", "rightToLeft")).toBe("abcone23xyz");
        expect(Day1Part2.replaceFirstLiteralByDigit("xtwone3four", "rightToLeft")).toBe("xtwone34");
        expect(Day1Part2.replaceFirstLiteralByDigit("4nineeightseven2", "rightToLeft")).toBe("4nineeight72");
        expect(Day1Part2.replaceFirstLiteralByDigit("zoneight234", "rightToLeft")).toBe("zon8234");
        expect(Day1Part2.replaceFirstLiteralByDigit("7pqrstsixteen", "rightToLeft")).toBe("7pqrst6teen");
        expect(Day1Part2.replaceFirstLiteralByDigit("five61oneightr", "rightToLeft")).toBe("five61on8r");
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

