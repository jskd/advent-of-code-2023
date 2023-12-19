interface Lens {
  label: string;
  focal: number;
}

function hash(sequence: string): number {
  return [...sequence]
    .map((letter) => letter.charCodeAt(0))
    .reduce((hash, letter) => ((hash + letter) * 17) % 256, 0);
}

function excute(boxes: Lens[][], sequence: string) {
  const [label, focal] = sequence.replace("-", "").split("=");
  const box = (boxes[hash(label)] ??= []);
  const indexLens = box.findIndex((lens) => lens.label === label);
  if (focal) {
    if (indexLens != -1) {
      box[indexLens].focal = +focal;
    } else {
      box.push({ label: label, focal: +focal });
    }
  } else if (indexLens != -1) {
    box.splice(indexLens, 1);
  }
}

export function solveDay15Part1(input: string): number {
  return input
    .replace(/[\r\n]+/, "")
    .split(",")
    .reduce((sum, line) => sum + hash(line), 0);
}

export function solveDay15Part2(input: string): number {
  const boxes: Lens[][] = [];
  input
    .replace(/[\r\n]+/, "")
    .split(",")
    .forEach((sequence) => excute(boxes, sequence));
  return boxes.reduce(
    (sum, box, boxId) =>
      box.reduce(
        (sum, { focal }, lensId) => sum + (boxId + 1) * (lensId + 1) * focal,
        sum
      ),
    0
  );
}
