import { fireEvent, waitFor } from '@testing-library/react'

import basketService from '@web-shop-core/services/basketService'

import mockPageContent from '@shared/config/content/BasketPageContent.json'
import AnalyticsUtil from '@utilities/Analytics'
import renderWithProviders from '@helpers/renderWithProviders'

import SimPanel from './SimPanel'
import { SimPanelProps } from './SimPanel.types'

jest.mock('@web-shop-core/services/basketService')
jest.mock('@utilities/Analytics')
jest.mock('@vfuk/core-modal')

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket
const onChangeMock = jest.fn()
const updateStatusMock = jest.fn()

basketService.patchBasket = jest.fn()
AnalyticsUtil.pageView = jest.fn()

const defaultProps: SimPanelProps = {
  simType: 'HYBRID',
  isUpgrade: false,
  isSimo: false,
  pageContent,
  reviewMode: false,
  onChange: onChangeMock,
  packageId: '12345',
  selectedSimName: '3-in-1 SIM',
  updateStatus: updateStatusMock,
}

describe('<SimPanel />', () => {
  const portalContainer = document.createElement('div')
  portalContainer.id = 'GlobalStylesProvider'
  beforeAll(() => {
    document.body.appendChild(portalContainer)
  })
  afterAll(() => {
    document.removeChild(portalContainer)
  })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should be visible when open', async () => {
    const { getAllByText, getByText, container } = renderWithProviders(<SimPanel {...defaultProps} />)

    const modalTrigger = getAllByText('What is an eSIM?')[0]
    fireEvent.click(modalTrigger)

    expect(getByText('Is my device compatible?')).toBeInTheDocument()
    expect(getByText('Popular eSIM devices')).toBeInTheDocument()
    expect(container.querySelector('dialog')).toBeInTheDocument()
  })

  it('should close when the button close is clicked', () => {
    const { container, getAllByText, getByLabelText } = renderWithProviders(<SimPanel {...defaultProps} />)
    const modalTrigger = getAllByText('What is an eSIM?')[0]
    const getCancelButton = () => getByLabelText('close')

    fireEvent.click(modalTrigger)
    expect(getCancelButton()).toBeInTheDocument()
    getCancelButton().click()

    expect(container.querySelector('dialog')).not.toBeInTheDocument()
  })

  describe('when in non review mode', () => {
    it('should have text SIM', () => {
      const { getByText } = renderWithProviders(<SimPanel {...defaultProps} />)

      const { bodyText } = pageContent?.vf_Modules?.basket_esim?.content.basket_sim_card
      expect(getByText(bodyText!)).toBeInTheDocument()
    })

    it('should have text eSIM', () => {
      const { getByText } = renderWithProviders(<SimPanel {...defaultProps} simType="ESIMONLY" />)

      const { bodyText, header } = pageContent?.vf_Modules?.basket_esim?.content.basket_esim_info
      expect(getByText(bodyText)).toBeInTheDocument()
      expect(getByText(header)).toBeInTheDocument()
    })

    it('should have text eSIM if SIMO', () => {
      const { getByText } = renderWithProviders(<SimPanel {...defaultProps} simType="ESIMONLY" isSimo />)

      const { bodyText, header, featureLoading = '' } = pageContent?.vf_Modules?.basket_esim?.content.basket_esim_info_compatible
      expect(getByText(bodyText.trim())).toBeInTheDocument()
      expect(getByText(header)).toBeInTheDocument()
      expect(getByText(featureLoading)).toBeInTheDocument()
    })

    it('should have text eSIM if upgrade', () => {
      const { getByText } = renderWithProviders(<SimPanel {...defaultProps} simType="ESIMONLY" isUpgrade />)

      const { bodyText, header, featureLoading = '' } = pageContent?.vf_Modules?.basket_esim?.content.basket_esim_device_upgrade
      expect(getByText(bodyText.trim())).toBeInTheDocument()
      expect(getByText(header)).toBeInTheDocument()
      expect(getByText(featureLoading)).toBeInTheDocument()
    })

    it('should have text eSIM if SIMO upgrade', () => {
      const { getByText } = renderWithProviders(<SimPanel {...defaultProps} simType="ESIMONLY" isUpgrade isSimo />)

      const { bodyText, header, featureLoading = '' } = pageContent?.vf_Modules?.basket_esim?.content.basket_esim_simo_upgrade
      expect(getByText(bodyText.trim())).toBeInTheDocument()
      expect(getByText(header)).toBeInTheDocument()
      expect(getByText(featureLoading)).toBeInTheDocument()
    })
  })

  describe('switch between sim types', () => {
    it('is enabled when not in review mode', () => {
      const { getByLabelText } = renderWithProviders(<SimPanel {...defaultProps} />)
      const radio = getByLabelText('SIM card') as HTMLInputElement
      fireEvent.change(radio, { target: { value: 'ESIM' } })
      expect(radio.value).toBe('ESIM')
      fireEvent.change(radio, { target: { value: 'SIM' } })
      expect(radio.value).toBe('SIM')
    })

    it('is disabled when in review mode', () => {
      const { queryByLabelText } = renderWithProviders(<SimPanel {...defaultProps} reviewMode />)
      expect(queryByLabelText('SIM card')).not.toBeInTheDocument()
    })
  })

  it(`doesn't error without pageContent`, () => {
    renderWithProviders(<SimPanel {...defaultProps} pageContent={undefined} />)
  })

  it(`should render correctly when buying a new hybrid device`, async () => {
    const { getByText, getByLabelText } = renderWithProviders(<SimPanel {...defaultProps} />)
    expect(getByText('Choose your SIM')).toBeInTheDocument()
    expect(getByText('A sim card will be sent with your order')).toBeInTheDocument()
    expect(getByLabelText('eSIM')).toBeInTheDocument()
  })

  it(`should render as expected when upgrading a hybrid device`, () => {
    const { getByText, queryByText } = renderWithProviders(<SimPanel {...defaultProps} isUpgrade={true} />)
    expect(getByText('SIM swap help page.')).toBeInTheDocument()
    expect(queryByText('Choose your SIM')).toBeNull()
  })

  it(`should render as expected when buying an esimonly device`, () => {
    const { getByText, queryByText } = renderWithProviders(<SimPanel {...defaultProps} simType="ESIMONLY" />)
    expect(getByText('Information about your eSIM')).toBeInTheDocument()
    expect(queryByText('Choose your SIM')).toBeNull()
  })

  it(`should render as expected when buying a new simo package`, () => {
    const { getByText, getByLabelText } = renderWithProviders(<SimPanel {...defaultProps} isSimo={true} />)
    expect(getByText('Choose your SIM')).toBeInTheDocument()
    expect(getByText('A sim card will be sent with your order')).toBeInTheDocument()
    expect(getByLabelText('eSIM')).toBeInTheDocument()
  })

  it(`should render as expected when buying a new esim package`, () => {
    const { getByText } = renderWithProviders(<SimPanel {...defaultProps} isSimo={true} selectedSimName="eSIM" />)
    expect(getByText('Is your device eSIM compatible')).toBeInTheDocument()
    expect(getByText('See list of popular compatible eSIM device')).toBeInTheDocument()
  })

  it(`should render as expected when upgrading a simo package`, () => {
    const { getByText, queryByText } = renderWithProviders(<SimPanel {...defaultProps} isSimo={true} isUpgrade={true} />)
    expect(getByText('SIM swap help page.')).toBeInTheDocument()
    expect(queryByText('Choose your SIM')).toBeNull()
  })

  it(`should make relevant calls when toggled to esim`, async () => {
    const { getByLabelText } = renderWithProviders(<SimPanel {...defaultProps} />)
    const esimRadioButton = getByLabelText('eSIM')
    fireEvent.click(esimRadioButton)

    await waitFor(() => {
      expect(basketService.patchBasket).toHaveBeenCalledWith('12345', { simPatchType: 'ESIM' })
      expect(onChangeMock).toHaveBeenCalledWith(false, true)
      expect(AnalyticsUtil.pageView).toHaveBeenCalled()
    })
  })
})
