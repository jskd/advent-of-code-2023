export abstract class Day1Part1 {
    static evaluateLine([...line]: string): number {
        const fistDigit = line.find(v => Number(v));
        const lastDigit = line.reverse().find(v => Number(v));
        if(fistDigit && lastDigit) {
            return (+fistDigit) * 10 + (+lastDigit);
        }
        return 0;
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/);
        return lines.reduce((acc, line) => acc + Day1Part1.evaluateLine(line), 0);
    }
}