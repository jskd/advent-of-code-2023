export interface Bag {
    [color: string]: number;
}

export abstract class Day02Part1 {

    static isPlayable(line: string, capacity: Bag): boolean {
        const regex = /(\d+) (\w+)/g;
        const sets = [... line.matchAll(regex)];
        return !sets.some(([_, count, color]) => +count > capacity[color]);
    }

    static solve(input: string, capacity: Bag): number {
        return input.split(/[\r\n]+/).reduce((acc, line) => {
            const [_, game, sets] = line.match(/^Game (\d+): (.+)$/) ?? ["", "", ""];
            return acc + (this.isPlayable(sets, capacity) ? (+game) : 0);
        }, 0); 
    }
}