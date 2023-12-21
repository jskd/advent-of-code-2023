const ratingNames = ["x", "m", "a", "s"] as const;
type RatingNames = (typeof ratingNames)[number];
type ConditionOperator = ">" | "<";

type Rattings = Record<RatingNames, number>;
type RattingsRange = Record<RatingNames, { begin: number; end: number }>;

class Condition {
  rating: RatingNames;
  begin: number;
  end: number;
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
    this.begin = condition === ">" ? +range : 1;
    this.end = condition === "<" ? +range : 4000;
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
  const { begin, end, then, otherwise } = condition;
  const rating = line[condition.rating];
  const result = begin <= rating && rating < end ? then : otherwise;
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

function countPosibilities(
  workflow: Condition | string,
  range: RattingsRange,
  workflowsMap: Map<string, Workflow>
): number {
  if (workflow === "R") {
    return 0;
  }

  if (workflow === "A") {
    return ratingNames.reduce(
      (acc, key) => acc * (range[key].end - range[key].begin + 1),
      1
    );
  }

  if (!(workflow instanceof Condition)) {
    const found = workflowsMap.get(workflow);
    if (!found) {
      throw "Workflow label not found";
    }
    workflow = found;
  }

  const rateCheck = range[workflow.rating];

  let posibilities = 0;
  /*
  if (rateCheck.begin < workflow.begin) {
    const before = structuredClone(range);
    before[workflow.rating].end = Math.min(rateCheck.end, workflow.begin) - 1;
    console.log("before", before);
    posibilities += countPosibilities(workflow.otherwise, before, workflowsMap);
  }
  if (workflow.begin < rateCheck.end && workflow.end > rateCheck.begin) {
    const overlap = structuredClone(range);
    overlap[workflow.rating].begin = Math.max(rateCheck.begin, workflow.begin);
    overlap[workflow.rating].end = Math.min(rateCheck.end, workflow.end) - 1;
    console.log("over", overlap);
    posibilities += countPosibilities(workflow.then, overlap, workflowsMap);
  }
  //console.log(rateCheck.end, "vs", workflow.end);

  if (rateCheck.end > workflow.end) {
    const after = structuredClone(range);
    after[workflow.rating].begin = Math.max(rateCheck.begin, workflow.end);
    console.log("after", after);
    posibilities += countPosibilities(workflow.otherwise, after, workflowsMap);
  }*/

  if (rateCheck.begin < workflow.value && workflow.value < rateCheck.end) {
    const before = structuredClone(range);
    before[workflow.rating].end =
      workflow.value + (workflow.operator === "<" ? -1 : 0);
    posibilities += countPosibilities(
      workflow.operator === "<" ? workflow.then : workflow.otherwise,
      before,
      workflowsMap
    );

    const after = structuredClone(range);
    after[workflow.rating].begin =
      workflow.value + (workflow.operator === ">" ? +1 : 0);
    posibilities += countPosibilities(
      workflow.operator === ">" ? workflow.then : workflow.otherwise,
      after,
      workflowsMap
    );

    console.log("before", before);

    console.log("after", after);
  } else {
    const conditiopn =
      workflow.operator === ">" && rateCheck.begin > workflow.value
        ? workflow.then
        : workflow.otherwise;
    posibilities += countPosibilities(conditiopn, range, workflowsMap);
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

export function solveDay19Part2(input: string) {
  const [workflowLines] = input
    .split(/(?:\r?\n){2}/)
    .map((lines) => lines.split(/[\r\n]+/).filter(Boolean));

  const workflowsMap = new Map<string, Workflow>();
  workflowLines.forEach((line) => {
    const workflow = new Workflow(line);
    workflowsMap.set(workflow.label, workflow);
  });

  const range: RattingsRange = {
    x: {
      begin: 1,
      end: 4000,
    },
    m: {
      begin: 1,
      end: 4000,
    },
    a: {
      begin: 1,
      end: 4000,
    },
    s: {
      begin: 1,
      end: 4000,
    },
  };

  return countPosibilities("in", range, workflowsMap);
}
