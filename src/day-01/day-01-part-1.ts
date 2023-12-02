export abstract class Day01Part1 {
    static evaluateLine([...line]: string): number {
        const fistDigit = line.find(v => Number(v));
        const lastDigit = line.reverse().find(v => Number(v));
        if(fistDigit && lastDigit) {
            return (+fistDigit) * 10 + (+lastDigit);
        }
        return 0;
    }

    static solve(input: string): number {
        return input.split(/[\r\n]+/).filter(Boolean).reduce(
            (acc, line) => acc + Day01Part1.evaluateLine(line)
        , 0);
    }
}