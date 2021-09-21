import renderWithProviders from '@helpers/renderWithProviders'
import SpeedInfoModal from './SpeedInfoModal'

import { ThemeProvider } from 'styled-components'
import theme from '@vfuk/core-theme-ws2'
import { SpeedInfoModalProps } from './SpeedInfoModal.types'
import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/dom'
import { waitFor } from '@testing-library/react'

jest.mock('@vfuk/core-modal')

describe('<SpeedInfoModal />', () => {
  const renderSpeedInfoModal = (props?: SpeedInfoModalProps) => {
    const defaultProps = { onClose: jest.fn() }
    return renderWithProviders(
      <ThemeProvider theme={theme}>
        <SpeedInfoModal {...defaultProps} {...props} />
      </ThemeProvider>,
    )
  }

  test('should render properly', async () => {
    const { getByText } = renderSpeedInfoModal()

    await waitFor(() => {
      expect(getByText('Details on speed')).toBeInTheDocument()
    })
    expect(getByText('Mobile speed explained')).toBeInTheDocument()
    expect(getByText('How much speed do I need?')).toBeInTheDocument()
    expect(getByText('Plan type')).toBeInTheDocument()
    expect(getByText('Unlimited Lite')).toBeInTheDocument()
  })

  test('should call onClose on prop if Modal is closed', async () => {
    const mockOnClose = jest.fn()
    const { getByLabelText } = renderSpeedInfoModal({ onClose: mockOnClose })

    const button = getByLabelText('close')

    await act(async () => {
      fireEvent.click(button)
    })
    expect(mockOnClose).toHaveBeenCalled()
  })
})
