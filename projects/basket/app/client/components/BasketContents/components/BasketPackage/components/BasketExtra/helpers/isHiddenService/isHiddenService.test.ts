import { ServiceValues } from '../../../PackageItemList/PackageItemList.types'
import isHiddenService, { isExtraHidden, isExtraHiddenEngineer } from './isHiddenService'

describe('isHiddenService', () => {
  it('should return true if `isExtraHidden` or `isExtraHiddenEngineer` is true', () => {
    const mockService: ServiceValues = {
      isExtra: true,
      action: 'retain',
      name: 'fee for flexi-upgrade',
      headerStatus: 'removing',
      productClass: 'fee',
      priceDetails: { oneOffPrice: { net: '0', gross: '0' } },
      description: 'test description',
      displayDescription: 'installation',
    }
    expect(isHiddenService(mockService, true))
  })
  it('should return true if `isExtraHidden` and `isExtraHiddenEngineer` is false', () => {
    const mockService: ServiceValues = {
      isExtra: false,
      action: 'retain',
      name: 'test name',
      headerStatus: 'removing',
      productClass: 'fee',
      priceDetails: { oneOffPrice: { net: '0', gross: '0' } },
      description: 'test description',
      displayDescription: 'installation',
    }
    expect(isHiddenService(mockService, false))
  })
})

describe('isExtraHidden', () => {
  it.each`
    isExtra  | action        | name                       | headerStatus     | productClass    | output
    ${true}  | ${'add'}      | ${'fee for flexi-upgrade'} | ${'test status'} | ${'test class'} | ${false}
    ${true}  | ${'retain'}   | ${'fee for flexi-upgrade'} | ${'removing'}    | ${'fee'}        | ${true}
    ${true}  | ${'removed'}  | ${'test name'}             | ${'test status'} | ${'test class'} | ${false}
    ${true}  | ${'removing'} | ${'test name'}             | ${'removing'}    | ${'add'}        | ${false}
    ${true}  | ${'test'}     | ${'fee for flexi-upgrade'} | ${'test status'} | ${'test class'} | ${false}
    ${true}  | ${'test'}     | ${'fee for flexi-upgrade'} | ${'removing'}    | ${'fee'}        | ${true}
    ${true}  | ${'test'}     | ${'test name'}             | ${'test status'} | ${'test class'} | ${false}
    ${true}  | ${'test'}     | ${'test name'}             | ${'removing'}    | ${'fee'}        | ${false}
    ${false} | ${'add'}      | ${'fee for flexi-upgrade'} | ${'test status'} | ${'test class'} | ${false}
    ${false} | ${'retain'}   | ${'fee for flexi-upgrade'} | ${'removing'}    | ${'fee'}        | ${true}
    ${false} | ${'removed'}  | ${'test name'}             | ${'test status'} | ${'test class'} | ${false}
    ${false} | ${'removing'} | ${'test name'}             | ${'removing'}    | ${'add'}        | ${false}
    ${false} | ${'test'}     | ${'fee for flexi-upgrade'} | ${'test status'} | ${'test class'} | ${true}
    ${false} | ${'test'}     | ${'fee for flexi-upgrade'} | ${'removing'}    | ${'fee'}        | ${true}
    ${false} | ${'test'}     | ${'test name'}             | ${'test status'} | ${'test class'} | ${true}
    ${false} | ${'test'}     | ${'test name'}             | ${'removing'}    | ${'fee'}        | ${false}
  `('should return with $output', ({ isExtra, action, name, headerStatus, productClass, output }) => {
    expect(isExtraHidden({ isExtra, action, name, headerStatus, productClass })).toEqual(output)
  })
})

describe('isExtraHiddenEngineer', () => {
  it.each`
    displayDescription    | description           | name           | priceDetails                                  | isBusiness | output
    ${'engineer'}         | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '8', gross: '10' } }} | ${true}    | ${false}
    ${'test description'} | ${'engineer'}         | ${'test name'} | ${{ oneOffPrice: { net: '8', gross: '10' } }} | ${true}    | ${false}
    ${'test description'} | ${'test description'} | ${'engineer'}  | ${{ oneOffPrice: { net: '8', gross: '10' } }} | ${true}    | ${false}
    ${'test description'} | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '8', gross: '10' } }} | ${true}    | ${false}
    ${'installation'}     | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '0', gross: '0' } }}  | ${true}    | ${true}
    ${'installation'}     | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '0', gross: '0' } }}  | ${false}   | ${true}
    ${'test description'} | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '0', gross: '0' } }}  | ${true}    | ${false}
    ${'test description'} | ${'test description'} | ${'test name'} | ${{ oneOffPrice: { net: '0', gross: '0' } }}  | ${false}   | ${false}
  `('should return with $output', ({ displayDescription, description, name, priceDetails, isBusiness, output }) => {
    expect(isExtraHiddenEngineer({ displayDescription, description, name, priceDetails }, isBusiness)).toEqual(output)
  })
})
