import { Day1Part1 } from "./day-1-part-1"

describe("Part 1", function() {
    it("Evaluate one line", function() {
        expect(Day1Part1.evaluateLine("1abc2")).toBe(12);
        expect(Day1Part1.evaluateLine("pqr3stu8vwx")).toBe(38);
        expect(Day1Part1.evaluateLine("a1b2c3d4e5f")).toBe(15);
        expect(Day1Part1.evaluateLine("treb7uchet")).toBe(77);
    });

    it("Solve full example", function() {
        const example = "1abc2\r\n \
            pqr3stu8vwx\r\n\
            a1b2c3d4e5f\r\n\
            treb7uchet\r\n";
        expect(Day1Part1.solve(example)).toBe(142);
    });
});

