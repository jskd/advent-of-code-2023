interface Bag {
    [color: string]: number;
}

export abstract class Day02Part2 {
    static getPowerOfSet(line: string): number {
        const min: Bag = {};
        const regex = /(\d+) (\w+)/g;
        const sets = [ ...line.matchAll(regex) ];
        sets.map(([_, count, color]) => min[color] = min[color] > +count ? min[color] : +count);
        return Object.values(min).reduce((acc, value) => acc * value, 1);
    }

    static solve(input: string): number {
        return input.split(/[\r\n]+/).filter(Boolean).reduce((acc, line) => {
            const [_, sets] = line.match(/^Game \d+: (.+)$/)!;
            return acc + this.getPowerOfSet(sets);
        }, 0); 
    }
}
