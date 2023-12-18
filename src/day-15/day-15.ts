class Lens {
  constructor(
    readonly label: string,
    public focal: number
  ) {}
}

function hash(sequence: string): number {
  return sequence
    .split("")
    .reduce((hash, letter) => ((hash + letter.charCodeAt(0)) * 17) % 256, 0);
}

function excute(boxes: Lens[][], sequence: string) {
  const [label, focal] = sequence.replace("-", "").split("=");
  const box = (boxes[hash(label)] ??= []);
  const indexLens = box.findIndex((lens) => lens.label === label);
  if (focal) {
    if (indexLens != -1) {
      box[indexLens].focal = +focal;
    } else {
      box.push(new Lens(label, +focal));
    }
  } else if (indexLens != -1) {
    box.splice(indexLens, 1);
  }
}

export class Day15Part1 {
  static solve(input: string): number {
    return input
      .trim()
      .split(",")
      .reduce((sum, line) => sum + hash(line), 0);
  }
}

export class Day15Part2 {
  static solve(input: string): number {
    const boxes: Lens[][] = [];
    input
      .replace(/[\r\n]+/, "")
      .trim()
      .split(",")
      .forEach((sequence) => excute(boxes, sequence));
    return boxes.reduce(
      (sumPower, box, boxIdx) =>
        sumPower +
        box.reduce(
          (power, { focal }, lensIndex) =>
            power + (boxIdx + 1) * (lensIndex + 1) * focal,
          0
        ),
      0
    );
  }
}
