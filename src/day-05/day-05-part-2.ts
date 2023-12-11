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
      .flatMap(({ sourceToDestination }) =>
        [sourceToDestination.start, sourceToDestination.end - 1].map((v) =>
          this.getCorrespondance(v, "sourceToDestination")
        )
      )
      .concat(this.sourceToDestination?.getCandidateSeeds() ?? []);
  }
}
/*
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
        currentMapping.ranges.push(new MappingEntry(src, dst, len));
      } else if (currentMapping.ranges.length) {
        currentMapping.sourceToDestination = new Mapping();
        currentMapping = currentMapping.sourceToDestination;
      }
    }

    return seeds.reduce(
      (acc, seed) =>
        Math.min(start.getCorrespondance(seed, "sourceToDestination"), acc),
      Infinity
    );
  }
}*/

export abstract class Day05Part2 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/);
    const seedsRange = lines[0]
      .split(" ")
      .map((number) => +number)
      .filter(Boolean)
      .reduce(
        (acc: Range[], val: number, index: number, src: number[]): Range[] =>
          index % 2 === 0 ? [...acc, new Range(val, val, src[index + 1])] : acc,
        []
      );

    const start = new Mapping();
    //  start.ranges.push(...seedsRange);
    //  start.sourceToDestination = new Mapping();

    // let currentMapping = start.sourceToDestination;
    let currentMapping = start;
    for (const line of lines) {
      if (/^\d/.test(line)) {
        const [dst, src, len] = line.split(" ").map((value) => +value);
        currentMapping.ranges.push(new MappingEntry(src, dst, len));
      } else if (currentMapping.ranges.length) {
        const nextOne = new Mapping();

        currentMapping.sourceToDestination = nextOne;
        nextOne.destinationToSource = currentMapping;

        currentMapping = nextOne;
      }
    }

    const best = start
      .getCandidateSeeds()
      .map((v) => currentMapping.getCorrespondance(v, "destinationToSource"))
      .filter((v) => seedsRange.some((r) => r.isInside(v)))
      .map((v) => start.getCorrespondance(v, "sourceToDestination"))
      .sort(compare);

    console.log(JSON.stringify(best));

    if (!best) {
      throw new Error("Seed not found");
    }

    // fail 1004028601

    return 0;
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
