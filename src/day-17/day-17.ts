type Direction = "vertical" | "horizontal";
type QueueEntry = { block: Block; direction: Direction };
type NeighborEntry = QueueEntry & { heat: number };

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
  readonly queue: QueueEntry[] = [];

  constructor(
    readonly blocks: Block[][],
    readonly part: "1" | "2" = "1"
  ) {}

  getNeighborsOneDirection(
    block: Block,
    direction: Direction,
    backward: boolean
  ): NeighborEntry[] {
    const result: NeighborEntry[] = [];
    const minNeighbor = this.part === "1" ? 1 : 4;
    const maxNeighbor = this.part === "1" ? 4 : 11;
    const incrementX = direction === "horizontal" ? (backward ? -1 : 1) : 0;
    const incrementY = direction === "vertical" ? (backward ? -1 : 1) : 0;
    const { x, y } = block;
    let heat = block.heatOn[direction];
    let offsetX = incrementX;
    let offsetY = incrementY;
    while (Math.abs(offsetX) < maxNeighbor && Math.abs(offsetY) < maxNeighbor) {
      if (!(x + offsetX in this.blocks) || !(y + offsetY in this.blocks[x])) {
        break;
      }
      const neighbor = this.blocks[x + offsetX][y + offsetY];
      heat += neighbor.value;
      if (
        !neighbor.visitedOn[direction] &&
        (Math.abs(offsetX) >= minNeighbor || Math.abs(offsetY) >= minNeighbor)
      ) {
        result.push({
          heat: heat,
          block: neighbor,
          direction: toggleDirection(direction),
        });
      }
      offsetX += incrementX;
      offsetY += incrementY;
    }
    return result;
  }

  getAllNeighbors(block: Block, direction: Direction): NeighborEntry[] {
    return [
      ...this.getNeighborsOneDirection(block, direction, false),
      ...this.getNeighborsOneDirection(block, direction, true),
    ];
  }

  getMinimum(): QueueEntry | undefined {
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
    const target = this.blocks.at(-1)!.at(-1)!;
    this.blocks[0][0].heatOn = { horizontal: 0, vertical: 0 };
    this.queue.push(
      { direction: "vertical", block: this.blocks[0][0] },
      { direction: "horizontal", block: this.blocks[0][0] }
    );
    let current = this.queue.shift();
    while (current && current.block !== target) {
      this.getAllNeighbors(current.block, current.direction).forEach(
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
    const { horizontal, vertical } = target.heatOn;
    return Math.min(horizontal, vertical);
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
