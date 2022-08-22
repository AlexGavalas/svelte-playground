export type Suit = 'spades' | 'hearts' | 'clubs' | 'diams';

export type Card = {
    suit: Suit;
    rank: string | number;
    order: number;
};
