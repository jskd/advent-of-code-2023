const ratingNames = ["x", "m", "a", "s"] as const;
type RatingNames = (typeof ratingNames)[number];
type ConditionOperator = ">" | "<";

type Ratings = Record<RatingNames, number>;
type RatingsRange = Record<RatingNames, { begin: number; end: number }>;

class Condition {
  rating: RatingNames;
  operator: ConditionOperator;
  operand: number;
  then: string;
  otherwise: Condition | string;

  constructor(line: string) {
    const matches = line.match(/^([xmas])([<>])(\d+):(\w+),(.+)$/);
    if (!matches) {
      throw "Pattern not found";
    }
    const [_, rating, operator, operand, then, otherwise] = [...matches];
    this.rating = rating as RatingNames;
    this.operator = operator as ConditionOperator;
    this.operand = +operand;
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

function execute(ratings: Ratings, condition: Condition): string {
  const { operator, operand, then, otherwise } = condition;
  const rating = ratings[condition.rating];
  const result =
    (operator === ">" && rating > operand) ||
    (operator === "<" && rating < operand)
      ? then
      : otherwise;
  return result instanceof Condition ? execute(ratings, result) : result;
}

function isAccepted(ratings: Ratings, workflowsMap: Map<string, Workflow>) {
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
  range: RatingsRange,
  workflowsMap: Map<string, Workflow>
): number {
  if (workflow === "R") {
    return 0;
  } else if (workflow === "A") {
    return ratingNames.reduce(
      (sum, key) => sum * (range[key].end - range[key].begin + 1),
      1
    );
  }

  if (!(workflow instanceof Condition)) {
    if (!workflowsMap.has(workflow)) {
      throw "Workflow label not found";
    }
    workflow = workflowsMap.get(workflow)!;
  }

  const { operand, operator, otherwise, then, rating } = workflow;

  const beforeConditon = operator === "<" ? then : otherwise;
  const beforeRange = structuredClone(range);
  beforeRange[rating].end = operand + (operator === "<" ? -1 : 0);

  const afterConditon = operator === ">" ? then : otherwise;
  const afterRange = structuredClone(range);
  afterRange[rating].begin = operand + (operator === ">" ? 1 : 0);

  return (
    getCombinations(beforeConditon, beforeRange, workflowsMap) +
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

  const range: RatingsRange = {
    x: { begin: 1, end: 4000 },
    m: { begin: 1, end: 4000 },
    a: { begin: 1, end: 4000 },
    s: { begin: 1, end: 4000 },
  };
  return getCombinations("in", range, workflowsMap);
}
