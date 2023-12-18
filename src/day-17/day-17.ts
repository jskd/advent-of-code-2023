type Direction = "vertical" | "horizontal";
function toggleDirection(oriantation: Direction) {
  return oriantation === "horizontal" ? "vertical" : "horizontal";
}

class Block {
  visitedOn = { vertical: false, horizontal: false };
  heatOn: Record<Direction, number> = {
    vertical: Number.MAX_SAFE_INTEGER,
    horizontal: Number.MAX_SAFE_INTEGER,
  };

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: number
  ) {}
}

class Graph {
  queue: { direction: Direction; block: Block }[] = [];

  constructor(
    readonly tiles: Block[][],
    readonly part: "1" | "2" = "1"
  ) {}

  getNeighbor(
    { x, y }: Block,
    direction: Direction
  ): { heat: number; block: Block; direction: Direction }[] {
    return (
      this.part === "2"
        ? [
            [-4, -5, -6, -7, -8, -9, -10], // Backward
            [4, 5, 6, 7, 8, 9, 10], //Forward
          ]
        : [
            [-1, -2, -3], // Backward
            [1, 2, 3], //Forward
          ]
    ).flatMap((offsets) => {
      let travelHeat = 0;
      // Initial value of travel heat for part 2
      for (let i = 1; i < Math.abs(offsets[0]); i++) {
        const index = offsets[0] > 0 ? i : i * -1;
        if (direction === "horizontal" && x + index in this.tiles) {
          travelHeat += this.tiles[x + index][y].value;
        } else if (direction === "vertical" && y + index in this.tiles[0]) {
          travelHeat += this.tiles[x][y + index].value;
        }
      }
      return offsets.flatMap((offset) => {
        let block = undefined;
        if (direction === "horizontal" && x + offset in this.tiles) {
          block = this.tiles[x + offset][y]; // Move verticaly
        } else if (direction === "vertical" && y + offset in this.tiles[0]) {
          block = this.tiles[x][y + offset]; // Move horizontaly
        } else {
          return [];
        }
        travelHeat += block.value;
        return [
          {
            heat: travelHeat + this.tiles[x][y].heatOn[direction],
            block: block,
            direction: toggleDirection(direction),
          },
        ];
      });
    });
  }

  initQueue(): void {
    this.queue = [
      {
        direction: "vertical" as Direction,
        block: this.tiles[0][0],
      },
      {
        direction: "horizontal" as Direction,
        block: this.tiles[0][0],
      },
    ];
  }

  getMinimum(): { direction: Direction; block: Block } | undefined {
    if (!this.queue.length) {
      return undefined;
    }
    let minIndex = 0;
    let minHeat = Number.MAX_SAFE_INTEGER;
    this.queue.forEach(({ direction, block }, index) => {
      if (block.heatOn[direction] < minHeat) {
        minIndex = index;
        minHeat = block.heatOn[direction];
      }
    });
    const [minimum] = this.queue.splice(minIndex, 1);
    return minimum;
  }

  getShortestPaths() {
    this.tiles[0][0].heatOn = { horizontal: 0, vertical: 0 };
    this.initQueue();
    let current = this.queue.shift();
    while (current) {
      this.getNeighbor(current.block, current.direction).forEach(
        ({ heat, direction, block }) => {
          if (heat < block.heatOn[direction]) {
            if (block.heatOn[direction] === Number.MAX_SAFE_INTEGER) {
              this.queue.push({ direction: direction, block: block });
            }
            block.heatOn[direction] = heat;
          }
        }
      );
      current.block.visitedOn[current.direction] = true;
      current = this.getMinimum();
    }
    const { heatOn: target } = this.tiles.at(-1)!.at(-1)!;
    return Math.min(target.horizontal, target.vertical);
  }
}

export class Day17 {
  static solve(input: string, part: "1" | "2"): number {
    const tiles = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line, x) =>
        line.split("").map((value, y) => new Block(x, y, +value))
      );
    const graph = new Graph(tiles, part);
    return graph.getShortestPaths();
  }
}
