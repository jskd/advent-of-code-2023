import fs from 'fs';
import { Day04Part1 } from './day-04-part-1';
import { Day04Part2 } from './day-04-part-2';

const content = fs.readFileSync(`${__dirname}/day-04-input.txt`);
console.log("Part1: ", Day04Part1.solve(content.toString()));
console.log("Part2: ", Day04Part2.solve(content.toString()));
