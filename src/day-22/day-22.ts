class Rectangle {
  supportedBy: Rectangle[] = [];
  support: Rectangle[] = [];

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
const xordoneNames = ["x", "y", "z"] as const;
type CordoneNames = (typeof xordoneNames)[number];

class Point3D implements Record<CordoneNames, number> {
  constructor(
    readonly x: number,
    readonly y: number,
    public z: number
  ) {}
}

export function solveDay22(input: string) {
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

  const heigth = sharps.reduce((x, v) => Math.max(v.end.x, v.start.x, x), 0);
  const width = sharps.reduce((y, v) => Math.max(v.end.y, v.start.y, y), 0);

  console.log(heigth, width);

  const hightestZ = Array.from({ length: heigth + 1 }, () =>
    Array.from({ length: width + 1 })
  );

  sharps.forEach((sharp) => {
    console.log(
      hightestZ.map((l) =>
        l.map((v) =>
          v instanceof Rectangle ? Math.max(v.start.z, v.end.z) : undefined
        )
      )
    );

    const oriantation =
      xordoneNames.find((v) => sharp.start[v] != sharp.end[v]) ?? "z";

    let SharpBelow = [];

    if (oriantation === "z") {
      SharpBelow.push(hightestZ[sharp.start.x][sharp.start.y]);
    } else {
      const start = Math.min(sharp.start[oriantation], sharp.end[oriantation]);
      const end = Math.max(sharp.end[oriantation], sharp.end[oriantation]);
      for (let i = start; i <= end; i++) {
        if (oriantation === "x") {
          SharpBelow.push(hightestZ[i][sharp.start.y]);
        } else {
          SharpBelow.push(hightestZ[sharp.start.x][i]);
        }
      }
    }

    SharpBelow = SharpBelow.filter((item): item is Rectangle => !!item);

    const higestZ = SharpBelow.reduce(
      (higestZ, { start, end }) => Math.max(higestZ, start.z, end.z),
      0
    );

    sharp.supportedBy = [
      ...new Set(
        SharpBelow.filter(
          ({ start, end }) => higestZ === Math.max(start.z, end.z)
        )
      ),
    ];
    sharp.supportedBy.forEach((v) => v.support.push(sharp));

    if (oriantation === "x" || oriantation === "y") {
      sharp.end.z = higestZ + 1;
      sharp.start.z = higestZ + 1;

      const start = Math.min(sharp.start[oriantation], sharp.end[oriantation]);
      const end = Math.max(sharp.start[oriantation], sharp.end[oriantation]);
      for (let i = start; i <= end; i++) {
        if (oriantation === "x") {
          hightestZ[i][sharp.start.y] = sharp;
        } else if (oriantation === "y") {
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

  console.log(
    hightestZ.map((l) =>
      l.map((v) => (v instanceof Rectangle ? Math.max(v.start.z, v.end.z) : 0))
    )
  );
  const notRemovable =
    sharps.length -
    [
      ...new Set(
        sharps
          .filter(({ supportedBy }) => supportedBy.length === 1)
          .flatMap(({ supportedBy }) => supportedBy)
      ),
    ].length;

  return notRemovable;
}
