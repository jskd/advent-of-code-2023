const pipeNorth = new Set<string>(["|", "L", "J", "S"]);
const pipeSouth = new Set<string>(["|", "7", "F", "S"]);
const pipeEast = new Set<string>(["-", "L", "F", "S"]);
const pipeWest = new Set<string>(["-", "J", "7", "S"]);

class Node {
  public neighbors: Node[] = [];
  public isInLoop = false;
  public isInside = false;

  constructor(
    readonly x: number,
    readonly y: number,
    public value: string
  ) {}
}

class Graph {
  startingNode: Node;

  constructor(public nodes: Node[][]) {
    const startingNode = this.nodes.flat().find((n) => n.value == "S");
    if (!startingNode) {
      throw Error("No starting node");
    }
    this.startingNode = startingNode;
    this.startingNode.value = this.getStartPipe();
    this.markLoop();
    this.markInside();
  }

  getNode(x: number, y: number): Node | undefined {
    return this.nodes.at(x)?.at(y);
  }

  getStartPipe() {
    const { x, y } = this.startingNode;

    const northNeighbor = this.getNode(x - 1, y)?.value ?? "";
    const eastNeighbor = this.getNode(x, y + 1)?.value ?? "";
    const southNeighbor = this.getNode(x + 1, y)?.value ?? "";
    const westNeighbor = this.getNode(x, y - 1)?.value ?? "";

    const hasNorthNeighbor = pipeSouth.has(northNeighbor);
    const hasEastNeightbor = pipeEast.has(westNeighbor);
    const hasSouthNeightbor = pipeNorth.has(southNeighbor);
    const hasWestNeightbor = pipeWest.has(eastNeighbor);

    if (hasNorthNeighbor && hasSouthNeightbor) return "|";
    else if (hasEastNeightbor && hasWestNeightbor) return "-";
    else if (hasNorthNeighbor && hasEastNeightbor) return "L";
    else if (hasNorthNeighbor && hasWestNeightbor) return "J";
    else if (hasSouthNeightbor && hasWestNeightbor) return "7";
    else if (hasSouthNeightbor && hasEastNeightbor) return "F";
    else throw Error("Start without connexion");
  }

  markNeighbors(node: Node): void {
    const east = this.getNode(node.x, node.y + 1);
    if (east && pipeEast.has(node.value) && pipeWest.has(east.value)) {
      node.neighbors.push(east);
      east.neighbors.push(node);
    }
    const south = this.getNode(node.x + 1, node.y);
    if (south && pipeSouth.has(node.value) && pipeNorth.has(south.value)) {
      node.neighbors.push(south);
      south.neighbors.push(node);
    }
  }

  markLoop() {
    this.nodes.flat().forEach((node) => this.markNeighbors(node));
    const queue = new Array<Node>(this.startingNode);
    for (let current = queue.shift(); current; current = queue.shift()) {
      for (const neighbor of current.neighbors) {
        if (!neighbor.isInLoop) {
          neighbor.isInLoop = true;
          queue.push(neighbor);
        }
      }
    }
  }

  markInside() {
    const intersection = new Set<string>(["|", "L", "J"]);
    this.nodes.forEach((line) => {
      let inside = false;
      line.forEach((node) => {
        if (!node.isInLoop) {
          node.isInside = inside;
        } else if (intersection.has(node.value)) {
          inside = !inside;
        }
      });
    });
  }

  getNumberOfInside() {
    return this.nodes.flat().filter((node) => node.isInside).length;
  }
}

export class Day10Part2 {
  static solve(input: string): number {
    const nodes = input
      .split(/[\r\n]+/)
      .map((line, x) =>
        line.split("").map((value, y) => new Node(x, y, value))
      );
    return new Graph(nodes).getNumberOfInside();
  }
}
