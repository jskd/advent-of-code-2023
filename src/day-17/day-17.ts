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
  constructor(readonly tiles: Block[][]) {}

  getNeighbor(
    x: number,
    y: number,
    oriantation: Oriantation
  ): { heat: number; block: Block; oriantation: Oriantation }[] {
    return [
      [-1, -2, -3], // Backward
      [1, 2, 3], //Forward
    ].flatMap((offsets) => {
      let heat = 0;
      let block = undefined;
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

  getMinMin(): { oriantation: Oriantation; block: Block } | undefined {
    let min: { oriantation: Oriantation; block: Block } | undefined;
    for (const tile of this.tiles.flat()) {
      if (
        !tile.visitedOn.horizontal &&
        (!min || tile.heatOn.horizontal < min.block.heatOn[min.oriantation])
      ) {
        min = { oriantation: "horizontal" as Oriantation, block: tile };
      }

      if (
        !tile.visitedOn.vertical &&
        (!min || tile.heatOn.vertical < min.block.heatOn[min.oriantation])
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

export class Day16 {
  static solve(input: string): number {
    const tiles = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line, x) =>
        line.split("").map((value, y) => new Block(x, y, +value))
      );
    const graph = new Graph(tiles);
    return graph.markPath(0, 0);
  }
}
