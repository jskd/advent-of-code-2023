function hash(sequence: string): number {
  let current = 0;
  sequence.split("").forEach((letter) => {
    current += letter.charCodeAt(0);
    current *= 17;
    current %= 256;
  });
  return current;
}

export class Day15 {
  static solve(input: string): number {
    return input
      .replace(/[\r\n]+/, "")
      .split(",")
      .filter(Boolean)
      .map((val) => hash(val))
      .reduce((acc, v) => acc + v, 0);
  }
}
