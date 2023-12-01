export abstract class Day1Part2 {
    static readonly literalDigitMap: Map<string, string> = new Map([
        ["one", "1"], 
        ["two", "2"],
        ["three", "3"],
        ["four", "4"],
        ["five", "5"],
        ["six", "6"],
        ["seven","7"],
        ["eight", "8"],
        ["nine", "9"],
    ]);
    static readonly literalTokens = [...this.literalDigitMap.keys()].join('|');

    static replaceFirstLiteralByDigit(input: string, direction: "leftToRight" | "rightToLeft"): string {
        const lazy = new RegExp(`(.*?)(${this.literalTokens})`);
        const greedy = new RegExp(`(.*)(${this.literalTokens})`);
        const regex = direction === "leftToRight" ? lazy : greedy;
        return input.replace(regex, (_, p1, p2) => p1 + (this.literalDigitMap.get(p2) ?? ""));
    }
    
    static getFirstDigit(line: string, direction: "leftToRight" | "rightToLeft"): number {
        line = this.replaceFirstLiteralByDigit(line, direction);
        let arrayCh = direction === "leftToRight" ? [...line] : [...line].reverse();
        return Number(arrayCh.find(v => Number(v)) ?? "0");
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/);
        return lines.reduce((acc, line) => acc + this.getFirstDigit(line, "leftToRight") * 10 + this.getFirstDigit(line, "rightToLeft"), 0);
    }
}
