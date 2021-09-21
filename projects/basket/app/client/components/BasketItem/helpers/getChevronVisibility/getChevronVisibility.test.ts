import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getChevronVisibility from './getChevronVisibility'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

describe('getChevronVisibility', () => {
  beforeAll(() => {
    jest.spyOn(getABTestFeatureValue, 'default').mockImplementationOnce(() => true)
  })

  it.each`
    isHandset | isPayg   | isSimo   | expected
    ${true}   | ${false} | ${false} | ${true}
    ${true}   | ${true}  | ${false} | ${false}
    ${true}   | ${true}  | ${true}  | ${true}
    ${true}   | ${false} | ${true}  | ${true}
    ${false}  | ${false} | ${false} | ${false}
    ${false}  | ${true}  | ${true}  | ${true}
    ${false}  | ${true}  | ${false} | ${false}
    ${false}  | ${false} | ${true}  | ${true}
  `(`should return $expected if proper values provided`, ({ isHandset, isPayg, isSimo, expected }) => {
    expect(getChevronVisibility(isHandset, isPayg, isSimo)).toBe(expected)
  })
})
