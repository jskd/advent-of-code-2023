const coordinateNames = ["x", "y", "z"] as const;
type Coordinate = (typeof coordinateNames)[number];

class Point3D implements Record<Coordinate, number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public z: number
  ) {}
}

class Brick {
  below: Brick[] = [];
  abrove: Brick[] = [];
  direction: Coordinate;

  constructor(
    readonly start: Point3D,
    readonly end: Point3D
  ) {
    this.direction = coordinateNames.find((v) => start[v] != end[v]) ?? "z";
  }

  static compareByLowerZ(a: Brick, b: Brick): number {
    const aZ = Math.min(a.start.z, a.end.z);
    const bZ = Math.min(b.start.z, b.end.z);
    return aZ > bZ ? 1 : aZ < bZ ? -1 : 0;
  }

  foreachPoint2D(callbackFn: (x: number, y: number) => void) {
    const { start, end, direction } = this;
    if (direction === "z") {
      callbackFn(start.x, start.y);
    } else {
      let i = Math.min(start[direction], end[direction]);
      while (i <= Math.max(start[direction], end[direction])) {
        direction === "x" ? callbackFn(i, start.y) : callbackFn(start.x, i);
        i++;
      }
    }
  }

  canBeRemoveSafely(): boolean {
    return !this.abrove.some((v) => v.below.length === 1);
  }

  getNumberFalling(): number {
    const remove = new Set<Brick>([this]);
    const queue: Brick[] = [...this.abrove];
    let current = queue.shift();
    let falling = 0;
    while (current) {
      const isFalling = !current.below.some((v) => !remove.has(v));
      if (isFalling) {
        remove.add(current);
        queue.push(...current.abrove.filter((v) => !queue.includes(v)));
        falling++;
      }
      current = queue.shift();
    }
    return falling;
  }
}

export function solveDay22(input: string, part: 1 | 2) {
  const bricks = input
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line) => {
      const [x1, y1, z1, x2, y2, z2] = line.split(/[,~]/);
      return new Brick(new Point3D(+x1, +y1, +z1), new Point3D(+x2, +y2, +z2));
    });

  const heigth = Math.max(...bricks.flatMap((v) => [v.start.x, v.end.x])) + 1;
  const width = Math.max(...bricks.flatMap((v) => [v.start.y, v.end.y])) + 1;
  const hightestZ = Array.from({ length: heigth }, () =>
    Array.from<Brick | undefined>({ length: width })
  );

  bricks.sort(Brick.compareByLowerZ).forEach((brick) => {
    // Find bricks supporting
    let below: Brick[] = [];
    brick.foreachPoint2D((x, y) => {
      const brick = hightestZ[x][y];
      if (brick && !below.includes(brick)) {
        below.push(brick);
      }
    });
    const higherZ = Math.max(0, ...below.flatMap((v) => [v.start.z, v.end.z]));
    below = below.filter((v) => higherZ === Math.max(v.start.z, v.end.z));

    // Mark shape below and abrove
    brick.below = below;
    below.forEach((v) => v.abrove.push(brick));

    // Drop brick
    const height = Math.abs(brick.start.z - brick.end.z);
    brick.start.z = higherZ + 1;
    brick.end.z = brick.start.z + height;
    brick.foreachPoint2D((x, y) => (hightestZ[x][y] = brick));
  });

  return part === 1
    ? bricks.filter((v) => v.canBeRemoveSafely()).length
    : bricks.reduce((sum, v) => sum + v.getNumberFalling(), 0);
}
