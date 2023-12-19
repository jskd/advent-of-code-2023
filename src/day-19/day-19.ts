type RatingNames = "x" | "m" | "a" | "s";
type Rattings = Record<RatingNames, number>;

class Condition {
  rating: RatingNames;
  begin: number;
  end: number;
  then: string;
  otherwise: Condition | string;

  constructor(line: string) {
    const matches = line.match(/^([xmas])([<>])(\d+):(\w+),(.*)/);
    if (!matches) {
      throw "Parsing error";
    }
    const [_, rating, condition, range, then, otherwise] = [...matches];
    this.rating = rating as RatingNames;
    this.begin = condition === ">" ? +range : 0;
    this.end = condition === "<" ? +range : 4001;
    this.then = then;
    this.otherwise = otherwise.includes(":")
      ? new Condition(otherwise)
      : otherwise;
  }
}

class Workflow extends Condition {
  label: string;
  constructor(line: string) {
    const [label, condition] = line.replace("}", "").split("{");
    super(condition);
    this.label = label;
  }
}

function execute(line: Rattings, condition: Condition): string {
  const { begin, end, then, otherwise } = condition;
  const rating = line[condition.rating];
  const result = begin < rating && rating < end ? then : otherwise;
  return result instanceof Condition ? execute(line, result) : result;
}

function isAccepted(ratings: Rattings, workflowsMap: Map<string, Workflow>) {
  let current: Condition | string = "in";
  while (current != "R" && current != "A") {
    const flow = workflowsMap.get(current);
    if (!flow) {
      throw "Workflow label not found";
    }
    current = execute(ratings, flow);
  }
  return current === "A";
}

export function solveDay19Part1(input: string) {
  const [workflowLines, ratingLines] = input.split(/(?:\r?\n){2}/);
  const ratings = ratingLines
    .split(/[\r\n]+/)
    .filter(Boolean)
    .map((line) => {
      const matchs = line.match(/^{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}/);
      if (!matchs) {
        throw "Parsing error";
      }
      const [_, x, m, a, s] = [...matchs];
      return { x: +x, m: +m, a: +a, s: +s } as Rattings;
    });

  const workflowsMap = new Map<string, Workflow>();
  workflowLines.split(/[\r\n]+/).forEach((line) => {
    const workflow = new Workflow(line);
    workflowsMap.set(workflow.label, workflow);
  });

  return ratings
    .filter((rating) => isAccepted(rating, workflowsMap))
    .reduce((sum, { x, m, a, s }) => sum + x + m + a + s, 0);
}
