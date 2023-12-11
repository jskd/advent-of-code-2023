export class Range {
  readonly start: number;
  readonly end: number;
  readonly offset: number;

  constructor(source: number, destination: number, len: number) {
    this.start = source;
    this.end = source + len;
    this.offset = destination - source;
  }
}

export class Mapping {
  ranges: Range[] = [];
  next?: Mapping;

  getDestination(source: number): number {
    source +=
      this.ranges.find(({ start, end }) => start <= source && source < end)
        ?.offset ?? 0;
    return this.next ? this.next.getDestination(source) : source;
  }
}

export abstract class Day05Part1 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/);
    const seeds = lines[0]
      .split(" ")
      .map((number) => +number)
      .filter(Boolean);

    const start = new Mapping();
    let currentMapping = start;
    for (const line of lines) {
      if (/^\d/.test(line)) {
        const [dst, src, len] = line.split(" ").map((value) => +value);
        currentMapping.ranges.push(new Range(src, dst, len));
      } else if (currentMapping.ranges.length) {
        currentMapping.next = new Mapping();
        currentMapping = currentMapping.next;
      }
    }

    return seeds.reduce(
      (acc, seed) => Math.min(start.getDestination(seed), acc),
      Infinity
    );
  }
}
