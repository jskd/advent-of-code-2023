export class Range {
  public srcEnd: number;
  public dstEnd: number;
  public offset: number;

  constructor(
    public srcStart: number,
    public dstStart: number,
    public len: number
  ) {
    this.srcEnd = srcStart + len;
    this.dstEnd = dstStart + len;
    this.offset = dstStart - srcStart;
  }
}

export class Mapping {
  maps: Range[];

  constructor(lines: string[]) {
    this.maps = lines.map((line) => {
      const [dst, src, len] = line.split(/\s+/).map((v) => +v);
      return new Range(src, dst, len);
    });
  }

  getDestination(source: number) {
    const match = this.maps.find(
      ({ srcStart, srcEnd }) => srcStart <= source && source < srcEnd
    );
    return match ? match.dstStart + (source - match.srcStart) : source;
  }

  static getMergedIntersection(src: Range, dst: Range) {
    if (src.dstEnd <= dst.srcStart || src.dstStart >= dst.srcEnd) {
      return null;
    }
    const start = Math.max(src.dstStart, dst.srcStart);
    const len = Math.min(src.dstEnd, dst.srcEnd) - start;
    return new Range(start - src.offset, start + dst.offset, len);
  }

  static removeIntesectionSource(src: Range, merge: Range) {
    if (src.srcEnd <= merge.srcStart || src.srcStart >= merge.srcEnd) {
      return [src];
    }
    const result: Range[] = [];
    if (src.srcEnd > merge.srcStart && merge.srcStart > src.srcStart) {
      result.push(
        new Range(src.srcStart, src.dstStart, merge.srcStart - src.srcStart)
      );
    }
    if (src.srcEnd > merge.srcEnd && src.srcEnd > merge.srcEnd) {
      const overlap = src.srcEnd - merge.srcEnd;
      result.push(
        new Range(src.srcEnd - overlap, src.dstEnd - overlap, overlap)
      );
    }
    return result;
  }

  static removeDestinationIntesection(dst: Range, merge: Range) {
    if (dst.dstEnd <= merge.dstStart || dst.dstStart >= merge.dstEnd) {
      return [dst];
    }
    const result: Range[] = [];
    if (dst.dstEnd > merge.dstStart && merge.dstStart > dst.dstStart) {
      result.push(
        new Range(dst.srcStart, dst.dstStart, merge.dstStart - dst.dstStart)
      );
    }
    if (dst.dstEnd > merge.dstEnd && dst.dstEnd > merge.dstEnd) {
      const overlap = dst.dstEnd - merge.dstEnd;
      result.push(
        new Range(dst.srcEnd - overlap, dst.dstEnd - overlap, overlap)
      );
    }
    return result;
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
