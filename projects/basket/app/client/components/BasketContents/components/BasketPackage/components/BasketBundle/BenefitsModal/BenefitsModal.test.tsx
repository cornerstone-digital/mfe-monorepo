import renderWithProviders from '@helpers/renderWithProviders'
import { fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import BenefitsModal from './BenefitsModal'

jest.mock('@vfuk/core-modal')

const mockItems: string[] = ['Unlimited Call']

describe('BenefitsModal', () => {
  it('should not display content by default', async () => {
    const { queryByText } = renderWithProviders(<BenefitsModal items={mockItems} bullets />)
    expect(queryByText(mockItems[0])).not.toBeInTheDocument()
  })

  it('should open modal if modal prompt was clicked', async () => {
    const mockOnClick = jest.fn()
    const { getAllByRole, getByText } = renderWithProviders(<BenefitsModal items={mockItems} bullets onClick={mockOnClick} />)
    const button = getAllByRole('button')[0]
    await act(async () => {
      fireEvent.click(button)
    })
    expect(getByText(mockItems[0])).toBeInTheDocument()
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('and should close if modal close button was clicked', async () => {
    const { getAllByRole, queryByText, getByLabelText } = renderWithProviders(<BenefitsModal items={mockItems} bullets />)
    const button = getAllByRole('button')[0]
    await act(async () => {
      fireEvent.click(button)
    })
    const closeButton = getByLabelText('close')
    await act(async () => {
      await fireEvent.click(closeButton)
    })
    expect(queryByText(mockItems[0])).not.toBeInTheDocument()
  })
})
