import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getModalPromptVisibility from './getModalPromptVisibility'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(true),
}))

describe('getModalPromptVisibility', () => {
  beforeAll(() => {
    jest.spyOn(getABTestFeatureValue, 'default').mockImplementation(param => param === 'planBenefitsAB')
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
    expect(getModalPromptVisibility(isHandset, isPayg, isSimo)).toBe(expected)
  })

  test('should return false if chevron is visible', () => {
    jest.spyOn(getABTestFeatureValue, 'default').mockImplementation(() => true)
    expect(getModalPromptVisibility(true, true, true)).toBe(false)
    jest.resetAllMocks()
  })
})
