class Pos {
  constructor(
    public x: number,
    public y: number
  ) {}
}

export class GearPos extends Pos {
  numbers: number[];

  constructor(x: number, y: number, numbers: number[] = []) {
    super(x, y);
    this.numbers = numbers;
  }

  getRatio(): number {
    return this.numbers.length === 2 ? this.numbers[0] * this.numbers[1] : 0;
  }

  pushNumber(number: number) {
    this.numbers.push(number);
  }
}

export class NumberPos extends Pos {
  constructor(
    x: number,
    y: number,
    public value: string
  ) {
    super(x, y);
  }
}

export abstract class Day03Part2 {
  static findGearPosition(lines: string[]): GearPos[][] {
    return lines.map((line, lineNumber) =>
      [...line.matchAll(/\*/g)].map(
        ({ index }) => new GearPos(lineNumber, index!)
      )
    );
  }

  static findNumberPosition(lines: string[]): NumberPos[] {
    return lines.flatMap((line, lineNumber) =>
      [...line.matchAll(/\d+/g)].map(
        (match) => new NumberPos(lineNumber, match.index!, match[0]!)
      )
    );
  }

  static associateGearAdjacent(numberPosition: NumberPos, gears: GearPos[][]) {
    const { x, y: yN, value } = numberPosition;
    [gears[x], gears[x - 1] || [], gears[x + 1] || []]
      .flat()
      .filter(({ y: yG }) => yN - 1 <= yG && yG <= yN + value.length)
      .forEach((gear) => gear.pushNumber(+value));
  }

  static getSumGearRatio(gears: GearPos[][]): number {
    return gears.flat().reduce((acc, gear) => acc + gear.getRatio(), 0);
  }

  static solve(input: string) {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const gears = this.findGearPosition(lines);
    const numbers = this.findNumberPosition(lines);

    numbers.forEach((pos) => this.associateGearAdjacent(pos, gears));
    return this.getSumGearRatio(gears);
  }
}
