class Node {
  steps?: number;
  neighbors: Node[] = [];

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: string
  ) {}
}

class Graph {
  start: Node;

  constructor(readonly nodes: Node[][]) {
    const start = this.nodes.flat().find(({ value }) => value === "S");
    if (!start) {
      throw Error("No start node");
    }
    this.start = start;
    this.markNeighbors();
    this.markSteps();
  }

  markNeighbors(): void {
    const pipeNorth = new Set<string>(["|", "L", "J", "S"]);
    const pipeSouth = new Set<string>(["|", "7", "F", "S"]);
    const pipeEast = new Set<string>(["-", "L", "F", "S"]);
    const pipeWest = new Set<string>(["-", "J", "7", "S"]);

    this.nodes.flat().forEach((node) => {
      const east = this.nodes.at(node.x)?.at(node.y + 1);
      if (east && pipeEast.has(node.value) && pipeWest.has(east.value)) {
        node.neighbors.push(east);
        east.neighbors.push(node);
      }
      const south = this.nodes.at(node.x + 1)?.at(node.y);
      if (south && pipeSouth.has(node.value) && pipeNorth.has(south.value)) {
        node.neighbors.push(south);
        south.neighbors.push(node);
      }
    });
  }

  markSteps(): void {
    const queue = new Array<Node>(this.start);
    this.start.steps = 0;
    for (let current = queue.shift(); current; current = queue.shift()) {
      for (const neighbor of current.neighbors) {
        if (neighbor.steps === undefined) {
          neighbor.steps = current.steps! + 1;
          queue.push(neighbor);
        }
      }
    }
  }

  getFarthestNodeStep(): number {
    return this.nodes
      .flat()
      .reduce((acc, { steps }) => Math.max(acc, steps ?? 0), 0);
  }
}

export class Day10 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .map((line, x) =>
        line.split("").map((value, y) => new Node(x, y, value))
      );
    return new Graph(nodes).getFarthestNodeStep();
  }
}
