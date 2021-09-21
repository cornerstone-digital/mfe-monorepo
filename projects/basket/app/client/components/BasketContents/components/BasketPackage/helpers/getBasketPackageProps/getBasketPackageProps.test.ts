import { PackageWithHeaderStatus } from '../../BasketPackage.types'
import getBasketPackageProps from './getBasketPackageProps'

describe('getBasketPackageProps', () => {
  it('should return with basket package props', () => {
    const mockItem = { headerStatus: 'present', packageId: 'test-id', planType: 'DATA_SIMO' } as PackageWithHeaderStatus
    const expectedResult = {
      headerStatus: 'present',
      packageId: 'test-id',
      changePackageLink: '/data-only-sim',
    }
    expect(getBasketPackageProps(mockItem, 'Consumer', {} as any)).toEqual(expect.objectContaining(expectedResult))
  })

  it('should call onRemovePackage if onRemove is called', () => {
    const mockStore = { onRemovePackage: jest.fn() } as any
    const { onRemove } = getBasketPackageProps({ packageId: 'test-id' }, 'Consumer', mockStore)
    onRemove()
    expect(mockStore.onRemovePackage).toHaveBeenCalledWith('test-id')
  })

  it('should call onUndoRemovePackage if onUndo is called', () => {
    const mockStore = { onUndoRemovePackage: jest.fn() } as any
    const expectedResult = {
      accountCategory: 'Consumer',
      basketId: undefined,
      bundleId: undefined,
      contractOptions: undefined,
      isUpgrade: false,
      packageId: undefined,
      packageType: 'Acquisition',
      tradeInCredit: undefined,
    }
    const { onUndo } = getBasketPackageProps({}, 'Consumer', mockStore, 'test-primary-id')
    onUndo()
    expect(mockStore.onUndoRemovePackage).toHaveBeenCalledWith('test-primary-id', expectedResult, [])
  })
})
