import { solveDay19Part1 } from "./day-19";
import fs from "fs";

describe("Day 19", () => {
  const example =
    "px{a<2006:qkq,m>2090:A,rfg}\r\n" +
    "pv{a>1716:R,A}\r\n" +
    "lnx{m>1548:A,A}\r\n" +
    "rfg{s<537:gd,x>2440:R,A}\r\n" +
    "qs{s>3448:A,lnx}\r\n" +
    "qkq{x<1416:A,crn}\r\n" +
    "crn{x>2662:A,R}\r\n" +
    "in{s<1351:px,qqz}\r\n" +
    "qqz{s>2770:qs,m<1801:hdj,R}\r\n" +
    "gd{a>3333:R,R}\r\n" +
    "hdj{m>838:A,pv}\r\n" +
    "\r\n" +
    "{x=787,m=2655,a=1222,s=2876}\r\n" +
    "{x=1679,m=44,a=2067,s=496}\r\n" +
    "{x=2036,m=264,a=79,s=2244}\r\n" +
    "{x=2461,m=1339,a=466,s=291}\r\n" +
    "{x=2127,m=1623,a=2188,s=1013}\r\n";
  it("Solve day 19 part 1 exemple", () => {
    expect(solveDay19Part1(example)).toBe(19114);
  });

  const puzzle = fs.readFileSync(`${__dirname}/day-19-input.txt`).toString();
  it("Solve day 19 part 1 puzzle", () => {
    expect(solveDay19Part1(puzzle)).toBe(287054);
  });
});
