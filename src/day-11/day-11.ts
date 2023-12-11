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
    expansionLenght: number
  ) {
    this.expand("x", expansionLenght);
    this.expand("y", expansionLenght);
  }

  expand(property: Position, expansionLenght: number) {
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
        expension = expension + expansionLenght - 1;
      }
      expensionMap.set(index, expension);
    }

    this.nodes.forEach(
      (node) => (node[property] += expensionMap.get(node[property])!)
    );
  }

  getSumOfShortestPath() {
    return this.nodes.reduce(
      (sum, a, i, nodes) =>
        sum + nodes.slice(i + 1).reduce((acc, b) => acc + a.distance(b), 0),
      0
    );
  }
}

export class Day11 {
  static solve(input: string, expansionLenght: number): number {
    const nodes = input
      .split(/[\r\n]+/)
      .flatMap((line, x) =>
        line
          .split("")
          .flatMap((char, y) => (char === "#" ? [new Node(x, y)] : []))
      );
    return new NodeList(nodes, expansionLenght).getSumOfShortestPath();
  }
}
