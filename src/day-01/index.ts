import fs from 'fs';
import { Day1Part1 } from "./day-1-part-1";

const content = fs.readFileSync(`${__dirname}/day-1-part-1-input.txt`);
console.log(Day1Part1.solve(content.toString()));