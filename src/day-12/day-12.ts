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

export function evaluate(line: string, group: number[]): number {
  let posibilities = 0;

  if (!line.length) {
    posibilities = !group.length ? 1 : 0;
    return posibilities;
  }
  if (!group.length) {
    posibilities = line.includes("#") ? 0 : 1;
    return posibilities;
  }

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

    posibilities += evaluate(after, nextGroup);
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
