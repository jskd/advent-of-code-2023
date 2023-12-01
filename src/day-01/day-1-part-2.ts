import * as moo from "moo";

export abstract class Day1Part2 {

    static readonly literalNumberMap: Map<string, number> = new Map([
        ['one', 1], 
        ['two', 2],
        ['three', 3],
        ['four', 4],
        ['five', 5],
        ['six', 6],
        ['seven',7],
        ['eight',8],
        ['nine',9],
    ]);

    // Doesn't work for five61oneightr
    static solve(input: string): number {
        let sum = 0;
        let fistDigit = 0;
        let lastDigit = 0;

        let lexer = moo.compile({
            literal:  [...Day1Part2.literalNumberMap.keys()],
            digit: /[0-9]/, 
            newline: { match: /[\r\n]+/, lineBreaks: true },
            useless: /.+?/
        });
        lexer.reset(input);

        for(let { type, value } of lexer) {
            if (type == 'literal') {
                fistDigit ||= Day1Part2.literalNumberMap.get(value)!;
                lastDigit = Day1Part2.literalNumberMap.get(value)!;
            } else if(type == 'digit') {
                fistDigit ||= Number(value);
                lastDigit = Number(value);
            } else if(type === 'newline') {
                sum += fistDigit * 10 + lastDigit;
                fistDigit = 0;
                lastDigit = 0;
            } 
        }
        // for the last line
        sum += fistDigit * 10 + lastDigit;

        return sum;
    }
}