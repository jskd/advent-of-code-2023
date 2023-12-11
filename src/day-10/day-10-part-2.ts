class Node {
  isInLoop = false;
  isInside = false;
  neighbor: { [key in "north" | "east" | "south" | "west"]?: Node } = {};

  constructor(
    readonly x: number,
    readonly y: number,
    public value: string
  ) {}
}

class Graph {
  start: Node;

  constructor(readonly nodes: Node[][]) {
    const start = this.nodes.flat().find(({ value }) => value === "S");
    if (!start) {
      throw Error("No start node");
    }
    this.start = start;
    this.markNeighbors();
    this.replaceStartByPipe();
    this.markInLoop();
    this.markInside();
  }

  markNeighbors(): void {
    const pipeNorth = new Set<string>(["|", "L", "J", "S"]);
    const pipeSouth = new Set<string>(["|", "7", "F", "S"]);
    const pipeEast = new Set<string>(["-", "L", "F", "S"]);
    const pipeWest = new Set<string>(["-", "J", "7", "S"]);

    this.nodes.flat().forEach((node) => {
      const east = this.nodes.at(node.x)?.at(node.y + 1);
      if (east && pipeEast.has(node.value) && pipeWest.has(east.value)) {
        east.neighbor.west = node;
        node.neighbor.east = east;
      }
      const south = this.nodes.at(node.x + 1)?.at(node.y);
      if (south && pipeSouth.has(node.value) && pipeNorth.has(south.value)) {
        south.neighbor.north = node;
        node.neighbor.south = south;
      }
    });
  }

  replaceStartByPipe() {
    const { neighbor: neighbors } = this.start;
    if (neighbors.north && neighbors.south) this.start.value = "|";
    else if (neighbors.east && neighbors.west) this.start.value = "-";
    else if (neighbors.north && neighbors.east) this.start.value = "L";
    else if (neighbors.north && neighbors.west) this.start.value = "J";
    else if (neighbors.south && neighbors.west) this.start.value = "7";
    else if (neighbors.south && neighbors.east) this.start.value = "F";
    else throw Error("Start without connexion");
  }

  markInLoop(): void {
    let current: Node | undefined = this.start;
    while (current) {
      current.isInLoop = true;
      current = Object.values(current.neighbor).find(
        ({ isInLoop }) => !isInLoop
      );
    }
  }

  markInside(): void {
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
    return this.nodes.flat().filter(({ isInside }) => isInside).length;
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
