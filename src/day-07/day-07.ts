export class Hand {
  readonly strength: number;

  constructor(
    readonly cards: string,
    readonly bid: number
  ) {
    const numberCardes = Hand.mapCardStrength(cards);

    this.strength =
      Hand.getScoreMatching(numberCardes) * 371293 +
      Hand.getScoreOrder(numberCardes);
  }

  static mapCardStrength(cards: string): number[] {
    const cardValue: Record<string, number> = {
      T: 8,
      J: 9,
      Q: 10,
      K: 11,
      A: 12,
    };
    return [...cards].map((cp) => {
      if ("2" <= cp && cp <= "9") {
        return cp.charCodeAt(0) - "2".charCodeAt(0);
      }
      return cardValue[cp];
    });
  }

  static getScoreMatching(cards: number[]) {
    const matchs: Record<string, number> = {};
    cards.forEach((card) => (matchs[card] = (matchs[card] || 0) + 1));
    const [high, low] = Object.values(matchs).sort().reverse();
    if (high === 5) return 6; // Five of a kind
    else if (high === 4) return 5; // Four of a kind
    else if (high === 3 && low === 2) return 4; // Full house
    else if (high === 3) return 3; // Three of a kind
    else if (high === 2 && low === 2) return 2; // Two pair
    else if (high === 2) return 1; // One pair
    else return 0;
  }

  static getScoreOrder(cards: number[]) {
    return (
      cards[0] * 28561 +
      cards[1] * 2197 +
      cards[2] * 169 +
      cards[3] * 13 +
      cards[4]
    );
  }
}

export class Day7 {
  static solve(input: string): number {
    let hands = input
      .split(/[\r\n]+/)
      .filter(Boolean)
      .map((line) => {
        const [hand, bid] = line.split(/\s+/);
        return new Hand(hand, +bid);
      });

    hands = hands.sort((a, b) => {
      if (a.strength > b.strength) return 1;
      if (a.strength < b.strength) return -1;
      return 0;
    });

    return hands.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
  }
}
