export class GearPosition {
    x = 0;
    y = 0;
    numbers: NumberPosition[];
    
    constructor(x: number, y: number, numbers: NumberPosition[] = []) {
        this.x = x;
        this.y = y;
        this.numbers = numbers;
    }
 
    getRatio(): number {
        return this.numbers.length === 2
            ? +this.numbers[0].value * +this.numbers[1].value
            : 0;
    } 

    isAdjacent({x, y, value}: NumberPosition) {
        return x-1 <= this.x && this.x <= x+1 
            && y-1 <= this.y && this.y <= y+value.length;
    }

    pushNumber(numberPos: NumberPosition) {
        this.numbers.push(numberPos);
    }
}

export class NumberPosition {
    x: number;
    y: number;
    value: string;

    constructor(x: number, y: number, value: string) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
 
}

export abstract class Day03Part2 {

    static findGearPosition(lines: string[]): GearPosition[] {
        return lines.flatMap((line, lineNumber) => 
            [ ...line.matchAll(/\*/g) ].map(({index}) => new GearPosition(lineNumber, index!)
        ));
    }

    static findNumberPosition(lines: string[]): NumberPosition[] {
        return lines.flatMap((line, lineNumber) => 
            [ ...line.matchAll(/\d+/g) ].map((match) => new NumberPosition(lineNumber, match.index!, match[0]!)
        ));
    }

    static associateGearAdjacent(numberPosition: NumberPosition, gears: GearPosition[]) {
        gears.filter(gear => gear.isAdjacent(numberPosition))
            .forEach(gear => gear.pushNumber(numberPosition));
    }

    static getSumGearRatio(gears: GearPosition[]): number {
        return gears.reduce((acc, gear) => acc + gear.getRatio(), 0)
    }

    static solve(input: string) {
        const lines = input.split(/[\r\n]+/).filter(Boolean);
        let gears = this.findGearPosition(lines);
        let numbers = this.findNumberPosition(lines);
        
        numbers.forEach(pos => this.associateGearAdjacent(pos, gears));
        return this.getSumGearRatio(gears);
    }
}
