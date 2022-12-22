<script lang="ts">
    import _ from 'lodash';
    import type { Card, Suit } from '$types/poker';
    import { calculateWinner } from '$lib/utils/poker';
    import Button from '$lib/components/Button.svelte';
    import '$lib/styles/card.css';

    const ranks = [...Array.from({ length: 9 }, (_, i) => i + 2), 'j', 'q', 'k', 'a'];
    const suits: Suit[] = ['spades', 'hearts', 'clubs', 'diams'];
    const MAX_CARDS_TO_CHANGE = 3;

    export let data: {
        body: {
            deck: Card[];
            player1: Card[];
            player2: Card[];
        };
    };

    let {
        body: { deck, player1, player2 },
    } = data;

    let showWinner = false;
    let hasChangedCards = false;
    let s = new Set<Card>();

    const toggleSelected = (card: Card) => {
        const prevSetting = s.has(card);

        if (!prevSetting && s.size === MAX_CARDS_TO_CHANGE) return;

        prevSetting ? s.delete(card) : s.add(card);

        s = new Set(s);
    };

    const changeCards = () => {
        const changedCards = [...s.values()];

        const newCards = _.take(deck, changedCards.length);
        deck = deck.slice(changedCards.length);

        player1 = player1.map((card) => {
            if (changedCards.includes(card) && newCards.length > 1) {
                const newCard = newCards.pop();

                if (!newCard) {
                    throw new Error('Not enough cards!');
                }

                return newCard;
            }

            return card;
        });

        s = new Set();
        hasChangedCards = true;
    };

    let winner = '';

    calculateWinner({ player1, player2 });

    const checkWinner = () => {
        showWinner = true;

        const r = calculateWinner({ player1, player2 });

        console.log(r);
    };

    const playAgain = () => {
        showWinner = false;
        hasChangedCards = false;

        const fullDeck = _.shuffle(
            suits.flatMap((suit) => {
                return ranks.map((rank, order) => ({ suit, rank, order }));
            }),
        );

        [player1, player2] = _.chunk(_.take(deck, 10), 5);
        deck = fullDeck.slice(10);
    };
</script>

<svelte:head>
    <title>Poker</title>
</svelte:head>

<div class="game-area">
    <div class="player2">
        <p>Opponent</p>
        <div class="hand">
            {#each player2 as card}
                {#if showWinner}
                    <div class="card rank-{card.rank} {card.suit}">
                        <div class="rank">{card.rank}</div>
                        <div class="suit" />
                    </div>
                {:else}
                    <div class="card back" />
                {/if}
            {/each}
        </div>
    </div>

    <div class="player1">
        <div class="hand">
            {#each player1 as card}
                <div
                    class="card rank-{card.rank} {card.suit}"
                    class:selected={s.has(card)}
                    on:click={() => !hasChangedCards && toggleSelected(card)}
                    on:keypress={() => !hasChangedCards && toggleSelected(card)}
                >
                    <div class="rank">{card.rank}</div>
                    <div class="suit" />
                </div>
            {/each}
        </div>
        <p>Your hand</p>
    </div>

    <div class="options">
        {winner}
        {#if showWinner}
            <Button on:click={playAgain}>Play again</Button>
        {:else}
            <Button disabled={hasChangedCards} on:click={changeCards}>Change selected cards</Button>
            <Button on:click={checkWinner}>Check who won</Button>
            <Button on:click={playAgain}>Play again</Button>
        {/if}
    </div>
</div>

<style>
    .game-area {
        display: grid;
        gap: 5rem;
        margin: 2rem;
    }

    .player1 {
        text-align: right;
        justify-self: flex-end;
    }

    .card {
        transition: transform 0.25s linear;
    }

    .selected {
        transform: translateY(-25px);
    }

    .options {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
</style>
