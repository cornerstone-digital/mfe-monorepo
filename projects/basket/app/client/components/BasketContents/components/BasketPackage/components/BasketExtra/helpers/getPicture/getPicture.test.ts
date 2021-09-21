import getServiceImage from '../getServiceImage'
import getPicture from './getPicture'

jest.mock('../getServiceImage', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(name => {
    return name === 'image' ? 'mock-image' : ''
  }),
}))

describe('getPicture', () => {
  it.each`
    isEngineer | isFixedLine | isHBB    | isInsurance | name       | output
    ${true}    | ${false}    | ${false} | ${false}    | ${''}      | ${{ icon: 'engineer', iconIsVisible: false }}
    ${false}   | ${true}     | ${false} | ${false}    | ${''}      | ${{ icon: 'fixed-line', iconIsVisible: false }}
    ${false}   | ${false}    | ${true}  | ${false}    | ${''}      | ${{ icon: 'mobile-broadband', iconIsVisible: false }}
    ${false}   | ${false}    | ${false} | ${true}     | ${''}      | ${{ icon: 'insurance', iconIsVisible: true }}
    ${false}   | ${false}    | ${false} | ${false}    | ${'image'} | ${{ image: 'mock-image', iconIsVisible: false }}
    ${false}   | ${false}    | ${false} | ${false}    | ${''}      | ${{ icon: 'add-or-plus', iconIsVisible: false }}
  `('should return with $output', ({ isEngineer, isFixedLine, isHBB, isInsurance, name, output }) => {
    expect(getPicture(isEngineer, isFixedLine, isHBB, isInsurance, name)).toEqual(output)
    if (name) {
      expect(getServiceImage).toBeCalledWith(name)
    }
  })
})
