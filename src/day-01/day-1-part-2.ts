type Direction = "leftToRight" | "rightToLeft";

export abstract class Day1Part2 {
    static readonly literalDigitMap: Map<string, number> = new Map([
        ["one", 1], ["1", 1], ["two", 2], ["2", 2], ["three", 3], ["3", 3], 
        ["four", 4], ["4", 4], ["five", 5],["5", 5], ["six", 6], ["6", 6],
        ["seven", 7], ["7", 7], ["eight", 8], ["8", 8], ["nine", 9], ["9", 9]
    ]);
    static readonly literalTokens = [...this.literalDigitMap.keys()].join('|');

    static getFirstDigit(line: string, direction: Direction): number {
        const lazy = new RegExp(`^(?:.*?)(${this.literalTokens})`);
        const greedy = new RegExp(`^(?:.*)(${this.literalTokens})`);
        const regex = direction === "leftToRight" ? lazy : greedy;
        const [_, literal] = line.match(regex) ?? [""];
        return this.literalDigitMap.get( literal ) ?? 0;
    }

    static solve(input: string): number {
        return input.split(/[\r\n]+/).reduce((acc, line) => 
            acc + this.getFirstDigit(line, "leftToRight")*10 + this.getFirstDigit(line, "rightToLeft")
        , 0);
    }
}
