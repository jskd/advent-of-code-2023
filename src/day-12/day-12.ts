export type Tile = "#" | "?";

export function evaluateArrangement(line: string, group: number) {
  if (line.length < group) {
    return 0;
  }

  const start = line.indexOf("#");
  if (start === -1) {
    return line.length - group + 1;
  }
  const end = line.lastIndexOf("#");
  if (end - start > group) {
    return 0;
  }

  const lowStart = Math.max(end - group + 1, 0);
  const highStart = Math.min(start, line.length - group);
  return highStart - lowStart + 1;
}

export function evaluateGroupArrangement(
  line: string,
  group: number[]
): number {
  if (group.length === 1) {
    return evaluateArrangement(line, group[0]);
  }

  if (line.charAt(group[0]) == "#") {
    return 0;
  }

  return (
    evaluateArrangement(line.substring(0, group[0]), group[0]) *
    evaluateGroupArrangement(line.substring(group[0] + 1), group.slice(1))
  );
}

export function evaluate(line: string, group: number[]) {
  let posibilities = 0;
  for (let i = 0; i < line.length; i++) {
    posibilities += evaluateGroupArrangement(line.substring(i), group);
  }

  return posibilities;
}

export class Day12 {
  static solve(input: string): number {
    return input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .flatMap((line) =>
        line.split(" ").map(([sequence, group]) =>
          evaluate(
            sequence,
            group.split(",").map((v) => +v)
          )
        )
      )
      .reduce((acc, line) => acc + line, 0);
  }
}
