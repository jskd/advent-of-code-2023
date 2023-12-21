const ratingNames = ["x", "m", "a", "s"] as const;
type RatingNames = (typeof ratingNames)[number];
type ConditionOperator = ">" | "<";

type Rattings = Record<RatingNames, number>;
type RattingsRange = Record<RatingNames, { begin: number; end: number }>;

class Condition {
  rating: RatingNames;
  then: string;
  otherwise: Condition | string;
  operator: ConditionOperator;
  value: number;

  constructor(line: string) {
    const matches = line.match(/^([xmas])([<>])(\d+):(\w+),(.+)$/);
    if (!matches) {
      throw "Pattern not found";
    }
    const [_, rating, condition, range, then, otherwise] = [...matches];
    this.rating = rating as RatingNames;
    this.operator = condition as ConditionOperator;
    this.value = +range;

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
  const { operator, value, then, otherwise } = condition;
  const check = line[condition.rating];
  const result =
    (operator === ">" && check > value) || (operator === "<" && check < value)
      ? then
      : otherwise;
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

function getCombinations(
  workflow: Condition | string,
  range: RattingsRange,
  workflowsMap: Map<string, Workflow>
): number {
  if (workflow === "R") {
    return 0;
  }

  if (workflow === "A") {
    return ratingNames.reduce(
      (sum, key) => sum * (range[key].end - range[key].begin + 1),
      1
    );
  }

  if (!(workflow instanceof Condition)) {
    if (!workflowsMap.has(workflow)) {
      throw "Workflow not found";
    }
    workflow = workflowsMap.get(workflow)!;
  }

  const { value, operator, otherwise, then, rating } = workflow;

  const beforeConditon = operator === "<" ? then : otherwise;
  const before = structuredClone(range);
  before[rating].end = value + (operator === "<" ? -1 : 0);

  const afterConditon = operator === ">" ? then : otherwise;
  const afterRange = structuredClone(range);
  afterRange[rating].begin = value + (operator === ">" ? 1 : 0);
  return (
    getCombinations(beforeConditon, before, workflowsMap) +
    getCombinations(afterConditon, afterRange, workflowsMap)
  );
}

export function solveDay19(input: string, part: 1 | 2) {
  const [workflowLines, ratingLines] = input
    .split(/(?:\r?\n){2}/)
    .map((lines) => lines.split(/[\r\n]+/).filter(Boolean));
  const workflowsMap = new Map<string, Workflow>();
  workflowLines.forEach((line) => {
    const workflow = new Workflow(line);
    workflowsMap.set(workflow.label, workflow);
  });

  if (part === 1) {
    return ratingLines
      .map((line) => {
        const matchs = line.match(/^{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}/);
        if (!matchs) {
          throw "Pattern not found";
        }
        const [_, x, m, a, s] = [...matchs];
        return { x: +x, m: +m, a: +a, s: +s };
      })
      .filter((rating) => isAccepted(rating, workflowsMap))
      .reduce((sum, { x, m, a, s }) => sum + x + m + a + s, 0);
  }

  const range: RattingsRange = {
    x: { begin: 1, end: 4000 },
    m: { begin: 1, end: 4000 },
    a: { begin: 1, end: 4000 },
    s: { begin: 1, end: 4000 },
  };
  return getCombinations("in", range, workflowsMap);
}
