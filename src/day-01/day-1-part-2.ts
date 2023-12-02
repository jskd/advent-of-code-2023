export abstract class Day1Part2 {
    static readonly literalDigitMap: Map<string, number> = new Map([
        ["one", 1], 
        ["two", 2],
        ["three", 3],
        ["four", 4],
        ["five", 5],
        ["six", 6],
        ["seven",7],
        ["eight", 8],
        ["nine", 9],
        ["1", 1], 
        ["2", 2],
        ["3", 3],
        ["4", 4],
        ["5", 5],
        ["6", 6],
        ["7",7],
        ["8", 8],
        ["9", 9]
    ]);
    static readonly literalTokens = [...this.literalDigitMap.keys()].join('|');

    static getFirstDigit(input: string, direction: "leftToRight" | "rightToLeft"): number {
        const lazy = new RegExp(`(?:.*?)(${this.literalTokens})`);
        const greedy = new RegExp(`(?:.*)(${this.literalTokens})`);
        const regex = direction === "leftToRight" ? lazy : greedy;
        return this.literalDigitMap.get( input.match(regex)?.[1] ?? "" ) ?? 0;
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/);
        return lines.reduce((acc, line) => acc + this.getFirstDigit(line, "leftToRight") * 10 + this.getFirstDigit(line, "rightToLeft"), 0);
    }
}
