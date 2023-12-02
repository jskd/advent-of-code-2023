interface Bag {
    [color: string]: number;
}

export abstract class Day02Part1 {
    static readonly capacity: Bag = { red: 12, green: 13, blue: 14 };

    static isPlayable(line: string): boolean {
        const regex = /(\d+) (\w+)/g;
        const sets = [... line.matchAll(regex)];
        return !sets.some(([_, count, color]) => +count > this.capacity[color]);
    }

    static solve(input: string): number {
        return input.split(/[\r\n]+/).filter(Boolean).reduce((acc, line) => {
            const [_, game, sets] = line.match(/^Game (\d+): (.+)$/)!;
            return acc + (this.isPlayable(sets) ? (+game) : 0);
        }, 0); 
    }
}
