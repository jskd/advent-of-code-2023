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
    return mapping[this.value][source];
  }

  resetMarking() {
    this.isExploredFrom = {
      left: false,
      right: false,
      up: false,
      down: false,
    };
  }
}

class Graph {
  constructor(readonly tiles: Tile[][]) {}

  getNumberFromTopRight() {
    return this.getNumber(0, 0, "right");
  }

  getBestStart() {
    let max = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      max = Math.max(this.getNumber(i, 0, "right"), max);
      max = Math.max(this.getNumber(i, -1, "left"), max);
    }
    for (let i = 0; i < this.tiles[0].length; i++) {
      max = Math.max(this.getNumber(0, i, "down"), max);
      max = Math.max(this.getNumber(-1, i, "up"), max);
    }
    return max;
  }

  getNumber(x: number, y: number, dir: Direction) {
    this.tiles.flat().forEach((t) => t.resetMarking());
    this.travel(x, y, dir);
    return this.tiles.flat().filter((v) => v.isExplored).length;
  }

  travel(x: number, y: number, direction: Direction) {
    const queue = [{ tile: this.tiles.at(x)!.at(y)!, direction: direction }];
    let current = queue.shift();

    while (current) {
      const { direction, tile } = current;
      if (!tile.isExploredFrom[direction]) {
        tile.isExploredFrom[direction] = true;
        tile.getNextDirection(current.direction).forEach((nextDirection) => {
          let destination = undefined;
          if (nextDirection === "left" && this.tiles[tile.x]) {
            destination = this.tiles[tile.x][tile.y - 1];
          } else if (nextDirection === "right" && this.tiles[tile.x]) {
            destination = this.tiles[tile.x][tile.y + 1];
          } else if (nextDirection === "up" && this.tiles[tile.x - 1]) {
            destination = this.tiles[tile.x - 1][tile.y];
          } else if (nextDirection === "down" && this.tiles[tile.x + 1]) {
            destination = this.tiles[tile.x + 1][tile.y];
          }
          if (destination) {
            queue.push({ tile: destination, direction: nextDirection });
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
    return part === "1" ? graph.getNumberFromTopRight() : graph.getBestStart();
  }
}
