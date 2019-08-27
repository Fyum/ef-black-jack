import combineArraysValues from './combine_arrays_values';

const sumArray = (array) =>
  array.reduce((acc, curr) => acc + curr);

const unique = (item, i, array) =>
  array.indexOf(item) === i;

const calculatePossibleCardsValues = (cards) => {
  const allValues = cards.map(({ values }) => values);
  const allCombinations = combineArraysValues(allValues);
  return allCombinations
    .map(sumArray)
    .filter(unique)
};

export default calculatePossibleCardsValues;