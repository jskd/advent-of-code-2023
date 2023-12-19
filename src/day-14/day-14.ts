type NodeType = "#" | "O" | ".";

class Node {
  constructor(
    public x: number,
    public y: number,
    readonly value: NodeType
  ) {}
}

class Grid {
  constructor(readonly nodes: Node[]) {}

  tiltNorth() {
    const columns: Node[][] = [];
    this.nodes.forEach((node) => {
      const column = (columns[node.y] ??= []);
      column.push(node);
    });

    columns.forEach((column) => {
      let nextPlacement = 0;
      column.forEach((node) => {
        if (node.value === "#") {
          nextPlacement = node.x + 1;
        } else if (node.value === "O") {
          node.x = nextPlacement;
          nextPlacement++;
        }
      });
    });
  }

  getSumLoad() {
    this.tiltNorth();
    const maxX = this.nodes.reduce((acc, { x }) => Math.max(acc, x), 0);

    return this.nodes.reduce((acc, node) => {
      if (node.value === "O") {
        return acc + (maxX - node.x + 1);
      }
      return acc;
    }, 0);
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
