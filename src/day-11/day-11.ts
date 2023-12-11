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

class NodeList {
  constructor(
    public nodes: Node[],
    expansionLength: number
  ) {
    this.expand("x", expansionLength);
    this.expand("y", expansionLength);
  }

  expand(position: Position, expansionLength: number) {
    const containNode = new Set<number>([]);
    const expensionMap = new Map<number, number>([]);

    let max = 0;
    this.nodes.forEach((node) => {
      containNode.add(node[position]);
      max = Math.max(max, node[position]);
    });

    let expension = 0;
    for (let index = 0; index <= max; index++) {
      if (!containNode.has(index)) {
        expension += expansionLength - 1;
      }
      expensionMap.set(index, expension);
    }

    this.nodes.forEach(
      (node) => (node[position] += expensionMap.get(node[position])!)
    );
  }

  getSumOfShortestPath() {
    return this.nodes.reduce(
      (acc, a, i, nodes) =>
        acc + nodes.slice(i + 1).reduce((acc, b) => acc + a.distance(b), 0),
      0
    );
  }
}

export class Day11 {
  static solve(input: string, expansionLength: number): number {
    const nodes = input
      .split(/[\r\n]+/)
      .flatMap((line, x) =>
        line
          .split("")
          .flatMap((char, y) => (char === "#" ? [new Node(x, y)] : []))
      );
    return new NodeList(nodes, expansionLength).getSumOfShortestPath();
  }
}
