export function evaluate(line: string, group: number[]): number {
  if (!line.length) {
    return !group.length ? 1 : 0;
  }
  if (!group.length) {
    return line.includes("#") ? 0 : 1;
  }

  let posibilities = 0;
  for (let i = 0; i < line.length; i++) {
    const before = line.substring(0, i);
    const current = line.substring(i, i + group[0]);
    const separator = line.charAt(i + group[0]);
    const after = line.substring(i + group[0] + 1);

    if (current.length < group[0] || before.includes("#")) {
      return posibilities;
    }
    if (current.includes(".") || separator === "#") {
      continue;
    }
    posibilities += evaluate(after, group.slice(1));
  }
  return posibilities;
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
