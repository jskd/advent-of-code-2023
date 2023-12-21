const ratingNames = ["x", "m", "a", "s"] as const;
type RatingNames = (typeof ratingNames)[number];

type Rattings = Record<RatingNames, number>;
type RattingsRange = Record<RatingNames, { begin: number; end: number }>;

class Condition {
  rating: RatingNames;
  begin: number;
  end: number;
  then: string;
  otherwise: Condition | string;

  constructor(line: string) {
    const matches = line.match(/^([xmas])([<>])(\d+):(\w+),(.+)$/);
    if (!matches) {
      throw "Pattern not found";
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
    const [label, condition] = line.slice(0, -1).split("{");
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

function countPosibilitied(
  label: string,
  range: RattingsRange,
  workflowsMap: Map<string, Workflow>
): number {
  if (label === "R") {
    return 0;
  }

  if (label === "A") {
    return ratingNames.reduce(
      (acc, key) => acc * (range[key].end - range[key].end),
      1
    );
  }

  const flow = workflowsMap.get(label);
  if (!flow) {
    throw "Workflow label not found";
  }

  let posibilities = 0;
  if (
    flow.end > range[flow.rating].begin &&
    flow.begin < range[flow.rating].end
  ) {
    // then
    // Math.max( range[flow.rating].start, flow.start)
    // to
    // Math.min( range[flow.rating].end, flow.end),
  }
  if (range[flow.rating].begin < flow.begin) {
    // otherwise
    // range[flow.rating].begin to flow.begin
  }
  if (flow.end < range[flow.rating].end) {
    //  otherwise
    // flow.end to range[flow.rating].end
  }

  return posibilities;
}

export function solveDay19Part1(input: string) {
  const [workflowLines, ratingLines] = input
    .split(/(?:\r?\n){2}/)
    .map((lines) => lines.split(/[\r\n]+/).filter(Boolean));

  const ratings: Rattings[] = ratingLines.map((line) => {
    const matchs = line.match(/^{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}/);
    if (!matchs) {
      throw "Pattern not found";
    }
    const [_, x, m, a, s] = [...matchs];
    return { x: +x, m: +m, a: +a, s: +s };
  });

  const workflowsMap = new Map<string, Workflow>();
  workflowLines.forEach((line) => {
    const workflow = new Workflow(line);
    workflowsMap.set(workflow.label, workflow);
  });

  return ratings
    .filter((rating) => isAccepted(rating, workflowsMap))
    .reduce((sum, { x, m, a, s }) => sum + x + m + a + s, 0);
}
