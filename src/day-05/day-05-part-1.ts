export class MapEntry {
  readonly src: number;
  readonly dst: number;
  readonly len: number;

  constructor(line: string) {
    [this.dst, this.src, this.len] = line.split(/\s+/).map((v) => +v);
  }
}

export class Mapping {
  maps: MapEntry[];

  constructor(lines: string[]) {
    this.maps = lines.map((line) => new MapEntry(line));
  }

  getDestination(source: number) {
    const match = this.maps.find(
      ({ src, len }) => src <= source && source < src + len
    );
    return match ? source + match.dst - match.src : source;
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
