export class Range {
  constructor(
    public start: number,
    public end: number,
    public offset: number
  ) {}

  getIntersection(range: Range): Range | null {
    return this.end <= range.start || this.start >= range.end
      ? null
      : new Range(
          Math.max(this.start, range.start),
          Math.min(this.end, range.end),
          this.offset
        );
  }

  removeIntersection(range: Range): Range[] {
    const result: Range[] = [];
    if (this.start < range.start) {
      result.push(new Range(this.start, range.start, this.offset));
    }
    if (this.end > range.end) {
      result.push(new Range(range.end, this.end, this.offset));
    }
    return result;
  }

  removeMultipleIntersection(ranges: Range[]): Range[] {
    let results = [new Range(this.start, this.end, this.offset)];
    for (const range of ranges) {
      results = results.flatMap((result) => result.removeIntersection(range));
    }
    return results;
  }

  reverse() {
    this.start += this.offset;
    this.end += this.offset;
    this.offset *= -1;
  }
}

export class Mapping {
  maps: Range[];

  constructor(lines: string[]) {
    this.maps = lines.map((line) => {
      const [dst, src, len] = line.split(/\s+/).map((v) => +v);
      return new Range(src, src + len, dst - src);
    });
  }

  getDestination(source: number) {
    const match = this.maps.find(
      ({ start, end }) => start <= source && source < end
    );
    return match ? source + match.offset : source;
  }
}

export class MappingList extends Array<Mapping> {
  getDestination(source: number): number {
    return this.reduce((acc, mapping) => mapping.getDestination(acc), source);
  }
}

export abstract class Day05Part1 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const [_, seedsStr] = lines.shift()!.split(":");
    const seeds = seedsStr
      .split(" ")
      .filter(Boolean)
      .map((number) => +number);

    const mappingList = new MappingList();
    const mappingEntry = [];

    for (const line of lines) {
      if (/^\d/.test(line)) {
        mappingEntry.push(line);
      } else if (mappingEntry.length) {
        mappingList.push(new Mapping(mappingEntry));
        mappingEntry.length = 0;
      }
    }
    if (mappingEntry.length) {
      mappingList.push(new Mapping(mappingEntry));
      mappingEntry.length = 0;
    }

    return seeds.reduce(
      (acc, seed) => Math.min(mappingList.getDestination(seed), acc),
      Infinity
    );
  }
}
