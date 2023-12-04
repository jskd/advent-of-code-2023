type SymbolePosition = Array<Array<number>>;

interface NumberPosition {
    x: number;
    y: number;
    value: string;
}

export abstract class Day03Part1 {

    static findSymbolPosition(lines: string[]): SymbolePosition {
        return lines.map((line) => [...line.matchAll(/[^\d\.]/g)]
            .map(({index}) => +index!));
    }

    static getNumberPosition(lines: string[]): NumberPosition[] {
        return lines.flatMap((line, index) => [...line.matchAll(/\d+/g)]
            .map((match) => ({ x: index, y: match.index!, value: match[0]! })));
    }

    static isAdjacent({x, y, value}: NumberPosition, symboles: SymbolePosition): boolean {
        const nearSymboles = symboles[x].concat(symboles[x-1] ?? [], symboles[x+1] ?? []);
        return nearSymboles.some((pos) => y-1 <= pos && pos <= y+value.length);
    }

    static solve(input: string) {
        const lines = input.split(/[\r\n]+/).filter(Boolean);
        const symboles = this.findSymbolPosition(lines)
        return this.getNumberPosition(lines)
            .filter((number) => this.isAdjacent(number, symboles))
            .reduce((acc, {value}) => acc + +value, 0);
    }
}
