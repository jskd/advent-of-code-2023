interface Bag {
    [color: string]: number;
}

export abstract class Day02Part2 {

    static getPowerOfSet(line: string): number {
        let bag: Bag = {};
        const regex = /(\d+) (\w+)/g;
        const sets = [... line.matchAll(regex)];
        sets.map(([_, count, color]) => bag[color] = bag[color] > +count ? bag[color] : +count);
        return Object.values(bag).reduce((acc, value) => acc * value, 1);
    }

    static solve(input: string): number {
        return input.split(/[\r\n]+/).filter(line => line) 
            .reduce((acc, line) => {
                const [_, sets] = line.match(/^Game \d+: (.+)$/)!;
                return acc + this.getPowerOfSet(sets);
            }, 0); 
    }
}