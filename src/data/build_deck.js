import RANK from './rank';
import SUIT from './suit';


const PICTURE_CARD_RANKS = [
  RANK.KING,
  RANK.QUEEN,
  RANK.JACK,
];

const isPictureCardRank = (rank) =>
  PICTURE_CARD_RANKS.includes(rank);

const buildRankCards = (suit) =>
  Object
    .keys(RANK)
    .map(rank => {
      const card = { rank, suit };
      if (isPictureCardRank(rank)) {
        return { ...card, values: [10] };
      }

      switch (rank) {
        case RANK.ACE:
          return { ...card, values: [1, 11] };
        case RANK.TWO:
          return { ...card, values: [2] };
        case RANK.THREE:
          return { ...card, values: [3] };
        case RANK.FOUR:
          return { ...card, values: [4] };
        case RANK.FIVE:
          return { ...card, values: [5] };
        case RANK.SIX:
          return { ...card, values: [6] };
        case RANK.SEVEN:
          return { ...card, values: [7] };
        case RANK.EIGHT:
          return { ...card, values: [8] };
        case RANK.NINE:
          return { ...card, values: [9] };
        case RANK.TEN:
          return { ...card, values: [10] };
        default: throw new Error(`Invalid rank found ${rank}`);
      }
    });


const buildSuitAndRankCards = () =>
  Object
    .keys(SUIT)
    .map(buildRankCards)

const randomSort = () => Math.random() - 0.5;

const flattenArray = (acc, curr) => [...acc, ...curr];

const buildDeck = () =>
  buildSuitAndRankCards()
    .reduce(flattenArray, [])
    .sort(randomSort)

export default buildDeck;