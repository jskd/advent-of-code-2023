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
  const lowStart = Math.max(end - group + 1, 0);
  const highStart = Math.min(start, line.length - group);
  return highStart - lowStart + 1;
}

export class Day12 {
  static solve(_input: string): number {
    return 0;
  }
}
