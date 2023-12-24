type TileValues = "." | "#" | ">" | "v";

class Node {}

class Tile {
  public node?: Node;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: TileValues
  ) {}
}

export function solveDay22(input: string, part: 1 | 2) {
  const nodes = input
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line, x) =>
      line.split("").map((v, y) => new Tile(x, y, v as TileValues))
    );
}
