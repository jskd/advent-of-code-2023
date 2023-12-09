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

  getNumberStep(start: string, targetEndsWith: string) {
    let step = 0;
    let current = this.nodes.get(start);
    if (!current) {
      throw new Error("Start node not found");
    }

    while (!current.value.endsWith(targetEndsWith)) {
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

function gcd(a: number, b: number): number {
  return a == 0 ? b : gcd(b % a, a);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export class Day8Part1 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const sequence = lines.shift()!;
    const nodes = lines.map((line) => new Node(line));
    const nodeSequence = new Graph(sequence, nodes);
    return nodeSequence.getNumberStep("AAA", "ZZZ");
  }
}

export class Day8Part2 {
  static solve(input: string): number {
    const lines = input.split(/[\r\n]+/).filter(Boolean);
    const sequence = lines.shift()!;
    const nodes = lines.map((line) => new Node(line));
    const nodeSequence = new Graph(sequence, nodes);

    return nodes
      .filter(({ value }) => value.endsWith("A"))
      .map(({ value }) => nodeSequence.getNumberStep(value, "Z"))
      .reduce((acc, v) => lcm(acc, v), 1);
  }
}
