import { Day03Part1 } from "./day-03-part-1"
import fs from 'fs'

describe("Day 3 part 1", function() {
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
    const symboles = [
        { line: 1, pos: [ 3 ] },
        { line: 3, pos: [ 6 ] },
        { line: 4, pos: [ 3 ] },
        { line: 5, pos: [ 5 ] },
        { line: 8, pos: [ 3, 5 ] }
    ];

    it("Find symbols position", function() {
        expect(Day03Part1.findSymbolPosition(example)).toStrictEqual(symboles);
    });

    it("Find numbers position", function() {
        expect(Day03Part1.getNumberPosition(example)).toStrictEqual([
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
        ]);
    })

    it("Find if number is adjacent", function() {
        expect(Day03Part1.isAdjacent({"value": "467", "x": 0, "y": 0}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "114", "x": 0, "y": 5}, symboles)).toBe(false);
        expect(Day03Part1.isAdjacent({"value": "35", "x": 2, "y": 2}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "633", "x": 2, "y": 6}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "617", "x": 4, "y": 0}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "58", "x": 5, "y": 7}, symboles)).toBe(false);
        expect(Day03Part1.isAdjacent({"value": "592", "x": 6, "y": 2}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "755", "x": 7, "y": 6}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "664", "x": 9, "y": 1}, symboles)).toBe(true);
        expect(Day03Part1.isAdjacent({"value": "598", "x": 9, "y": 5}, symboles)).toBe(true);
    });

    it("Solve example", function() {
        expect(Day03Part1.solve(example)).toBe(4361);
    });  

    it("Solve day 3 part 1", function() {
        const content = fs.readFileSync(`${__dirname}/day-03-input.txt`);
        expect(Day03Part1.solve(content.toString())).toBe(540131);
    });
});
