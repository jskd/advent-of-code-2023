import memoizee from "memoizee";

export type NodeType = "#" | "O" | ".";
type Direction = "north" | "east" | "west" | "south";

export const tiltLine = memoizee(
  (nodes: NodeType[], reverse: boolean) => {
    const result: NodeType[] = Array<NodeType>(nodes.length).fill(".");
    const increment = reverse ? -1 : 1;
    let start = reverse ? nodes.length - 1 : 0;
    for (let i = start; i > -1 && i < nodes.length; i += increment) {
      if (nodes[i] === "#") {
        result[i] = "#";
        start = i + increment;
      } else if (nodes[i] === "O") {
        result[start] = "O";
        start += increment;
      }
    }
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

function tilt(nodes: NodeType[][], direction: Direction) {
  const clockTurn = direction === "north" || direction === "south";
  const reverse = direction === "south" || direction === "east";
  nodes = clockTurn ? turnClockwise(nodes) : nodes;
  nodes = nodes.map((line) => tiltLine(line, reverse));
  return clockTurn ? turnCounterClockwise(nodes) : nodes;
}

function getSumLoad(nodes: NodeType[][]) {
  return nodes.reduce(
    (sum, line, index) =>
      line.reduce(
        (sum, node) => sum + (node === "O" ? nodes.length - index : 0),
        sum
      ),
    0
  );
}

function tiltOneCycle(nodes: NodeType[][]) {
  nodes = tilt(nodes, "north");
  nodes = tilt(nodes, "west");
  nodes = tilt(nodes, "south");
  return tilt(nodes, "east");
}

function hash(nodes: NodeType[][]) {
  return nodes.flat().join("");
  /*return nodes
    .flatMap((line) => [
      ...line.map((v) => (v === "#" ? 3 : v === "O" ? 2 : 1)),
      0,
    ])
    .reduce((acc, v) => (acc << 2) + v, 0);*/
}

function tiltMultipleCycle(nodes: NodeType[][], cycle: number) {
  const gridSeen = new Map<string, number>();
  for (let i = 0; i < cycle; i++) {
    nodes = tiltOneCycle(nodes);
    const loop = gridSeen.get(hash(nodes));
    if (!loop) {
      gridSeen.set(hash(nodes), i);
    } else {
      const remainingCycle = (cycle - i - 1) % (i - loop);
      for (let i = 0; i < remainingCycle; i++) {
        nodes = tiltOneCycle(nodes);
      }
      return nodes;
    }
  }
  return nodes;
}

export class Day14Part1 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split("").map((value) => value as NodeType));
    return getSumLoad(tilt(nodes, "north"));
  }
}

export class Day14Part2 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => line.split("").map((value) => value as NodeType));
    return getSumLoad(tiltMultipleCycle(nodes, 1000000000));
  }
}
