type Direction = "toSeed" | "toLocation";
type DirectionProp<T> = {
  [key in Direction]: T;
};

export class Range implements DirectionProp<Range> {
  toLocation = this;
  get toSeed(): Range {
    return new Range(this.destination, this.source, this.length);
  }

  constructor(
    readonly source: number,
    readonly destination: number,
    readonly length: number
  ) {}

  isInside(value: number): boolean {
    return this.source <= value && value < this.source + this.length;
  }

  getCorrespondance(value: number): number {
    if (!this.isInside(value)) throw new Error("Value outside source");
    return value - this.source + this.destination;
  }
}

export class AlmanacMap implements Partial<DirectionProp<AlmanacMap>> {
  ranges: Range[] = [];
  toLocation?: AlmanacMap;
  toSeed?: AlmanacMap;

  constructor(parent?: AlmanacMap) {
    this.toSeed = parent;
    if (parent) {
      parent.toLocation = this;
    }
  }

  getCorrespondance(value: number, direction: Direction): number {
    const range = this.ranges
      .map((range) => range[direction])
      .find((range) => range.isInside(value));
    value = range?.getCorrespondance(value) ?? value;
    return this[direction]?.getCorrespondance(value, direction) ?? value;
  }

  // Get all seed on start position range
  getLowerSeedCandidate(): number[] {
    return this.ranges
      .map(({ toSeed }) => this.getCorrespondance(toSeed.source, "toSeed"))
      .concat(this.toLocation?.getLowerSeedCandidate() ?? []);
  }
}

export abstract class Day05Part2 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/);

    const seedRanges = lines[0]
      .split(" ")
      .map((number) => +number)
      .filter(Boolean)
      .reduce(
        (acc: Range[], val, idx, arr) =>
          idx % 2 === 0 ? [...acc, new Range(val, val, arr[idx + 1])] : acc,
        []
      );

    const rootMapping = new AlmanacMap();
    let current = rootMapping;
    for (const line of lines) {
      if (/^\d/.test(line)) {
        const [dst, src, len] = line.split(" ").map((value) => +value);
        current.ranges.push(new Range(src, dst, len));
      } else if (current.ranges.length) {
        current = new AlmanacMap(current);
      }
    }

    const [lowerLocation] = rootMapping
      .getLowerSeedCandidate()
      .filter((seed) => seedRanges.some((range) => range.isInside(seed)))
      .map((seed) => rootMapping.getCorrespondance(seed, "toLocation"))
      // Default sort doesn't work large number of input
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

    return lowerLocation;
  }
}
