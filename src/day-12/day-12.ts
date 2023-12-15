import memoizee from "memoizee";

const memGetPosibilities = memoizee(getPosibilities, {
  length: false,
  primitive: true,
});

function getPosibilities(line: string, group: number[], counter = 0): number {
  if (!line.length) {
    return group.length || counter ? 0 : 1;
  }

  let posibilities = 0;
  const branchs = line[0] === "?" ? [".", "#"] : [line[0]];
  for (const branch of branchs) {
    if (branch === "#") {
      posibilities += memGetPosibilities(line.slice(1), group, counter + 1);
    } else {
      if (!counter) {
        posibilities += memGetPosibilities(line.slice(1), group);
      }
      if (group && group[0] == counter) {
        posibilities += memGetPosibilities(line.slice(1), group.slice(1));
      }
    }
  }
  return posibilities;
}

export function evaluate(line: string, group: number[]): number {
  return memGetPosibilities(line + ".", group, 0);
}

export class Day12 {
  static solve(input: string): number {
    return input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split(" "))
      .map(([sequence, num]) =>
        evaluate(
          sequence,
          num
            .split(",")
            .filter(Boolean)
            .map((v) => +v)
        )
      )
      .reduce((acc, val) => acc + val, 0);
  }
}

export class Day12Part2 {
  static solve(input: string): number {
    return input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split(" "))
      .map(([sequence, num]) => {
        sequence = sequence + ("?" + sequence).repeat(4);
        const groups = Array(5)
          .fill(
            num
              .split(",")
              .filter(Boolean)
              .map((v) => +v)
          )
          .flat();
        return evaluate(sequence, groups);
      })
      .reduce((acc, val) => acc + val, 0);
  }
}
