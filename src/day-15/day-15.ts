function hash(sequence: string): number {
  return sequence
    .split("")
    .reduce((hash, letter) => ((hash + letter.charCodeAt(0)) * 17) % 256, 0);
}

export class Day15 {
  static solve(input: string): number {
    return input
      .trim()
      .split(",")
      .map((val) => hash(val))
      .reduce((sum, val) => sum + val, 0);
  }
}
