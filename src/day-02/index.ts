import fs from 'fs';
import { Bag, Day02Part1 } from './day-02-part-1';
import { Day02Part2 } from './day-02-part-2';

const capacity : Bag = { red: 12, green: 13, blue: 14 };

const content = fs.readFileSync(`${__dirname}/day-02-input.txt`);
console.log("part1: ", Day02Part1.solve(content.toString(), capacity));
console.log("part2: ", Day02Part2.solve(content.toString()));