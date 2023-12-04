export abstract class Day04Part1 {
    static getScore(line: string) {
        const [_, winStr, handStr] = line.split(/[:\|]/);
        const winArray = winStr.split(" ").filter(Boolean).map(number => +number);
        const handArray = handStr.split(" ").filter(Boolean).map(number => +number);
        const winSet = new Set<number>(handArray);
        const matchs = winArray.filter(value => winSet.has(value)).length;
        return matchs ? Math.pow(2, matchs-1) : 0;
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/).filter(Boolean);
        return lines.reduce((acc, line) => acc + this.getScore(line), 0);
    }
}
