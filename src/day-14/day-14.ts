import memoizee from "memoizee";

type NodeType = "#" | "O" | ".";

const tiltLine = memoizee(
  (nodes: NodeType[], reverse = false) => {
    const result: NodeType[] = Array<NodeType>(nodes.length).fill(".");
    const incrementation = reverse ? -1 : 1;
    let nextPlacement = reverse ? nodes.length - 1 : 0;
    nodes.forEach((node, idx) => {
      if (node === "#") {
        result[idx] = "#";
        nextPlacement = idx + incrementation;
      } else if (node === "O") {
        result[nextPlacement] = "O";
        nextPlacement += incrementation;
      }
    });
    return result;
  },
  {
    primitive: true,
  }
);

function turnClockwise(nodes: NodeType[][]) {
  return nodes[0].map((_, index) =>
    nodes.map((row) => row[row.length - 1 - index])
  );
}

function turnCounterClockwise(nodes: NodeType[][]) {
  return nodes[0].map((_, index) => nodes.map((row) => row[index]).reverse());
}

function getSumLoad(nodes: NodeType[][]) {
  let matrix = turnClockwise(nodes).map((l) => tiltLine(l));
  matrix = turnCounterClockwise(matrix);

  return matrix.reduce(
    (sum, line, index) =>
      line.reduce(
        (sum, node) => sum + (node === "O" ? matrix.length - index : 0),
        sum
      ),
    0
  );
}

export class Day14Part1 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .map((line) => line.split("").map((value) => value as NodeType));
    return getSumLoad(nodes);
  }
}

/*export class Day14Part2 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .flatMap((line, x) =>
        line.split("").map((value, y) => new Node(x, y, value as NodeType))
      );
    return new Grid(nodes).getSumLoadPart2();
  }
}*/
