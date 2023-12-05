import fs from "fs";
import { Day01Part1 } from "./day-01-part-1";
import { Day01Part2 } from "./day-01-part-2";

const content = fs.readFileSync(`${__dirname}/day-01-input.txt`);
console.log("Part1: ", Day01Part1.solve(content.toString()));
console.log("Part2: ", Day01Part2.solve(content.toString()));
