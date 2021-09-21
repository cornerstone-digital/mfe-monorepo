import sortByObjectProperty from './sortByObjectProperty'

test('it should sort array of items in ascending order by property values', () => {
  const testArr = [{ sequence: 1 }, { sequence: 4 }, { sequence: 2 }, { sequence: 6 }, { sequence: 3 }, { sequence: 5 }]
  const result = testArr.sort((a, b) => sortByObjectProperty('sequence', a, b))
  expect(result).toEqual([{ sequence: 1 }, { sequence: 2 }, { sequence: 3 }, { sequence: 4 }, { sequence: 5 }, { sequence: 6 }])
})

test('it should still sort correctly even with null values', () => {
  const testArr = [{ sequence: 40 }, { sequence: null }, { sequence: 21 }]
  const result = testArr.sort((a, b) => sortByObjectProperty('sequence', a, b))
  expect(result).toEqual([{ sequence: null }, { sequence: 21 }, { sequence: 40 }])
})

test('it should still sort correctly even value is a string', () => {
  const testArr = [{ sequence: '40' }, { sequence: null }, { sequence: 21 }]
  const result = testArr.sort((a, b) => sortByObjectProperty('sequence', a, b))
  expect(result).toEqual([{ sequence: null }, { sequence: 21 }, { sequence: '40' }])
})
