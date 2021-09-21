import { fireEvent, render } from '@testing-library/react'
import { BasketHardwareWithHeaderStatus } from '@pages/BasketPage/BasketPage.types'

import BasketAccessory from './BasketAccessory'

const defaultProps = {
  packageId: 'MOCK_PACKAGE_ID',
  accessory: {
    displayName: 'My mock accessory',
    packageLineId: '12345',
    skuId: 'MOCK_SKU_ID',
    priceDetails: {
      oneOffPrice: {
        gross: '0',
        net: '0',
        vat: '0',
      },
      monthlyPrice: {
        gross: '20',
        net: '16',
        vat: '4',
      },
    },
  },
  isBusiness: false,
}

describe('<BasketAccessory />', () => {
  it('renders correctly', () => {
    const { getByText } = render(<BasketAccessory {...defaultProps} />)
    expect(getByText('My mock accessory')).toBeInTheDocument()
    expect(getByText('£20')).toBeInTheDocument()
  })

  it('renders correctly as business', () => {
    const { getByText } = render(<BasketAccessory {...defaultProps} isBusiness={true} />)
    expect(getByText('My mock accessory')).toBeInTheDocument()
    expect(getByText('£16')).toBeInTheDocument()
  })

  it('should call onRemove handler', () => {
    const mockOnRemove = jest.fn()
    const { getByText } = render(<BasketAccessory {...defaultProps} onRemoveAddOn={mockOnRemove} onUndoRemoveAddOn={jest.fn()} />)
    const removeButton = getByText('Remove')
    expect(removeButton).toBeInTheDocument()
    fireEvent.click(removeButton)
    expect(mockOnRemove).toHaveBeenCalledWith('MOCK_PACKAGE_ID', '12345', 'MOCK_SKU_ID')
  })

  it('should call onUndoRemove handler', async () => {
    const mockUndoRemove = jest.fn()
    const mockAccessory: BasketHardwareWithHeaderStatus = { ...defaultProps.accessory, headerStatus: 'removed' }
    const { getByText } = render(
      <BasketAccessory {...defaultProps} accessory={mockAccessory} onUndoRemoveAddOn={mockUndoRemove} onRemoveAddOn={jest.fn()} />,
    )
    const removeButton = getByText('Undo')
    expect(removeButton).toBeInTheDocument()
    fireEvent.click(removeButton)
    expect(mockUndoRemove).toHaveBeenCalledWith('MOCK_PACKAGE_ID', 'MOCK_SKU_ID', 'HARDWARE')
  })
})
