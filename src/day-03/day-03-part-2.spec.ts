import { Day03Part2 } from "./day-03-part-2"
import fs from 'fs'

describe("Day 3 part 2", function() {

    const example = "467..114..\r\n" +
            "...*......\r\n" +
            "..35..633.\r\n" +
            "......#...\r\n" +
            "617*......\r\n" +
            ".....+.58.\r\n" +
            "..592.....\r\n" +
            "......755.\r\n" +
            "...$.*....\r\n" +
            ".664.598.." ;
    const gears = [
        { x: 1, y: 3, numbers: [] },
        { x: 4, y: 3, numbers: [] },
        { x: 8, y: 5, numbers: [] }
    ];

    it("Find symbols position", function() {
        expect(Day03Part2.findGearPosition(example)).toStrictEqual(gears);
    });
    
    it("Solve day 3 part 2", function() {
        //const content = fs.readFileSync(`${__dirname}/day-03-input.txt`);
        //expect(Day03Part2.solve(content.toString())).toBe(       );
    });
});
