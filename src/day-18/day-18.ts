type Direction = "U" | "D" | "L" | "R";

class Action {
  constructor(
    readonly direction: Direction,
    readonly distance: number
  ) {}
}

function colorToAction(color: string): Action {
  const distance = Number(`0x${color.slice(2, 7)}`);
  const directionHex = color.slice(7, 8);
  let direction: Direction;
  if (directionHex === "0") direction = "R";
  else if (directionHex === "1") direction = "D";
  else if (directionHex === "2") direction = "L";
  else if (directionHex === "3") direction = "U";
  else throw Error("Direction not found");
  return new Action(direction, distance);
}

function getNumberOfInside(actions: Action[]): number {
  let x2 = 0;
  let y2 = 0;
  let area = 0;
  let perimeter = 0;
  actions.forEach(({ direction, distance }) => {
    const x1 = x2;
    const y1 = y2;
    if (direction === "U") y2 -= distance;
    else if (direction === "D") y2 += distance;
    else if (direction === "L") x2 -= distance;
    else if (direction === "R") x2 += distance;
    area += x1 * y2 - x2 * y1;
    perimeter += distance;
  });
  return Math.abs(area / 2) + perimeter / 2 + 1;
}

export class Day18 {
  static solve(input: string, part: 1 | 2): number {
    const actions = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => {
        const [direction, step, color] = line.split(" ");
        return part === 1
          ? new Action(direction as Direction, +step)
          : colorToAction(color);
      });
    return getNumberOfInside(actions);
  }
}
