interface GearPosition {
    x: number;
    y: number;
    numbers: string[];
}


export abstract class Day03Part2 {

    static findGearPosition(input: string): GearPosition[] {
        return input.split(/[\r\n]+/).filter(Boolean)
            .flatMap((line, lineNumber) => 
                [ ...line.matchAll(/\*/g) ].map(({index}): GearPosition => ({
                    x: lineNumber,
                    y: index!,
                    numbers: []
                })) 
            );
    }




    
}
