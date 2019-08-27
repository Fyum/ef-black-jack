import React, { useEffect, useState } from 'react';
import buildDeck from '../data/build_deck';
import calculatePossibleCardsValues from '../utils/calculate_possible_cards_values';

const WINNING_VALUE = 21;

const Game = () => {

  const [deck, setDeck] = useState(buildDeck());
  const [playerHand, setPlayerHand] = useState({ value: 0, cards: [] });
  const [dealerHand, setDealerHand] = useState({ value: 0, cards: [] });
  const [isFinished, setIsFinished] = useState(false);
  const [message, setMessage] = useState('Hit or Stick?');

  useEffect(() => {
    if (playerHand.cards.length <= 1) {
      pickPlayerCardFromDeck();
      return;
    }
    if (playerHand.value > WINNING_VALUE) {
      setIsFinished(true);
      setMessage('You lost');
    }

    if (playerHand.value === WINNING_VALUE) {
      setIsFinished(true);
      setMessage('You won');
    }
  }, [playerHand]);

  useEffect(() => {
    if (dealerHand.cards.length === 1) {
      // Initial pick by the dealer
      return;
    }

    if (dealerHand.value > WINNING_VALUE) {
      setIsFinished(true);
      setMessage('You won');
      return;
    }

    if (dealerHand.value > playerHand.value || dealerHand.value === WINNING_VALUE) {
      setIsFinished(true);
      setMessage('You lost');
      return;
    }

    pickDealerCardFromDeck();
  }, [dealerHand]);

  const pickPlayerCardFromDeck = () => {
    if (deck.length) {
      const randomCard = deck.shift();
      const newCards = [...playerHand.cards, randomCard];
      const newValue = calculateCardsValue(newCards);
      setPlayerHand({ cards: newCards, value: newValue });
      setDeck([...deck]);
    }
  }

  const pickDealerCardFromDeck = () => {
    if (deck.length) {
      const randomCard = deck.shift();
      const newCards = [...dealerHand.cards, randomCard];
      const newValue = calculateCardsValue(newCards);
      setDealerHand({ cards: newCards, value: newValue });
      setDeck([...deck]);
    }
  }

  const calculateCardsValue = (cards) => {
    const possibleValues = calculatePossibleCardsValues(cards);
    if (possibleValues.includes(WINNING_VALUE)) {
      return WINNING_VALUE;
    }

    return Math.min(...possibleValues);
  }

  const doRestart = () => {
    setIsFinished(false);
    setMessage('Hit or Stick?');
    setDeck(buildDeck());
    setDealerHand({ value: 0, cards: [] });
    setPlayerHand({ value: 0, cards: [] });
  }

  const displayHand = (hand, name) =>
    (
      <p>
        <b>{name} cards:</b>
        {
          hand.cards.map(card =>
            <div>
              {card.rank} - {card.suit}
            </div>
          )
        }
        {name} score: {hand.value}
      </p>
    )
  return (
    <div>
      {dealerHand && displayHand(dealerHand, 'Dealer')}
      {playerHand && displayHand(playerHand, 'Player')}

      <p>{message}</p>
      <div>
        {
          !isFinished
            ? <div>
              <button onClick={pickPlayerCardFromDeck}>Hit</button>
              <button onClick={pickDealerCardFromDeck}>Stick</button>
            </div>
            : <div>
              <button onClick={doRestart}>Restart</button>
            </div>
        }
      </div>

      <p>Deck {deck.length}</p>
    </div>
  )
};

export default Game;