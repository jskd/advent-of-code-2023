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

function hash(nodes: NodeType[][]) {
  return nodes.flat().join("");
}

function tiltCycle(nodes: NodeType[][]) {
  const currentpouet = new Map<string, number>();
  const maxCycles = 1000000000;
  for (let i = 0; i < maxCycles; i++) {
    nodes = tilt(nodes, "north");
    nodes = tilt(nodes, "west");
    nodes = tilt(nodes, "south");
    nodes = tilt(nodes, "east");

    const loop = currentpouet.get(hash(nodes));
    if (!loop) {
      currentpouet.set(hash(nodes), i);
    } else {
      const remainingCycle = (maxCycles - 1 - i) % (i - loop);
      for (let i = 0; i < remainingCycle; i++) {
        nodes = tilt(nodes, "north");
        nodes = tilt(nodes, "west");
        nodes = tilt(nodes, "south");
        nodes = tilt(nodes, "east");
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

    return getSumLoad(tiltCycle(nodes));
  }
}
