import _ from 'lodash';
import type { PageLoad } from './$types';
import type { Card, Suit } from '$types/poker';

const ranks = [...Array.from({ length: 9 }, (_, i) => i + 2), 'j', 'q', 'k', 'a'];
const suits: Suit[] = ['spades', 'hearts', 'clubs', 'diams'];

export const load: PageLoad<{
    body: {
        deck: Card[];
        player1: Card[]; // [Card, Card, Card, Card, Card];
        player2: Card[]; // [Card, Card, Card, Card, Card];
    };
}> = async () => {
    const fullDeck = _.shuffle(
        suits.flatMap((suit) => {
            return ranks.map((rank, order) => ({ suit, rank, order }));
        }),
    );

    const [player1, player2] = _.chunk(_.take(fullDeck, 10), 5);

    if (player1.length !== 5 || player2.length !== 5) {
        throw new Error('Invalid number of player cards!');
    }

    const deck = fullDeck.slice(10);

    return {
        body: {
            deck,
            player1,
            player2,
        },
    };
};
