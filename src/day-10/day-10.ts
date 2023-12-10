class Node {
  public neighbors: Node[] = [];
  public steps?: number;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: string
  ) {}

  static getNodeHash(x: number, y: number): number {
    return (x << 16) | y;
  }
}

class MapNode {
  nodes = new Map<number, Node>();
  startingNode?: Node;

  addNode(node: Node) {
    this.nodes.set(Node.getNodeHash(node.x, node.y), node);
    if (node.value === "S") {
      this.startingNode = node;
    }
  }

  getNode(x: number, y: number): Node | undefined {
    return this.nodes.get(Node.getNodeHash(x, y));
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

  markStepsFrom(node: Node) {
    this.nodes.forEach((node) => {
      this.markNeighbors(node);
      node.steps = undefined;
    });
    const queue = new Array<Node>(node);
    node.steps = 0;
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
    if (!this.startingNode) {
      throw Error("No starting");
    }
    this.markStepsFrom(this.startingNode);
    return [...this.nodes].reduce(
      (acc, [_, { steps }]) => Math.max(acc, steps ?? 0),
      0
    );
  }
}

export class Day10 {
  static solve(input: string): number {
    const graph = new MapNode();
    input.split(/[\r\n]+/).map((line, x) =>
      line
        .split("")
        .map((value, y) => new Node(x, y, value))
        .forEach((node) => graph.addNode(node))
    );
    return graph.getFarthestNodeStep();
  }
}
