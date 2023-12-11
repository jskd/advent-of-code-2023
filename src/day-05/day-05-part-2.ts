export class Range {
  readonly start: number;
  readonly end: number;
  readonly offset: number;

  constructor(source: number, destination: number, len: number) {
    this.start = source;
    this.end = source + len;
    this.offset = destination - source;
  }

  isInside(source: number): boolean {
    return this.start <= source && source < this.end;
  }
}

export class MappingEntry {
  sourceToDestination: Range;
  destinationToSource: Range;

  constructor(source: number, destination: number, len: number) {
    this.sourceToDestination = new Range(source, destination, len);
    this.destinationToSource = new Range(destination, source, len);
  }
}

export class Mapping {
  ranges: MappingEntry[] = [];
  sourceToDestination?: Mapping;
  destinationToSource?: Mapping;

  constructor(parent?: Mapping) {
    if (parent) {
      this.destinationToSource = parent;
      parent.sourceToDestination = this;
    }
  }

  getCorrespondance(
    source: number,
    direction: "sourceToDestination" | "destinationToSource"
  ): number {
    source +=
      this.ranges
        .map((entry) => entry[direction])
        .find((range) => range.isInside(source))?.offset ?? 0;
    return this[direction]?.getCorrespondance(source, direction) ?? source;
  }

  getCandidateSeeds(): number[] {
    return this.ranges
      .flatMap(({ destinationToSource }) =>
        [destinationToSource.start, destinationToSource.end - 1].map((node) =>
          this.getCorrespondance(node, "destinationToSource")
        )
      )
      .concat(this.sourceToDestination?.getCandidateSeeds() ?? []);
  }
}

export abstract class Day05Part2 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/);
    const seedsRange = lines[0]
      .split(" ")
      .map((number) => +number)
      .filter(Boolean)
      .reduce(
        (acc: Range[], val, index, src) =>
          index % 2 === 0 ? [...acc, new Range(val, val, src[index + 1])] : acc,
        []
      );

    const root = new Mapping();
    let currentMapping = root;
    for (const line of lines) {
      if (/^\d/.test(line)) {
        const [dst, src, len] = line.split(" ").map((value) => +value);
        currentMapping.ranges.push(new MappingEntry(src, dst, len));
      } else if (currentMapping.ranges.length) {
        currentMapping = new Mapping(currentMapping);
      }
    }

    const [best] = root
      .getCandidateSeeds()
      .filter((seed) => seedsRange.some((range) => range.isInside(seed)))
      .map((seed) => root.getCorrespondance(seed, "sourceToDestination"))
      .sort(compare);

    if (!best) {
      throw new Error("Seed not found");
    }
    return best;
  }
}

function compare(a: number, b: number) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}
