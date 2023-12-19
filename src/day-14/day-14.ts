type NodeType = "#" | "O" | ".";

class Node {
  constructor(
    public x: number,
    public y: number,
    readonly value: NodeType
  ) {}
}

class Grid {
  readonly cols: Node[][] = [];

  constructor(readonly nodes: Node[]) {
    nodes.forEach((node) => {
      const cols = (this.cols[node.y] ??= []);
      cols.push(node);
    });

    this.cols.forEach((col) => {
      let placementAvailable = 0;
      col.forEach((node) => {
        if (node.value === "#") {
          placementAvailable = node.x + 1;
        } else if (node.value === "O") {
          node.x = placementAvailable;
          placementAvailable++;
        }
      });
    });
  }

  getSumLoad() {
    const maxX = this.nodes.reduce((acc, { x }) => Math.max(acc, x), 0);

    return this.cols.reduce(
      (sum, col) =>
        col.reduce((acc, node) => {
          if (node.value === "O") {
            return acc + (maxX - node.x + 1);
          }
          return acc;
        }, sum),
      0
    );
  }
}

export class Day14Part1 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .flatMap((line, x) =>
        line.split("").map((value, y) => new Node(x, y, value as NodeType))
      );
    return new Grid(nodes).getSumLoad();
  }
}
