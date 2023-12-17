type Direction = "left" | "right" | "up" | "down";
type TileType = "." | "/" | "\\" | "|" | "-";
const mapping: Record<TileType, Record<Direction, Direction[]>> = {
  ".": {
    left: ["left"],
    right: ["right"],
    up: ["up"],
    down: ["down"],
  },
  "/": {
    left: ["down"],
    right: ["up"],
    up: ["right"],
    down: ["left"],
  },
  "\\": {
    left: ["up"],
    right: ["down"],
    up: ["left"],
    down: ["right"],
  },
  "|": {
    left: ["up", "down"],
    right: ["up", "down"],
    up: ["up"],
    down: ["down"],
  },
  "-": {
    left: ["left"],
    right: ["right"],
    up: ["left", "right"],
    down: ["left", "right"],
  },
};

class Tile {
  isTravelFrom: Record<Direction, boolean> = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  get isExplored(): boolean {
    return Object.values(this.isTravelFrom).some(Boolean);
  }

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: TileType
  ) {}

  getNextDirection(source: Direction): Direction[] {
    return mapping[this.value][source];
  }

  resetMarking() {
    Object.keys(this.isTravelFrom).forEach((key) => {
      this.isTravelFrom[key as Direction] = false;
    });
  }
}

class Graph {
  constructor(readonly tiles: Tile[][]) {}

  countTopLeftTravel() {
    return this.countTravel(0, 0, "right");
  }

  countBestTravel() {
    let max = 0;
    for (let x = 0; x < this.tiles.length; x++) {
      max = Math.max(this.countTravel(x, 0, "right"), max);
      max = Math.max(this.countTravel(x, -1, "left"), max);
    }
    for (let y = 0; y < this.tiles[0].length; y++) {
      max = Math.max(this.countTravel(0, y, "down"), max);
      max = Math.max(this.countTravel(-1, y, "up"), max);
    }
    return max;
  }

  countTravel(x: number, y: number, dir: Direction) {
    this.tiles.flat().forEach((t) => t.resetMarking());
    const source = this.tiles.at(x)?.at(y);
    if (!source) throw Error("Tile not found");
    this.markTravel(source, dir);
    return this.tiles.flat().filter((v) => v.isExplored).length;
  }

  getNeighbor(x: number, y: number, direction: Direction): Tile | undefined {
    if (direction === "left") {
      y--;
    } else if (direction === "right") {
      y++;
    } else if (direction === "up") {
      x--;
    } else if (direction === "down") {
      x++;
    }
    return this.tiles[x] ? this.tiles[x][y] : undefined;
  }

  markTravel(source: Tile, direction: Direction) {
    const queue = [{ source: source, direction: direction }];
    let current = queue.shift();
    while (current) {
      const { direction, source } = current;
      if (!source.isTravelFrom[direction]) {
        source.isTravelFrom[direction] = true;
        source.getNextDirection(current.direction).forEach((nextDirection) => {
          const neighbor = this.getNeighbor(source.x, source.y, nextDirection);
          if (neighbor) {
            queue.push({ source: neighbor, direction: nextDirection });
          }
        });
      }
      current = queue.shift();
    }
  }
}

export class Day16 {
  static solve(input: string, part: "1" | "2"): number {
    const tiles = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line, x) =>
        line.split("").map((value, y) => new Tile(x, y, value as TileType))
      );
    const graph = new Graph(tiles);
    return part === "1" ? graph.countTopLeftTravel() : graph.countBestTravel();
  }
}
