type Direction = "left" | "right" | "up" | "down";
type TileType = "." | "/" | "\\" | "|" | "-";
class Tile {
  isExploredFrom: Record<Direction, boolean> = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  get isExplored(): boolean {
    return Object.values(this.isExploredFrom).some(Boolean);
  }

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: TileType
  ) {}

  getNextDirection(source: Direction): Direction[] {
    switch (this.value) {
      case "/":
        if (source === "down") return ["left"];
        else if (source === "left") return ["down"];
        else if (source === "right") return ["up"];
        else if (source === "up") return ["right"];
        break;
      case "\\":
        if (source === "down") return ["right"];
        else if (source === "left") return ["up"];
        else if (source === "right") return ["down"];
        else if (source === "up") return ["left"];
        break;
      case "-":
        return source === "up" || source === "down"
          ? ["left", "right"]
          : [source];
      case "|":
        return source === "left" || source === "right"
          ? ["up", "down"]
          : [source];
    }
    return [source];
  }
}

class Graph {
  constructor(readonly tiles: Tile[][]) {}

  getNumberOfInside() {
    return this.getNumber(this.tiles[0][0], "right");
  }

  getNumber(dst: Tile, dir: Direction) {
    this.tiles.flat().forEach(
      (t) =>
        (t.isExploredFrom = {
          left: false,
          right: false,
          up: false,
          down: false,
        })
    );
    this.travel(dst, dir);
    return this.tiles
      .flat()
      .filter((v) => Object.values(v.isExploredFrom).some(Boolean)).length;
  }

  getBestStart() {
    let max = 0;
    let lines = this.tiles.map((_, index) => index);
    max = lines.reduce(
      (acc, i) =>
        (acc = Math.max(acc, this.getNumber(this.tiles[i][0], "right"), max))
    );
    max = lines.reduce(
      (acc, i) =>
        (acc = Math.max(
          acc,
          this.getNumber(this.tiles[i].at(-1)!, "left"),
          max
        ))
    );

    lines = this.tiles[1].map((_, index) => index);

    max = lines.reduce(
      (acc, i) =>
        (acc = Math.max(acc, this.getNumber(this.tiles[0][i], "down"), max))
    );
    max = lines.reduce(
      (acc, i) =>
        (acc = Math.max(acc, this.getNumber(this.tiles.at(-1)![i], "up"), max))
    );

    return max;
  }

  travel(dst: Tile, dir: Direction) {
    const queue: {
      dst: Tile;
      dir: Direction;
    }[] = [{ dst: dst, dir: dir }];
    let current = queue.shift();

    while (current) {
      if (!current.dst.isExploredFrom[current.dir]) {
        current.dst.isExploredFrom[current.dir] = true;
        for (const pouet of current.dst.getNextDirection(current.dir)) {
          let destination = undefined;
          if (pouet === "left" && this.tiles[current.dst.x]) {
            destination = this.tiles[current.dst.x][current.dst.y - 1];
          } else if (pouet === "right" && this.tiles[current.dst.x]) {
            destination = this.tiles[current.dst.x][current.dst.y + 1];
          } else if (pouet === "up" && this.tiles[current.dst.x - 1]) {
            destination = this.tiles[current.dst.x - 1][current.dst.y];
          } else if (pouet === "down" && this.tiles[current.dst.x + 1]) {
            destination = this.tiles[current.dst.x + 1][current.dst.y];
          }
          if (destination) {
            queue.push({ dst: destination, dir: pouet });
          }
        }
      }
      current = queue.shift();
    }
  }
}

export class Day16 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line, x) =>
        line.split("").map((value, y) => new Tile(x, y, value as TileType))
      );
    return new Graph(nodes).getBestStart();
  }
}
