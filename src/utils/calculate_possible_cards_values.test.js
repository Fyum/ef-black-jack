import calculatePossibleCardsValues from './calculate_possible_cards_values';

it('should calculate the possible cards values without duplicates', () => {
  const input = [
    { values: [1, 11] },
    { values: [2] },
    { values: [1, 11] }
  ];

  const actual = calculatePossibleCardsValues(input);
  const expected = [4, 14, 24];

  expect(actual)
    .toEqual(expected);
});