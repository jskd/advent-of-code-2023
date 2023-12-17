type Oriantation = "vertical" | "horizontal";

function togleOriantation(oriantation: Oriantation) {
  return oriantation === "horizontal" ? "vertical" : "horizontal";
}

class Block {
  heatOn: Record<Oriantation, number> = {
    vertical: Number.MAX_SAFE_INTEGER,
    horizontal: Number.MAX_SAFE_INTEGER,
  };

  visitedOn = {
    vertical: false,
    horizontal: false,
  };

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: number
  ) {}
}

class Graph {
  constructor(
    readonly tiles: Block[][],
    readonly ultra = false
  ) {}

  getNeighbor(
    x: number,
    y: number,
    oriantation: Oriantation
  ): { heat: number; block: Block; oriantation: Oriantation }[] {
    return (
      this.ultra
        ? [
            [-4, -5, -6, -7, -8, -9, -10], // Backward
            [4, 5, 6, 7, 8, 9, 10], //Forward
          ]
        : [
            [-1, -2, -3], // Backward
            [1, 2, 3], //Forward
          ]
    ).flatMap((offsets) => {
      let heat = 0;
      let block = undefined;
      if (offsets[0] > 0) {
        for (let i = 1; i < offsets[0]; i++) {
          if (oriantation === "horizontal" && x + i in this.tiles) {
            heat += this.tiles[x + i][y].value;
          } else if (oriantation === "vertical" && y + i in this.tiles[0]) {
            heat += this.tiles[x][y + i].value;
          }
        }
      } else {
        for (let i = -1; i > offsets[0]; i--) {
          if (oriantation === "horizontal" && x + i in this.tiles) {
            heat += this.tiles[x + i][y].value;
          } else if (oriantation === "vertical" && y + i in this.tiles[0]) {
            heat += this.tiles[x][y + i].value;
          }
        }
      }
      return offsets.flatMap((offset) => {
        if (oriantation === "horizontal" && x + offset in this.tiles) {
          block = this.tiles[x + offset][y]; // Move verticaly
        } else if (oriantation === "vertical" && y + offset in this.tiles[0]) {
          block = this.tiles[x][y + offset]; // Move horizontaly
        } else {
          return [];
        }
        heat += block.value;
        if (block.visitedOn[togleOriantation(oriantation)]) {
          return [];
        }
        return [
          {
            heat: this.tiles[x][y].heatOn[oriantation] + heat,
            block: block,
            oriantation: togleOriantation(oriantation),
          },
        ];
      });
    });
  }

  getMinMin(): { oriantation: Oriantation; block: Block } | undefined {
    const tiles = this.tiles
      .flat()
      .filter(({ visitedOn }) => !visitedOn.horizontal || !visitedOn.vertical);
    if (tiles.length === 0) {
      return undefined;
    }

    let min = {
      oriantation: (tiles[0].visitedOn.horizontal
        ? "vertical"
        : "horizontal") as Oriantation,
      block: tiles[0],
    };
    for (const tile of tiles) {
      if (
        !tile.visitedOn.horizontal &&
        tile.heatOn.horizontal < min.block.heatOn[min.oriantation]
      ) {
        min = { oriantation: "horizontal" as Oriantation, block: tile };
      }
      if (
        !tile.visitedOn.vertical &&
        tile.heatOn.vertical < min.block.heatOn[min.oriantation]
      ) {
        min = { oriantation: "vertical" as Oriantation, block: tile };
      }
    }
    return min;
  }

  markPath(x: number, y: number) {
    const source = this.tiles.at(x)?.at(y);
    if (!source) throw "source not found";

    let current: { oriantation: Oriantation; block: Block } | undefined = {
      oriantation: "horizontal" as Oriantation,
      block: source,
    };

    current.block.heatOn = {
      horizontal: 0,
      vertical: 0,
    };

    while (current) {
      this.getNeighbor(
        current.block.x,
        current.block.y,
        current.oriantation
      ).forEach(({ heat, oriantation, block }) => {
        if (heat < block.heatOn[oriantation]) {
          block.heatOn[oriantation] = heat;
        }
      });

      current.block.visitedOn[current.oriantation] = true;
      current = this.getMinMin();
    }

    return Math.min(
      this.tiles.at(-1)!.at(-1)!.heatOn.horizontal,
      this.tiles.at(-1)!.at(-1)!.heatOn.vertical
    );
  }
}

export class Day17 {
  static solve(input: string, ultra = false): number {
    const tiles = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line, x) =>
        line.split("").map((value, y) => new Block(x, y, +value))
      );
    const graph = new Graph(tiles, ultra);
    return graph.markPath(0, 0);
  }
}
