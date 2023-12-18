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

  getShortestPaths() {
    this.tiles[0][0].heatOn = { horizontal: 0, vertical: 0 };
    const queue = this.tiles.flat().flatMap((tile) => [
      {
        oriantation: "vertical" as Oriantation,
        block: tile,
      },
      {
        oriantation: "horizontal" as Oriantation,
        block: tile,
      },
    ]);

    const getMin = ():
      | { oriantation: Oriantation; block: Block }
      | undefined => {
      if (!queue.length) {
        return undefined;
      }
      let minIndex = 0;
      let heat = queue[0].block.heatOn[queue[0].oriantation];

      queue.forEach(({ oriantation, block }, index) => {
        if (
          (oriantation === "horizontal" && block.heatOn.horizontal < heat) ||
          (oriantation === "vertical" && block.heatOn.vertical < heat)
        ) {
          minIndex = index;
          heat = block.heatOn[oriantation];
        }
      });
      return queue.splice(minIndex, 1)[0];
    };

    let current = getMin();
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
      current = getMin();
    }
    const { heatOn: target } = this.tiles.at(-1)!.at(-1)!;
    return Math.min(target.horizontal, target.vertical);
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
    return graph.getShortestPaths();
  }
}
