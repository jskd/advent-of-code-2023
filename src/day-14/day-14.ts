export type NodeType = "#" | "O" | ".";
export type Direction = "north" | "east" | "west" | "south";

export function tiltOneLine(nodes: NodeType[], reverse: boolean) {
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
}

export function tiltMultipleLine(nodes: NodeType[][], direction: Direction) {
  const turnCounterClockwise = (nodes: NodeType[][]) =>
    nodes[0].map((_, index) => nodes.map((row) => row[index]).reverse());
  const turnClockwise = (nodes: NodeType[][]) =>
    nodes[0].map((_, index) => nodes.map((row) => row[row.length - 1 - index]));

  const clockTurn = direction === "north" || direction === "south";
  const reverse = direction === "south" || direction === "east";
  nodes = clockTurn ? turnClockwise(nodes) : nodes;
  nodes = nodes.map((line) => tiltOneLine(line, reverse));
  return clockTurn ? turnCounterClockwise(nodes) : nodes;
}

function tiltOneCycle(nodes: NodeType[][]) {
  nodes = tiltMultipleLine(nodes, "north");
  nodes = tiltMultipleLine(nodes, "west");
  nodes = tiltMultipleLine(nodes, "south");
  return tiltMultipleLine(nodes, "east");
}

function tiltMultipleCycle(nodes: NodeType[][], cycle: number) {
  const hash = (nodes: NodeType[][]) => nodes.flat().join();
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

export function solveDay14Part1(input: string): number {
  const nodes = input
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line) => line.split("").map((value) => value as NodeType));
  return getSumLoad(tiltMultipleLine(nodes, "north"));
}

export function solveDay14Part2(input: string): number {
  const nodes = input
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line) => line.split("").map((value) => value as NodeType));
  return getSumLoad(tiltMultipleCycle(nodes, 1000000000));
}
