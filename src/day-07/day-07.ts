export class Hand {
  // prettier-ignore
  static readonly cardValue: Record<string, number> = {
    "2": 0x2, "3": 0x3, "4": 0x4, "5": 0x5, "6": 0x6, "7": 0x7, "8": 0x8, "9": 0x9, 
    "T": 0xa, "J": 0xb, "Q": 0xc, "K": 0xe, "A": 0xf
  };
  static readonly J = Hand.cardValue["J"];
  readonly strength: number;

  constructor(
    readonly cards: string,
    readonly bid: number,
    withJoker: boolean
  ) {
    this.strength = Hand.getStrengthHand(
      Hand.mapCardStrength(cards),
      withJoker
    );
  }

  static mapCardStrength(cards: string): number[] {
    return [...cards].map((cp) => Hand.cardValue[cp]);
  }

  static mapJokerAsWildcard(cards: number[]) {
    const matchs: Record<string, number> = {};
    cards
      .filter((v) => v != Hand.J)
      .forEach((card) => (matchs[card] = (matchs[card] || 0) + 1));

    const bestMatch = Object.entries(matchs)
      .sort((a, b) => b[1] - a[1]) // sort by key in reverse order
      .shift()?.[0];
    return !bestMatch
      ? cards
      : cards.map((card) => (card == Hand.J ? +bestMatch : card));
  }

  static mapJokerAsWeakest(cards: number[]): number[] {
    return cards.map((card) => (card == Hand.J ? 0x1 : card));
  }

  static getStrenghtMatch(cards: number[]): number {
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

  static getStrenghtOrder(cards: number[]): number {
    return cards.reduce((acc, card) => (acc << 4) | card, 0);
  }

  static getStrengthHand(cards: number[], withJoker: boolean) {
    const order = Hand.getStrenghtOrder(
      withJoker ? Hand.mapJokerAsWeakest(cards) : cards
    );
    const match = Hand.getStrenghtMatch(
      withJoker ? Hand.mapJokerAsWildcard(cards) : cards
    );
    return (match << 20) | order;
  }
}

class Hands extends Array<Hand> {
  sortByStrength(): Hands {
    return this.sort(({ strength: a }, { strength: b }) => a - b);
  }

  getTotalBid(): number {
    return this.reduce((acc, { bid }, index) => acc + bid * (index + 1), 0);
  }
}

export class Day7 {
  static solve(input: string, withJoker: boolean): number {
    const hands = new Hands(
      ...input
        .split(/[\r\n]+/)
        .filter(Boolean)
        .map((line) => {
          const [hand, bid] = line.split(/\s+/);
          return new Hand(hand, +bid, withJoker);
        })
    );
    return hands.sortByStrength().getTotalBid();
  }
}
