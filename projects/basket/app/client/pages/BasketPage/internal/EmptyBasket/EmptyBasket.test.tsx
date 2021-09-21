import { fireEvent, render } from '@testing-library/react'

import EmptyBasket from './EmptyBasket'
import * as storeHooks from '@store'

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() => ({ pageUiStore: { toggleModal: () => {} } })),
}))

describe('EmptyBasket', () => {
  it('should render default content', () => {
    const { getByText } = render(<EmptyBasket />)

    expect(getByText('Your basket is empty')).toBeInTheDocument()
    expect(getByText('Continue shopping')).toBeInTheDocument()
  })

  it('should call toggleModal if clicked on button', () => {
    const toggleModal = jest.fn()
    const mockBasket = { pageUiStore: { toggleModal } } as any
    jest.spyOn(storeHooks, 'useStore').mockImplementationOnce(() => mockBasket)
    const { getByText } = render(<EmptyBasket />)
    const button = getByText('Continue shopping')
    fireEvent.click(button)

    expect(toggleModal).toHaveBeenCalled()
  })
})
