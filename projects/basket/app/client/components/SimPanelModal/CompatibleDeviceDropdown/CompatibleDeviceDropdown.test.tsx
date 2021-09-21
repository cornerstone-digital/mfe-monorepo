import renderWithProviders from '@helpers/renderWithProviders'

import mockPageContent from '@shared/config/content/BasketPageContent.json'

import CompatibleDeviceDropdown from './CompatibleDeviceDropdown'

const content: BasketPageContent.PopularEsimDevices = mockPageContent[0]?.basket?.vf_Modules?.popular_esim_devices

describe('<CompatibleDeviceDropdown />', () => {
  it('renders without exploding', () => {
    const { getByText } = renderWithProviders(<CompatibleDeviceDropdown content={content} />)
    expect(getByText('Popular eSIM devices')).toBeInTheDocument()
    expect(getByText('Apple')).toBeInTheDocument()
    expect(getByText('Samsung')).toBeInTheDocument()
  })

  it('renders nothing if no content provided', () => {
    const { container } = renderWithProviders(<CompatibleDeviceDropdown />)
    expect(container.childNodes).toHaveLength(0)
  })
})
