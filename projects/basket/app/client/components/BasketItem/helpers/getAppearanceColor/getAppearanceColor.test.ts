import getAppearanceColor from './getAppearanceColor'

describe('getAppearanceColor', () => {
  const price = '14.55'
  const discountPrice = '9.55'
  it.each`
    isFlexiBanner | isUpgrade | expected
    ${false}      | ${false}  | ${'brand'}
    ${false}      | ${true}   | ${'blue'}
    ${true}       | ${false}  | ${'blue'}
    ${true}       | ${true}   | ${'blue'}
  `(`should return $expected if discount price is provided`, ({ isFlexiBanner, isUpgrade, expected }) => {
    expect(getAppearanceColor(price, discountPrice, true, isFlexiBanner, isUpgrade)).toBe(expected)
  })

  it.each`
    isFlexiBanner | isUpgrade | expected
    ${false}      | ${false}  | ${'brand'}
    ${false}      | ${true}   | ${'blue'}
    ${true}       | ${false}  | ${'blue'}
    ${true}       | ${true}   | ${'blue'}
  `(`should return $expected if discount banner is provided without prices`, ({ isFlexiBanner, isUpgrade, expected }) => {
    expect(getAppearanceColor('', '', true, isFlexiBanner, isUpgrade)).toBe(expected)
  })
})
