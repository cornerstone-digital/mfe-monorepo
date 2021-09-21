import { fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import SwitchMyNetworkForm from './SwitchMyNetworkForm'
import { SwitchMyNetworkFormProps } from './SwitchMyNetworkForm.types'

import AnalyticsUtil from '@utilities/Analytics'
import renderWithProviders from '@helpers/renderWithProviders'

AnalyticsUtil.trackLink = jest.fn()
jest.mock('@components/SwitchMyNetworkModal/services/pacStacService', () => ({
  validate: (code: string, phoneNumber: string) => {
    return new Promise((resolve, reject) => {
      if (code === 'validcode') {
        resolve([
          {
            validPortDates: ['2021-05-10', '2021-05-11', '2021-05-12'],
            code,
            phoneNumber,
            date: '2021-05-10',
          },
        ])
      } else {
        reject('Mock error')
      }
    })
  },
}))

describe('<SwitchMyNetworkForm />', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  const mockProps: SwitchMyNetworkFormProps = {
    onRemove: jest.fn(),
    onSave: jest.fn(),
    onExit: jest.fn(),
    basket: {},
    portability: {},
    packageId: '',
    reviewMode: false,
  }

  test('should render with default text', () => {
    const { getByText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} />)
    expect(getByText('Select PAC or STAC code'))
    expect(getByText('Enter'))
    expect(getByText('Code'))
    expect(getByText('Mobile number'))
    expect(getByText('Network switch date'))
    expect(
      getByText(
        'You will be notified during checkout if your delivery date is after your transfer date as this could lead to a loss of service.',
      ),
    )
    expect(getByText('Save'))
    expect(getByText('I will transfer my service later'))
  })

  describe('error message', () => {
    test('should be visible if initially wrong code was given', async () => {
      renderWithProviders(<SwitchMyNetworkForm {...mockProps} portability={{ code: 'dummycode' }} />)

      expect(
        await screen.findByText('Sorry, your PAC or STAC code has become invalid since your last visit. Please fill out the form again.'),
      ).toBeInTheDocument()
      expect(AnalyticsUtil.trackLink).toBeCalled()
    })

    test('should be visible if wrong code or phone number is given', async () => {
      const { getByPlaceholderText, getByText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} />)
      const inputCode = getByPlaceholderText('E.g ABC123456')
      fireEvent.change(inputCode, { target: { value: 'dummycode' } })
      const inputPhone = getByPlaceholderText('E.g 07891234567')
      fireEvent.change(inputPhone, { target: { value: 'dummyphonenum' } })

      await act(async () => {
        fireEvent.click(getByText('Enter'))
      })

      expect(await screen.findByText('Code rejected. Please check your PAC or STAC code and phone number.')).toBeInTheDocument()
      expect(AnalyticsUtil.trackLink).toBeCalled()
    })
  })

  it.each`
    codeType  | placeholder
    ${'PAC'}  | ${'E.g ABC123456'}
    ${'STAC'} | ${'E.g 123ABCDEF'}
  `('should have "$codeType" heading text when $placeholder modal', ({ codeType, placeholder }) => {
    const { getByPlaceholderText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} portability={{ codeType }} />)
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  test('should allow change between codeType with radiobutton ', () => {
    const { getByLabelText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} />)
    expect(getByLabelText('PAC')).toBeChecked()
    fireEvent.click(getByLabelText('STAC'))
    expect(getByLabelText('STAC')).toBeChecked()
    fireEvent.click(getByLabelText('PAC'))
    expect(getByLabelText('PAC')).toBeChecked()
  })

  it.each`
    field             | value
    ${'code'}         | ${'dummycode'}
    ${'phone-number'} | ${'dummyphonenum'}
  `('should allow change "$field" value', ({ field, value }) => {
    const { container } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} />)
    const input = container.querySelector(`#${field}`) as HTMLInputElement
    fireEvent.change(input, { target: { value } })
    expect(input.value).toBe(value)
  })

  describe('validation button', () => {
    test('should have disabled state by default', () => {
      const { getByText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} />)
      expect(getByText('Enter')).toHaveAttribute('aria-disabled', 'true')
    })

    test('should have "Enter" text if wrong code is given', async () => {
      const { getByText } = renderWithProviders(
        <SwitchMyNetworkForm {...mockProps} portability={{ code: 'wrongcode', msisdn: 'validphonenum' }} />,
      )
      await waitFor(() => {
        expect(getByText('Enter')).toBeInTheDocument()
      })
    })

    test('should have "Success" text if code and phone number is given', async () => {
      const { getByText } = renderWithProviders(
        <SwitchMyNetworkForm {...mockProps} portability={{ code: 'validcode', msisdn: 'validphonenum' }} />,
      )
      await act(async () => {
        fireEvent.click(getByText('Enter'))
      })

      expect(getByText('Success')).toHaveAttribute('aria-disabled', 'false')
    })
  })

  test('should allow select from date if valid code and phone number is given', async () => {
    const { container, getByText } = renderWithProviders(
      <SwitchMyNetworkForm {...mockProps} portability={{ code: 'validcode', msisdn: 'validphonenum' }} />,
    )
    const dateSelect = container.querySelector('#date') as HTMLSelectElement

    await waitFor(() => {
      expect(dateSelect).not.toBeDisabled()
    })
    const saveButton = getByText('Save')
    expect(saveButton).toHaveAttribute('aria-disabled', 'true')
    fireEvent.change(dateSelect, { target: { value: '2021-05-10' } })
    expect(saveButton).toHaveAttribute('aria-disabled', 'false')
  })

  describe('handleSave', () => {
    test('should call onSave and onExit if saving is successful', async () => {
      const spyOnSave = jest.fn()
      const spyOnExit = jest.fn()
      const { getByText } = renderWithProviders(
        <SwitchMyNetworkForm
          {...mockProps}
          portability={{ code: 'validcode', msisdn: 'validphonenum', validPortDate: '2021-05-10' }}
          onSave={spyOnSave}
          onExit={spyOnExit}
        />,
      )
      const saveButton = getByText('Save')

      await waitFor(() => {
        expect(saveButton).toHaveAttribute('aria-disabled', 'false')
      })
      await waitFor(() => {
        fireEvent.click(saveButton)
      })
      expect(spyOnSave).toBeCalled()
      expect(spyOnExit).toBeCalled()
    })

    test('should show error if saving was unsuccessful', async () => {
      const spyOnSave = jest.fn(() => Promise.reject({ status: 'test-error', data: { errorMessage: 'test error message' } }))
      const trackSpy = jest.spyOn(AnalyticsUtil, 'trackLink')
      const { getByText, findByText } = renderWithProviders(
        <SwitchMyNetworkForm
          {...mockProps}
          portability={{ code: 'validcode', msisdn: 'validphonenum', validPortDate: '2021-05-10' }}
          onSave={spyOnSave}
        />,
      )
      const saveButton = getByText('Save')

      await waitFor(() => {
        expect(saveButton).toHaveAttribute('aria-disabled', 'false')
      })
      await act(async () => {
        fireEvent.click(saveButton)
      })

      expect(spyOnSave).toBeCalled()
      expect(trackSpy).toBeCalled()
      expect(
        await findByText(
          "Uh-oh, we couldn't save your code. Please try again. If the problem persists, don't worry you can provide us the code after you have received delivery of your order.",
        ),
      ).toBeInTheDocument()
    })
  })

  describe('handleRemove', () => {
    test('should call onRemove', async () => {
      const spyRemove = jest.fn()
      const { getByText } = renderWithProviders(
        <SwitchMyNetworkForm {...mockProps} onRemove={spyRemove} portability={{ status: 'VALID' }} />,
      )
      const removeButton = getByText('I will transfer my service later')

      await act(async () => {
        fireEvent.click(removeButton)
      })
      expect(spyRemove).toHaveBeenCalled()
    })

    test('should display error message if failed to remove', async () => {
      const spyRemove = jest.fn(() => Promise.reject({ status: 'test-error', data: { errorMessage: 'test error message' } }))
      const { getByText, findByText } = renderWithProviders(
        <SwitchMyNetworkForm {...mockProps} onRemove={spyRemove} portability={{ status: 'VALID' }} />,
      )
      const removeButton = getByText('I will transfer my service later')

      await act(async () => {
        fireEvent.click(removeButton)
      })
      expect(spyRemove).toHaveBeenCalled()
      expect(
        await findByText(
          "Uh-oh, something went wrong when trying to remove your code. Once you've completed your order, please contact us.",
        ),
      ).toBeInTheDocument()
    })

    test('should call onExit if there was no error', async () => {
      const spyOnExit = jest.fn()
      const { getByText } = renderWithProviders(<SwitchMyNetworkForm {...mockProps} onExit={spyOnExit} />)
      const removeButton = getByText('I will transfer my service later')

      await act(async () => {
        fireEvent.click(removeButton)
      })
      expect(spyOnExit).toHaveBeenCalled()
    })
  })
})
