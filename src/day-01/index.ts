import fs from 'fs';
import { Day1Part1 } from "./day-1-part-1";
import { Day1Part2 } from './day-1-part-2';

const content = fs.readFileSync(`${__dirname}/day-1-input.txt`);
console.log("part1: ", Day1Part1.solve(content.toString()));
console.log("part2: ", Day1Part2.solve(content.toString()));