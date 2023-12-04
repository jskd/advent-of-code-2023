interface SymbolePosition {
    line: number;
    pos: number[];
}

interface NumberPosition {
    x: number;
    y: number;
    value: string;
}

export abstract class Day03Part1 {

    static findSymbolPosition(input: string): SymbolePosition[] {
        return input.split(/[\r\n]+/).filter(Boolean)
            .flatMap((line, index) => {
                const matchs = [... line.matchAll(/[^\d\.]/g)]
                return matchs.length ? { 
                    line: index,
                    pos: matchs.flatMap(({index}) => index ?? []) 
                } : []
            });
    }

    static getNumberPosition(input: string): NumberPosition[] {
        return input.split(/[\r\n]+/).filter(Boolean)
            .flatMap((line, index) => {
                const matchs = [... line.matchAll(/\d+/g)]
                return matchs.flatMap((match) => match ? {
                    x: index,
                    y: match.index!,
                    value: match[0]
                } : []) 
            });
    }

    static isAdjacent({x,y,value}: NumberPosition, symboles: SymbolePosition[]): boolean {
        return symboles.filter(({ line }) => x-1 <= line && line <= x+1)
            .some(({ pos }) => pos.some(y2 => y-1 <= y2 && y2 <= y+value.length))
    }

    static solve(input: string) {
        const symboles = this.findSymbolPosition(input)
        return this.getNumberPosition(input)
            .filter((number) => this.isAdjacent(number, symboles))
            .reduce((acc, {value}) => acc + +value, 0);
    }
}
