export class Race {
  public readonly numberWay: number;

  constructor(
    public readonly time: number,
    public readonly distance: number
  ) {
    this.numberWay = this.calculateNumberOfWay();
  }

  travelDistance(holdTime: number): number {
    return (this.time - holdTime) * holdTime;
  }

  calculateNumberOfWay(): number {
    let maxHold = this.time;
    let minHold = 1;

    while (this.travelDistance(maxHold) <= this.distance) {
      maxHold--;
      if (!maxHold) {
        return 0;
      }
    }
    while (this.travelDistance(minHold) <= this.distance) {
      minHold++;
    }

    return maxHold - minHold + 1;
  }
}

export abstract class Day06Part1 {
  static solve(input: string): number {
    const [times, distances] = input.split(/[\r\n]+/).map((line) =>
      line
        .split(/\s+/)
        .map((v) => +v)
        .filter(Boolean)
    );

    const races = times.map((time, index) => new Race(time, distances[index]));
    return races.reduce((acc, { numberWay }) => acc * numberWay, 1);
  }
}
