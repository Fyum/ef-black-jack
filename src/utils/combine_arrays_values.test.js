import combineArraysValues from './combine_arrays_values';

it('should combine the arrays with all possibilities', () => {
  const input = [
    [1, 11],
    [2],
    [1, 11],
  ];

  const actual = combineArraysValues(input);

  const expected = [
    [1, 2, 1],
    [1, 2, 11],
    [11, 2, 1],
    [11, 2, 11],
  ];

  expect(actual)
    .toEqual(expected);
});