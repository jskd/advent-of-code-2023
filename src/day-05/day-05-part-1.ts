class Range {
  constructor(
    public start: number,
    public end: number
  ) {}
}

export class MapEntry {
  public src: Range;
  public dst: Range;
  public offset: number;

  constructor(srcStart: number, dstStart: number, len: number) {
    this.src = new Range(srcStart, srcStart + len);
    this.dst = new Range(dstStart, dstStart + len);
    this.offset = dstStart - srcStart;
  }
}

export class Mapping {
  maps: MapEntry[];

  constructor(lines: string[]) {
    this.maps = lines.map((line) => {
      const [dst, src, len] = line.split(/\s+/).map((v) => +v);
      return new MapEntry(src, dst, len);
    });
  }

  getDestination(source: number) {
    const match = this.maps.find(
      ({ src }) => src.start <= source && source < src.end
    );
    return match ? match.dst.start + (source - match.src.start) : source;
  }

  static getMergedIntersection(src: MapEntry, dst: MapEntry) {
    if (src.dst.end <= dst.src.start || src.dst.start >= dst.src.end) {
      return null;
    }
    const start = Math.max(src.dst.start, dst.src.start);
    const len = Math.min(src.dst.end, dst.src.end) - start;
    return new MapEntry(start - src.offset, start + dst.offset, len);
  }

  static removeIntesection(
    sourceEntry: MapEntry,
    mergeEntry: MapEntry,
    mode: "src" | "dst"
  ) {
    const [source, merge] =
      mode == "src"
        ? [sourceEntry.src, mergeEntry.src]
        : [sourceEntry.dst, mergeEntry.dst];

    if (source.end <= merge.start || source.start >= merge.end) {
      return [sourceEntry];
    }

    const result: MapEntry[] = [];
    if (source.end > merge.start && merge.start > source.start) {
      result.push(
        new MapEntry(
          sourceEntry.src.start,
          sourceEntry.dst.start,
          merge.start - source.start
        )
      );
    }
    if (source.end > merge.end && source.end > merge.end) {
      const overlap = source.end - merge.end;
      result.push(
        new MapEntry(
          sourceEntry.src.end - overlap,
          sourceEntry.dst.end - overlap,
          overlap
        )
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
