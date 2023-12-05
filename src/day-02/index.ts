import fs from "fs";
import { Day02Part1 } from "./day-02-part-1";
import { Day02Part2 } from "./day-02-part-2";

const content = fs.readFileSync(`${__dirname}/day-02-input.txt`);
console.log("Part1: ", Day02Part1.solve(content.toString()));
console.log("Part2: ", Day02Part2.solve(content.toString()));
