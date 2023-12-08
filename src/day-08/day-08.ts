export class Node {
  readonly value: string;
  readonly left: string;
  readonly right: string;

  constructor(line: string) {
    this.value = line.slice(0, 3);
    this.left = line.slice(7, 10);
    this.right = line.slice(12, 15);
  }
}

export class Graph {
  nodes = new Map<string, Node>();

  constructor(
    readonly sequence: string,
    nodes: Node[]
  ) {
    nodes.forEach((node) => this.nodes.set(node.value, node));
  }

  getNumberStep(start: string, targets: string[]) {
    let step = 0;
    let current = this.nodes.get(start);
    if (!current) {
      throw new Error("Start node not found");
    }

    while (!targets.includes(current.value)) {
      const instruction = this.sequence.charAt(step % this.sequence.length);
      current = this.nodes.get(
        instruction == "R" ? current.right : current.left
      );
      if (!current) {
        throw new Error("Next node not found");
      }
      step++;
    }
    return step;
  }
}

function gcd(a: number, b: number) {
  let temp = b;
  while (b !== 0) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

export class Day8Part1 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const sequence = lines.shift()!;
    const nodes = lines.map((line) => new Node(line));
    const nodeSequence = new Graph(sequence, nodes);
    return nodeSequence.getNumberStep("AAA", ["ZZZ"]);
  }
}

export class Day8Part2 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const sequence = lines.shift()!;
    const nodes = lines.map((line) => new Node(line));
    const nodeSequence = new Graph(sequence, nodes);

    const nodeValues = nodes.map(({ value }) => value);
    const starts = nodeValues.filter((v) => v.endsWith("A"));
    const targets = nodeValues.filter((v) => v.endsWith("Z"));

    return starts
      .map((start) => nodeSequence.getNumberStep(start, targets))
      .reduce((acc, v) => lcm(acc, v), 1);
  }
}
