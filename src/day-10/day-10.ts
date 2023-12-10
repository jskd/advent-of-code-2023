class Node {
  public neighbors: Node[] = [];
  public steps?: number;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: string
  ) {}
}

class Graph {
  startingNode: Node;

  constructor(public nodes: Node[][]) {
    const startingNode = this.nodes.flat().find((n) => n.value == "S");
    if (!startingNode) {
      throw Error("No starting");
    }
    this.startingNode = startingNode;
    this.markStepsFromStart();
  }

  getNode(x: number, y: number): Node | undefined {
    return this.nodes.at(x)?.at(y);
  }

  markNeighbors(node: Node): void {
    const connectUp = new Set<string>(["|", "L", "J", "S"]);
    const connectDown = new Set<string>(["|", "7", "F", "S"]);
    const connectRight = new Set<string>(["-", "L", "F", "S"]);
    const connectLeft = new Set<string>(["-", "J", "7", "S"]);
    const right = this.getNode(node.x, node.y + 1);
    if (right && connectRight.has(node.value) && connectLeft.has(right.value)) {
      node.neighbors.push(right);
      right.neighbors.push(node);
    }
    const down = this.getNode(node.x + 1, node.y);
    if (down && connectDown.has(node.value) && connectUp.has(down.value)) {
      node.neighbors.push(down);
      down.neighbors.push(node);
    }
  }

  markStepsFromStart() {
    this.nodes.flat().forEach((node) => this.markNeighbors(node));
    const queue = new Array<Node>(this.startingNode);
    this.startingNode.steps = 0;
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
