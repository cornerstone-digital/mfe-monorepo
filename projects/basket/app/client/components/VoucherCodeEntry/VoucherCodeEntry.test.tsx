import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VoucherCodeEntry from './VoucherCodeEntry'
import * as storeHooks from '@store'

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({ basketStore: { basket: {} } })),
}))

describe('<VoucherCodeEntry />', () => {
  const voucherCode = 'voucher123'

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should display applied promotion if code is provided', () => {
    const mockStore = { basketStore: { basket: { voucherCode } } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { getByText } = render(<VoucherCodeEntry />)

    expect(getByText('Applied promotion')).toBeInTheDocument()
    expect(getByText('Remove')).toBeInTheDocument()
  })

  test('should call onVoucherSubmit method with correct Voucher code', async () => {
    const spyFn = jest.fn()
    const mockStore = { basketStore: { basket: { voucherCode }, onVoucherSubmit: spyFn } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { getByText, getByLabelText } = render(<VoucherCodeEntry />)
    const userInput = getByLabelText('You can apply 1 promotional code per basket') as HTMLInputElement
    userEvent.type(userInput, voucherCode)
    expect(userInput.value).toEqual(voucherCode)
    fireEvent.click(getByText('Update basket'))
    await waitFor(() => {
      expect(spyFn).toHaveBeenCalledWith(voucherCode)
    })
  })

  test('should call handleRemoveVoucher upon code removal', async () => {
    const spyFn = jest.fn()
    const mockStore = { basketStore: { basket: { voucherCode }, handleRemoveVoucher: spyFn } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { getByText } = render(<VoucherCodeEntry />)
    fireEvent.click(getByText('Remove'))
    await waitFor(() => {
      expect(spyFn).toHaveBeenCalled()
    })
  })

  test('should display promotional code limit', () => {
    const mockStore = { basketStore: { basket: { voucherCode } } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementation(() => mockStore)
    const { getByText } = render(<VoucherCodeEntry />)
    expect(getByText('You can apply 1 promotional code per basket')).toBeInTheDocument()
  })
})
