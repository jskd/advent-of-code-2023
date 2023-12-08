export class Hand {
  readonly strength: number;

  // prettier-ignore
  static readonly cardValue: Record<string, number> = {
    "2": 0x0, "3": 0x1, "4": 0x2, "5": 0x3, "6": 0x4, "7": 0x5, "8": 0x6, "9": 0x7, 
    "T": 0x8, "J": 0x9, "Q": 0xa, "K": 0xb, "A": 0xc
  };

  constructor(
    readonly cards: string,
    readonly bid: number
  ) {
    const strenghtCards = Hand.mapCardStrength(cards);
    this.strength =
      (Hand.getStrenghtMatch(strenghtCards) << 20) |
      Hand.getStrenghtOrder(strenghtCards);
  }

  static mapCardStrength(cards: string): number[] {
    return [...cards].map((cp) => Hand.cardValue[cp]);
  }

  static getStrenghtMatch(cards: number[]) {
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

  static getStrenghtOrder(cards: number[]) {
    return cards.reduce((acc, card) => (acc << 4) | card, 0);
  }
}

class Hands extends Array<Hand> {
  constructor(hands: Hand[]) {
    super(...hands);
  }

  sortByStrength(): Hands {
    return this.sort(({ strength: a }, { strength: b }) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  }

  getTotalBid(): number {
    return this.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
  }
}

export class Day7 {
  static solve(input: string): number {
    const hands = new Hands(
      input
        .split(/[\r\n]+/)
        .filter(Boolean)
        .map((line) => {
          const [hand, bid] = line.split(/\s+/);
          return new Hand(hand, +bid);
        })
    );
    return hands.sortByStrength().getTotalBid();
  }
}
