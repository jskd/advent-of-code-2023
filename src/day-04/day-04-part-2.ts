export class Card {
    readonly matchingNumbers: number;

    private _count = 1;
    get count() {
        return this._count;
    }

    constructor(line: string) {
        const [_, winStr, handStr] = line.split(/[:\|]/);
        const winArray = winStr.split(" ").filter(Boolean).map(number => +number);
        const handArray = handStr.split(" ").filter(Boolean).map(number => +number);
        const winSet = new Set<number>(handArray);
        this.matchingNumbers = winArray.filter(value => winSet.has(value)).length;
    }

    winCopy(quantity: number) {
        this._count += quantity;
    }
}

class CardCollection {
    readonly cards: Card[];

    constructor(lines: string[]) {
        this.cards = lines.map(line => new Card(line));
        this.cards.forEach(({count, matchingNumbers}, index) => {
            for(let i=1; i<=matchingNumbers; i++) {
                this.cards[index + i].winCopy(count);
            }
        });
    }

    totalCard() {
        return this.cards.reduce((acc, {count}) => acc+count, 0);
    }
}

export abstract class Day04Part2 {
    static solve(input: string): number {
        const lines = input.split(/[\r\n]+/).filter(Boolean);
        return new CardCollection(lines).totalCard();
    }
}
