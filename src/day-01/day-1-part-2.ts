
const reverseStr = (str : string) => str.split("").reverse().join("");

const literalDigitMap: Map<string, string> = new Map([
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

export abstract class Day1Part2 {

    static replaceFirstLiteralByDigit(input: string) {
        const literalTokens = [...literalDigitMap.keys()].join('|');
        const regex = new RegExp(`(${literalTokens})`);
        return input.replace(regex, (match) => {
            return literalDigitMap.get(match) ?? ""
        });
    }

    static replaceLastLiteralByDigit(input: string) {
        const literalTokens = reverseStr([...literalDigitMap.keys()].join('|'));
        const regex = new RegExp(`(${literalTokens})`);
        return reverseStr(input).replace(regex, (match) => {
            return literalDigitMap.get(reverseStr(match)) ?? ""
        });
    }

    static evaluateLine(line: string): number {
        const fistDigit = [...Day1Part2.replaceFirstLiteralByDigit(line)].find(v => Number(v));
        const lastDigit = [...Day1Part2.replaceLastLiteralByDigit(line)].reverse().find(v => Number(v));
        if(fistDigit && lastDigit) {
            return (+fistDigit) * 10 + (+lastDigit);
        }
        return 0;
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/);
        return lines.reduce((acc, line) => acc + Day1Part2.evaluateLine(line), 0);
    }
}
