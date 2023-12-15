import memoizee from "memoizee";

const getPosibilities = memoizee(
  (line: string, groups: number[], counter = 0): number => {
    if (!line) {
      return groups.length || counter ? 0 : 1;
    }

    let posibilities = 0;
    const branchs = line[0] === "?" ? [".", "#"] : [line[0]];
    for (const branch of branchs) {
      if (branch === "#") {
        posibilities += getPosibilities(line.slice(1), groups, counter + 1);
      } else {
        if (!counter) {
          posibilities += getPosibilities(line.slice(1), groups);
        }
        if (groups[0] == counter) {
          posibilities += getPosibilities(line.slice(1), groups.slice(1));
        }
      }
    }
    return posibilities;
  },
  {
    length: false,
    primitive: true,
  }
);

export function evaluate(line: string, groups: number[]): number {
  return getPosibilities(line + ".", groups);
}

export class Day12 {
  static solve(input: string, unfold = false): number {
    return input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split(" "))
      .map((part) => {
        let sequence = part[0];
        let groups = part[1]
          .split(",")
          .filter(Boolean)
          .map((v) => +v);
        if (unfold) {
          sequence = sequence + ("?" + sequence).repeat(4);
          groups = Array(5).fill(groups).flat();
        }
        return evaluate(sequence, groups);
      })
      .reduce((acc, val) => acc + val, 0);
  }
}
