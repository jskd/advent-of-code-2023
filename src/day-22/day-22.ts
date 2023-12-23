class Rectangle {
  bellow: Rectangle[] = [];
  abrove: Rectangle[] = [];

  constructor(
    readonly start: Point3D,
    readonly end: Point3D
  ) {}

  static compareByLowerZ(a: Rectangle, b: Rectangle): number {
    const aZ = Math.min(a.start.z, a.end.z);
    const bZ = Math.min(b.start.z, b.end.z);
    return aZ > bZ ? 1 : aZ < bZ ? -1 : 0;
  }
}
const coordinateNames = ["x", "y", "z"] as const;
type CordoneNames = (typeof coordinateNames)[number];

class Point3D implements Record<CordoneNames, number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public z: number
  ) {}
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
  const hightestZ = Array.from({ length: heigth }, () =>
    Array.from({ length: width })
  );

  sharps.forEach((sharp) => {
    const direction =
      coordinateNames.find((v) => sharp.start[v] != sharp.end[v]) ?? "z";

    let bellow = [];

    if (direction === "z") {
      bellow.push(hightestZ[sharp.start.x][sharp.start.y]);
    } else {
      const start = Math.min(sharp.start[direction], sharp.end[direction]);
      const end = Math.max(sharp.end[direction], sharp.end[direction]);
      for (let i = start; i <= end; i++) {
        if (direction === "x") {
          bellow.push(hightestZ[i][sharp.start.y]);
        } else {
          bellow.push(hightestZ[sharp.start.x][i]);
        }
      }
    }

    bellow = bellow.filter((item): item is Rectangle => !!item);
    const higestZ = bellow.reduce((z, v) => Math.max(z, v.start.z, v.end.z), 0);
    sharp.bellow = bellow
      .filter((v) => higestZ === Math.max(v.start.z, v.end.z))
      .filter((value, index, array) => array.indexOf(value) === index);
    sharp.bellow.forEach((v) => v.abrove.push(sharp));

    if (direction === "x" || direction === "y") {
      sharp.end.z = higestZ + 1;
      sharp.start.z = higestZ + 1;

      const start = Math.min(sharp.start[direction], sharp.end[direction]);
      const end = Math.max(sharp.start[direction], sharp.end[direction]);
      for (let i = start; i <= end; i++) {
        if (direction === "x") {
          hightestZ[i][sharp.start.y] = sharp;
        } else if (direction === "y") {
          hightestZ[sharp.start.x][i] = sharp;
        }
      }
    } else {
      const heigt = Math.abs(sharp.start.z - sharp.end.z);
      sharp.start.z = higestZ + 1;
      sharp.end.z = sharp.start.z + heigt;

      hightestZ[sharp.start.x][sharp.start.y] = sharp;
    }
  });

  const notRemovableSefely = sharps
    .flatMap(({ bellow }) => (bellow.length === 1 ? bellow[0] : []))
    .filter((value, index, array) => array.indexOf(value) === index);

  if (part === 1) {
    return sharps.length - notRemovableSefely.length;
  }

  return notRemovableSefely.reduce((acc, v) => {
    const remove = new Set<Rectangle>([v]);
    let queue: Rectangle[] = [...v.abrove];
    let current = queue.shift();
    let numberFall = acc;

    while (current) {
      const isFalling = !current.bellow.some((v) => !remove.has(v));
      if (isFalling) {
        if (!remove.has(current)) {
          remove.add(current);
        }
        queue.push(...current.abrove);

        queue = queue.filter(
          (value, index, array) => array.indexOf(value) === index
        );

        numberFall++;
      }
      current = queue.shift();
    }

    return numberFall;
  }, 0);
}
