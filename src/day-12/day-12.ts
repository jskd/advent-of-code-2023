export class Sequence {
  constructor(
    readonly line: string,
    readonly groups: number[]
  ) {}

  unfold(): Sequence {
    let line = this.line;
    let seq = [...this.groups];
    for (let i = 0; i < 4; i++) {
      line += "?" + this.line;
      seq = [...seq, ...this.groups];
    }
    return new Sequence(line, seq);
  }
}

export function evaluateArrangement(line: string, group: number): number {
  if (line.length < group) {
    return 0;
  }

  if (line.includes(".")) {
    const lines = line.split(".").filter(Boolean);
    const withShap = lines.filter((line) => line.includes("#"));
    if (withShap.length > 1) {
      return 0;
    } else if (withShap.length === 1) {
      return evaluateArrangement(withShap[0], group);
    } else {
      return lines.reduce((acc, v) => acc + evaluateArrangement(v, group), 0);
    }
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

const mapTest = new Map<string, number>();

export function evaluate(line: string, group: number[]): number {
  if (group.length === 1) {
    return evaluateArrangement(line, group[0]);
  }

  let posibilities = 0;
  const nextGroup = group.slice(1);
  const sizeOfnextGroup = nextGroup.reduce((acc, v) => acc + 1 + v, -1);

  const firstDieze = line.indexOf("#");
  let nextDot = line.indexOf(".");

  for (let i = 0; i < line.length; i++) {
    if (
      (firstDieze != -1 && i - 1 >= firstDieze) ||
      line.length - i + group[0] + 1 < sizeOfnextGroup ||
      line.length - i < group[0]
    ) {
      return posibilities;
    }

    if (nextDot != -1 && i <= nextDot && nextDot < i + group[0]) {
      i = nextDot;
      nextDot = line.indexOf(".", nextDot + 1);
      continue;
    }

    if (line.charAt(i + group[0]) === "#") {
      continue;
    }

    posibilities += evaluate(line.substring(i + group[0] + 1), nextGroup);
  }

  mapTest.set(line + group, posibilities);
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

export class Day12Part2 {
  static solve(input: string): number {
    const sequences = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split(" "))
      .map(
        ([sequence, num]) =>
          new Sequence(
            sequence,
            num
              .split(",")
              .filter(Boolean)
              .map((v) => +v)
          )
      );

    return sequences
      .map((v) => v.unfold())
      .map((v) => evaluate(v.line, v.groups))
      .reduce((acc, val) => acc + val, 0);
  }
}
