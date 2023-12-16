import memoizee from "memoizee";

export const evaluate = memoizee(
  (line: string, groups: number[]): number => {
    if (!line) {
      return groups.length ? 0 : 1;
    }
    if (!groups.length) {
      return line.includes("#") ? 0 : 1;
    }

    let possibilities = 0;
    if (line[0] === "?" || line[0] === ".") {
      possibilities += evaluate(line.slice(1), groups);
    }
    if (line[0] === "?" || line[0] === "#") {
      // Check no "#" next to the group area
      if (line.length >= groups[0] && line[groups[0]] != "#") {
        // Check no "." in the group area
        if (line.lastIndexOf(".", groups[0] - 1) === -1) {
          possibilities += evaluate(line.slice(groups[0] + 1), groups.slice(1));
        }
      }
    }
    return possibilities;
  },
  {
    primitive: true,
  }
);

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
