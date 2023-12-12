export class Range {
  constructor(
    readonly source: number,
    readonly destination: number,
    readonly length: number
  ) {}

  isInSource(value: number): boolean {
    return this.source <= value && value < this.source + this.length;
  }

  getDestination(value: number): number {
    if (!this.isInSource(value)) throw new Error("Value outside source");
    return value - this.source + this.destination;
  }
}

export class AlmanacMap {
  ranges: Range[] = [];
  nextAlmanac?: AlmanacMap;

  getDestination(value: number): number {
    const range = this.ranges.find((range) => range.isInSource(value));
    value = range?.getDestination(value) ?? value;
    return this.nextAlmanac ? this.nextAlmanac.getDestination(value) : value;
  }
}

export abstract class Day05Part1 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/);
    const seeds = lines[0]
      .split(" ")
      .map((number) => +number)
      .filter(Boolean);

    const start = new AlmanacMap();
    let currentMapping = start;
    for (const line of lines) {
      if (/^\d/.test(line)) {
        const [dst, src, len] = line.split(" ").map((value) => +value);
        currentMapping.ranges.push(new Range(src, dst, len));
      } else if (currentMapping.ranges.length) {
        currentMapping.nextAlmanac = new AlmanacMap();
        currentMapping = currentMapping.nextAlmanac;
      }
    }

    return seeds.reduce(
      (acc, seed) => Math.min(start.getDestination(seed), acc),
      Infinity
    );
  }
}
