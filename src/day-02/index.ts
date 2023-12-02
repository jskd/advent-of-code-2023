import fs from 'fs';
import { Bag, Day02Part1 } from './day-02-part-1';

const capacity : Bag = { red: 12, green: 13, blue: 14 };

const content = fs.readFileSync(`${__dirname}/day-02-input.txt`);
console.log("part1: ", Day02Part1.solve(content.toString(), capacity));