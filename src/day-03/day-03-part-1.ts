export interface SymbolPos {
    [x: number]: number[] // list of y
}

export interface NumberPos {
    x: number;
    y: number;
    value: string;
}

export abstract class Day03Part1 {
    static findSymbolPos(lines: string[]): SymbolPos {
        return lines.map((line) => [...line.matchAll(/[^\d.]/g)]
            .map(({index}) => +index!));
    }

    static getNumberPos(lines: string[]): NumberPos[] {
        return lines.flatMap((line, index) => [...line.matchAll(/\d+/g)]
            .map((match) => ({ x: index, y: match.index!, value: match[0]! })));
    }

    static isAdjacent({x, y, value}: NumberPos, symbols: SymbolPos): boolean {
        const nearSymbols = symbols[x].concat(symbols[x-1] ?? [], symbols[x+1] ?? []);
        return nearSymbols.some((pos) => y-1 <= pos && pos <= y+value.length);
    }

    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/).filter(Boolean);
        const symbols = this.findSymbolPos(lines)
        return this.getNumberPos(lines)
            .filter((number) => this.isAdjacent(number, symbols))
            .reduce((acc, {value}) => acc + +value, 0);
    }
}
