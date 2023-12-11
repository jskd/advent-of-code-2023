type Position = "x" | "y";
type NodePosition = { [key in Position]: number };

class Node implements NodePosition {
  constructor(
    public x: number,
    public y: number
  ) {}

  distance({ x, y }: Node) {
    return Math.abs(this.x - x) + Math.abs(this.y - y);
  }
}

class Graph {
  constructor(public nodes: Node[]) {
    this.expand("x");
    this.expand("y");
  }

  expand(property: Position) {
    const containNode = new Set<number>([]);
    const expensionMap = new Map<number, number>([]);

    let max = 0;
    this.nodes.forEach((node) => {
      containNode.add(node[property]);
      max = Math.max(max, node[property]);
    });

    let expension = 0;
    for (let index = 0; index <= max; index++) {
      if (!containNode.has(index)) {
        expension++;
      }
      expensionMap.set(index, expension);
    }

    this.nodes.forEach(
      (node) => (node[property] += expensionMap.get(node[property])!)
    );
  }

  getSumOfShortestPath() {
    const nodes = [...this.nodes];
    let sum = 0;
    for (let current = nodes.shift(); current; current = nodes.shift()) {
      sum += nodes.reduce((acc, node) => acc + node.distance(current!), 0);
    }
    return sum;
  }
}

export class Day11 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .flatMap((line, x) =>
        line
          .split("")
          .flatMap((char, y) => (char === "#" ? [new Node(x, y)] : []))
      );
    return new Graph(nodes).getSumOfShortestPath();
  }
}
