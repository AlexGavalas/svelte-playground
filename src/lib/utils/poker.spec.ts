import { expect, test } from 'vitest';

import { calculateWinner } from './poker';
import type { Card } from '$types/poker';

const PLAYER1_WINS = 'Player 1';

test('Player 1 [straight] wins player 2 [pair]', () => {
    const player1: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'hearts' },
        { order: 2, rank: 4, suit: 'clubs' },
        { order: 3, rank: 5, suit: 'hearts' },
        { order: 4, rank: 6, suit: 'clubs' },
    ];

    const player2: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'hearts' },
        { order: 3, rank: 5, suit: 'clubs' },
        { order: 4, rank: 6, suit: 'clubs' },
    ];

    const winner = calculateWinner({ player1, player2 });

    expect(winner).toEqual(PLAYER1_WINS);
});

test('Player 1 [flush] wins player 2 [straight]', () => {
    const player1: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'clubs' },
        { order: 2, rank: 4, suit: 'clubs' },
        { order: 3, rank: 5, suit: 'clubs' },
        { order: 4, rank: 6, suit: 'clubs' },
    ];

    const player2: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'clubs' },
        { order: 2, rank: 4, suit: 'hearts' },
        { order: 3, rank: 5, suit: 'clubs' },
        { order: 4, rank: 6, suit: 'clubs' },
    ];

    const winner = calculateWinner({ player1, player2 });

    expect(winner).toEqual(PLAYER1_WINS);
});

test('Player 1 [two pair] wins player 2 [pair]', () => {
    const player1: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'hearts' },
        { order: 4, rank: 6, suit: 'clubs' },
        { order: 4, rank: 6, suit: 'hearts' },
    ];

    const player2: Card[] = [
        { order: 0, rank: 2, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'clubs' },
        { order: 1, rank: 3, suit: 'hearts' },
        { order: 3, rank: 5, suit: 'clubs' },
        { order: 4, rank: 6, suit: 'clubs' },
    ];

    const winner = calculateWinner({ player1, player2 });

    expect(winner).toEqual(PLAYER1_WINS);
});
