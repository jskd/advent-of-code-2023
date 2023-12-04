import { Card, Day04Part2 } from "./day-04-part-2";
import fs from 'fs'

describe("Day 4 part 2", function() {
    const examples = [
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
        "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
        "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
        "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
        "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"
    ];

    it("Get matching numbers of card", function() {
        expect(new Card(examples[0]).matchingNumbers).toStrictEqual(4);
        expect(new Card(examples[1]).matchingNumbers).toStrictEqual(2);
        expect(new Card(examples[2]).matchingNumbers).toStrictEqual(2);
        expect(new Card(examples[3]).matchingNumbers).toStrictEqual(1);
        expect(new Card(examples[4]).matchingNumbers).toStrictEqual(0);
        expect(new Card(examples[5]).matchingNumbers).toStrictEqual(0);
    });

    it("Solve example", function() {
        expect(Day04Part2.solve(examples.join("\r\n"))).toStrictEqual(30);
    });
   
    it("Solve day 4 part 2", function() {
        const content = fs.readFileSync(`${__dirname}/day-04-input.txt`);
        expect(Day04Part2.solve(content.toString())).toBe(7013204);
    });
});
