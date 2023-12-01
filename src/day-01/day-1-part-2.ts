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
    
    static replaceFirstLiteralByDigit(input: string): string {
        const lazy = new RegExp(`(.*?)(${this.literalTokens})`);
        return input.replace(lazy, (_, p1, p2) => p1 + (this.literalDigitMap.get(p2) ?? ""));
    }
    
    static replaceLastLiteralByDigit(input: string): string {
        const greedy = new RegExp(`(.*)(${this.literalTokens})`);
        return input.replace(greedy, (_, p1, p2) => p1 + (this.literalDigitMap.get(p2) ?? ""));
    }

    static evaluateLine(line: string): number {
        const fistDigit = [...this.replaceFirstLiteralByDigit(line)].find(v => Number(v)) ?? "0";
        const lastDigit = [...this.replaceLastLiteralByDigit(line)].reverse().find(v => Number(v)) ?? "0";
        return (+fistDigit) * 10 + (+lastDigit);
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/);
        return lines.reduce((acc, line) => acc + Day1Part2.evaluateLine(line), 0);
    }
    
}
