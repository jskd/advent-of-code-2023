export class Card {
  // prettier-ignore
  static readonly map: Record<string, number> = {
    "2": 0x2, "3": 0x3, "4": 0x4, "5": 0x5, "6": 0x6, "7": 0x7, "8": 0x8, "9": 0x9, 
    "T": 0xa, "J": 0xb, "Q": 0xc, "K": 0xd, "A": 0xe
  };

  /** Joker */
  static readonly J = Card.map["J"];

  /** Weak joker */
  static readonly W = 0x1;
}

export class Hand {
  readonly strength: number;

  constructor(
    readonly cards: number[],
    readonly bid: number,
    withJoker: boolean
  ) {
    this.strength = Hand.getStrengthHand(cards, withJoker);
  }

  static mapCardStrength(cards: string): number[] {
    return [...cards].map((cp) => Card.map[cp]);
  }

  static mapJokerAsWildcard(cards: number[]) {
    const matchs: Record<string, number> = {};
    cards
      .filter((card) => card != Card.J)
      .forEach((card) => (matchs[card] = (matchs[card] || 0) + 1));

    const bestMatch = Object.entries(matchs)
      .sort((a, b) => b[1] - a[1]) // sort by key in reverse order
      .shift()?.[0];
    return !bestMatch
      ? cards
      : cards.map((card) => (card == Card.J ? +bestMatch : card));
  }

  static mapJokerAsWeakest(cards: number[]): number[] {
    return cards.map((card) => (card == Card.J ? Card.W : card));
  }

  static getStrenghtMatch(cards: number[]): number {
    const matchs: Record<string, number> = {};
    cards.forEach((card) => (matchs[card] = (matchs[card] || 0) + 1));
    const [high, low] = Object.values(matchs).sort().reverse();
    return (high << 4) | low;
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
          const [cards, bid] = line.split(/\s+/);
          return new Hand(Hand.mapCardStrength(cards), +bid, withJoker);
        })
    );
    return hands.sortByStrength().getTotalBid();
  }
}
