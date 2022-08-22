import _ from 'lodash';

import type { Card } from '$types/poker';

const RANKINGS = {
    royalFlush: 9,
    straightFlush: 8,
    fourOfAKind: 7,
    fullHouse: 6,
    flush: 5,
    straight: 4,
    threeOfAKind: 3,
    twoPair: 2,
    pair: 1,
    highCard: 0,
} as const;

const isSeqIncrementN = (n: number) => {
    return (arr: Card[]) => {
        return (
            arr.reduce<Card | null>(
                (prev, curr) => (!prev || curr.order - prev.order !== n ? null : curr),
                null,
            ) === _.last(arr)
        );
    };
};

const hasNSame = (n: number, grouped: _.Dictionary<Card[]>) => {
    return _.chain(grouped)
        .mapValues((v) => v.length === n)
        .findKey(Boolean)
        .value();
};

const getPlayerRank = (playerHand: Card[]) => {
    const hand = _.sortBy(playerHand, 'order');
    const firstCard = _.first(hand);
    const isSameSuit = _.every(hand, (v) => v.suit === firstCard?.suit);

    const isStraight = isSeqIncrementN(1)(hand);

    const isRoyalFlush =
        isSameSuit && isStraight && firstCard?.suit === 'hearts' && firstCard?.rank === 10;

    const isStraightFlush = isStraight && isSameSuit;

    const groupedByRank = _.groupBy(hand, 'rank');

    const isFourOfAKind = hasNSame(4, groupedByRank);

    const threeOfAKind = hasNSame(3, groupedByRank);

    const pairs = _.chain(groupedByRank)
        .mapValues((v) => v.length === 2)
        .omitBy((v) => !v)
        .keys()
        .value();

    const hasTwoPair = pairs.length === 2;
    const hasOnePair = pairs.length === 1;
    const hasFullHouse = threeOfAKind && hasTwoPair;

    if (isRoyalFlush) return { ranking: RANKINGS.royalFlush };
    if (isStraightFlush) return { ranking: RANKINGS.straightFlush };
    if (isFourOfAKind) return { ranking: RANKINGS.fourOfAKind };
    if (hasFullHouse) return { ranking: RANKINGS.fullHouse };
    if (isSameSuit) return { ranking: RANKINGS.flush };
    if (isStraight) return { ranking: RANKINGS.straight };
    if (threeOfAKind) return { ranking: RANKINGS.threeOfAKind };
    if (hasTwoPair) return { ranking: RANKINGS.twoPair };
    if (hasOnePair) return { ranking: RANKINGS.pair };
    return { ranking: RANKINGS.highCard };
};

export const calculateWinner = ({ player1, player2 }: { player1: Card[]; player2: Card[] }) => {
    const rank1 = getPlayerRank(player1);
    const rank2 = getPlayerRank(player2);

    if (rank1.ranking === rank2.ranking) {
        // TODO: Handle same ranking
    }

    return rank1.ranking > rank2.ranking ? 'Player 1' : 'Quantum AI';
};
