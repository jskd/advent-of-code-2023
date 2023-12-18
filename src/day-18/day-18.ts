type Direction = "U" | "D" | "L" | "R";

class Action {
  constructor(
    readonly direction: Direction,
    readonly step: number
  ) {}
}

function getNumberOfInside(actions: Action[]): number {
  let x2 = 0;
  let y2 = 0;
  let area = 0;
  let perimeter = 0;
  actions.forEach(({ direction, step }) => {
    const x1 = x2;
    const y1 = y2;
    if (direction === "U") y2 -= step;
    else if (direction === "D") y2 += step;
    else if (direction === "L") x2 -= step;
    else if (direction === "R") x2 += step;
    area += x1 * y2 - x2 * y1;
    perimeter += step;
  });
  return Math.abs(area / 2) + perimeter / 2 + 1;
}

export class Day18 {
  static solve(input: string): number {
    const actions = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => {
        const [direction, step, _] = line.split(" ");
        return new Action(direction as Direction, +step);
      });
    return getNumberOfInside(actions);
  }
}
