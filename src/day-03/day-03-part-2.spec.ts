import { Day03Part2, GearPosition } from "./day-03-part-2"
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
        new GearPosition(1, 3),
        new GearPosition(4, 3),
        new GearPosition(8, 5),
    ];
    const numbers = [
        {"value": "467", "x": 0, "y": 0}, 
        {"value": "114", "x": 0, "y": 5}, 
        {"value": "35", "x": 2, "y": 2}, 
        {"value": "633", "x": 2, "y": 6}, 
        {"value": "617", "x": 4, "y": 0}, 
        {"value": "58", "x": 5, "y": 7}, 
        {"value": "592", "x": 6, "y": 2}, 
        {"value": "755", "x": 7, "y": 6}, 
        {"value": "664", "x": 9, "y": 1}, 
        {"value": "598", "x": 9, "y": 5}
    ];
    const associatedGear = [
        new GearPosition(1, 3, [numbers[0], numbers[2]]),
        new GearPosition(4, 3, [numbers[4]]),
        new GearPosition(8, 5, [numbers[7], numbers[9]]),
    ]

    it("Find gear position", function() {
        const lines = example.split(/[\r\n]+/).filter(Boolean);
        expect(Day03Part2.findGearPosition(lines)).toStrictEqual(gears);
    });

    it("Associate number adjacent to gear", function() {
        let tested_gears = [
            new GearPosition(1, 3),
            new GearPosition(4, 3),
            new GearPosition(8, 5),
        ];
        numbers.forEach(pos => Day03Part2.associateGearAdjacent(pos, tested_gears));
        expect(tested_gears).toStrictEqual(associatedGear);
    });

    it("calculate gear ratio", function() {
        expect(associatedGear[0].getRatio()).toBe(16345);
        expect(associatedGear[1].getRatio()).toBe(0);
        expect(associatedGear[2].getRatio()).toBe(451490);
    });

    it("calculate sum of gear ratio", function() {
        expect( Day03Part2.getSumGearRatio(associatedGear)).toBe(467835);
    });

    it("solve example", function() {
        expect(Day03Part2.solve(example)).toBe(467835);
    });

    it("Solve day 3 part 2", function() {
        const content = fs.readFileSync(`${__dirname}/day-03-input.txt`);
        expect(Day03Part2.solve(content.toString())).toBe(86879020);
    });
});
