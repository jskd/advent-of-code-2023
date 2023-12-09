type SymbolPos = Record<number, number[]>;

export class NumberPos {
  constructor(
    public x: number,
    public y: number,
    public value: string
  ) {}
}

export abstract class Day03Part1 {
  static findSymbolPos(lines: string[]): SymbolPos {
    return lines.map((line) =>
      [...line.matchAll(/[^\d.]/g)].map(({ index }) => +index!)
    );
  }

  static getNumberPos(lines: string[]): NumberPos[] {
    return lines.flatMap((line, index) =>
      [...line.matchAll(/\d+/g)].map(
        (match) => new NumberPos(index, match.index!, match[0]!)
      )
    );
  }

  static isAdjacent({ x, y, value }: NumberPos, symbols: SymbolPos): boolean {
    return [symbols[x], symbols[x - 1] || [], symbols[x + 1] || []]
      .flat()
      .some((pos) => y - 1 <= pos && pos <= y + value.length);
  }

  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const symbols = this.findSymbolPos(lines);
    return this.getNumberPos(lines)
      .filter((number) => this.isAdjacent(number, symbols))
      .reduce((acc, { value }) => acc + +value, 0);
  }
}
