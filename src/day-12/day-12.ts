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
  const result = mapTest.get(line + group);
  if (result) {
    return result;
  }

  if (group.length === 1) {
    const result = mapTest.get(line + group[0]);
    if (result) {
      return result;
    } else {
      const val = evaluateArrangement(line, group[0]);
      mapTest.set(line + group[0], val);
      return val;
    }
  }

  let posibilities = 0;
  const nextGroup = group.slice(1);
  const sizeOfnextGroup = nextGroup.reduce((acc, v) => acc + 1 + v, -1);

  for (let i = 0; i < line.length; i++) {
    const before = line.substring(0, i);
    const current = line.substring(i, i + group[0]);
    const separator = line.charAt(i + group[0]);
    const after = line.substring(i + group[0] + 1);

    if (
      current.length < group[0] ||
      before.includes("#") ||
      after.length < sizeOfnextGroup
    ) {
      return posibilities;
    }
    if (current.includes(".") || separator === "#") {
      continue;
    }

    const result = mapTest.get(after + nextGroup);
    if (result) {
      posibilities += result;
    } else {
      const val = evaluate(after, nextGroup);
      mapTest.set(after + nextGroup, val);
      posibilities += val;
    }
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
