const coordinateNames = ["x", "y", "z"] as const;
type CordoneNames = (typeof coordinateNames)[number];

class Point3D implements Record<CordoneNames, number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public z: number
  ) {}
}

class Rectangle {
  bellow: Rectangle[] = [];
  abrove: Rectangle[] = [];
  direction: CordoneNames;

  constructor(
    readonly start: Point3D,
    readonly end: Point3D
  ) {
    this.direction = coordinateNames.find((v) => start[v] != end[v]) ?? "z";
  }

  static compareByLowerZ(a: Rectangle, b: Rectangle): number {
    const aZ = Math.min(a.start.z, a.end.z);
    const bZ = Math.min(b.start.z, b.end.z);
    return aZ > bZ ? 1 : aZ < bZ ? -1 : 0;
  }

  getNumberFalling(): number {
    const remove = new Set<Rectangle>([this]);
    const queue: Rectangle[] = [...this.abrove];
    let current = queue.shift();
    let falling = 0;
    while (current) {
      const isFalling = !current.bellow.some((v) => !remove.has(v));
      if (isFalling) {
        remove.add(current);
        queue.push(...current.abrove.filter((v) => !queue.includes(v)));
        falling++;
      }
      current = queue.shift();
    }
    return falling;
  }

  foreachPoint2D(callbackFn: (x: number, y: number) => void) {
    const { start, end, direction } = this;
    if (direction === "z") {
      callbackFn(this.start.x, this.start.y);
      return;
    }

    let i = Math.min(start[direction], end[direction]);
    while (i <= Math.max(start[direction], end[direction])) {
      if (direction === "x") {
        callbackFn(i, this.start.y);
      } else {
        callbackFn(this.start.x, i);
      }
      i++;
    }
  }
}

export function solveDay22(input: string, part: 1 | 2) {
  const sharps = input
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line) => {
      const [x1, y1, z1, x2, y2, z2] = line.split(/[,~]/);
      return new Rectangle(
        new Point3D(+x1, +y1, +z1),
        new Point3D(+x2, +y2, +z2)
      );
    })
    .sort(Rectangle.compareByLowerZ);

  const heigth = Math.max(...sharps.flatMap((v) => [v.start.x, v.end.x])) + 1;
  const width = Math.max(...sharps.flatMap((v) => [v.start.y, v.end.y])) + 1;
  const hightestZ: (Rectangle | undefined)[][] = Array.from(
    { length: heigth },
    () => Array.from({ length: width })
  );

  sharps.forEach((sharp) => {
    const bellow: Rectangle[] = [];
    sharp.foreachPoint2D((x, y) => {
      const bal = hightestZ[x][y];
      if (bal === undefined) return;
      if (bellow.includes(bal)) return;
      bellow.push(bal);
    });

    const higestZ = bellow.reduce((z, v) => Math.max(z, v.start.z, v.end.z), 0);
    sharp.bellow = bellow.filter(
      (v) => higestZ === Math.max(v.start.z, v.end.z)
    );
    sharp.bellow.forEach((v) => v.abrove.push(sharp));

    const height = Math.abs(sharp.start.z - sharp.end.z);
    sharp.start.z = higestZ + 1;
    sharp.end.z = sharp.start.z + height;
    sharp.foreachPoint2D((x, y) => (hightestZ[x][y] = sharp));
  });

  return part === 1
    ? sharps.filter((v) => v.getNumberFalling() === 0).length
    : sharps.reduce((sum, v) => sum + v.getNumberFalling(), 0);
}
