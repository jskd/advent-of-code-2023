type SearchMode = "min" | "max";

export class Race {
  public readonly numberWay: number;

  constructor(
    public readonly time: number,
    public readonly distance: number
  ) {
    this.numberWay = this.searchHold("max") - this.searchHold("min") + 1;
  }

  travelDistance(holdTime: number): number {
    return (this.time - holdTime) * holdTime;
  }

  searchHold(mode: SearchMode): number {
    let minHold = 0;
    let maxHold = this.time;
    while (minHold < maxHold) {
      const hold = Math.floor((minHold + maxHold) / 2);
      if (this.travelDistance(hold) <= this.distance) {
        if (mode === "min") minHold = hold + 1;
        else maxHold = hold;
      } else {
        if (mode === "min") maxHold = hold;
        else minHold = hold + 1;
      }
    }
    return mode === "min" ? maxHold : maxHold - 1;
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
