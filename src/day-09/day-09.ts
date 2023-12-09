export class History {
  static getDifference(history: number[]): number[] {
    return history
      .slice(0, -1)
      .map((value, index) => history[index + 1] - value);
  }

  static extrapolate(history: number[][]) {
    history.at(-1)?.push(0);
    for (let i = history.length - 2; i >= 0; i--) {
      history[i].push(history[i].at(-1)! + history[i + 1].at(-1)!);
    }
    return history;
  }

  static nextValue(history: number[]): number {
    const difference = [history];
    while (difference.at(-1)!.some((v) => v != 0)) {
      difference.push(this.getDifference(difference.at(-1)!));
    }
    return this.extrapolate(difference)[0].at(-1)!;
  }

  static sumOfNextValues(histories: number[][]): number {
    return histories
      .map((v) => History.nextValue(v))
      .reduce((acc, value) => acc + value, 0);
  }
}

export class Day9Part1 {
  static solve(input: string): number {
    const histories = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split(" ").map((value) => +value))
      .filter(Boolean);

    return History.sumOfNextValues(histories);
  }
}
