import CostRow from './CostRow'
import { render, screen, within } from '@testing-library/react'
import * as getABTestFeatureValue from '@helpers/getABTestFeatureValue'

jest.mock('@helpers/getABTestFeatureValue', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}))

describe('CostRow', () => {
  describe('discount format', () => {
    it('should not render if showDiscount is not passed', () => {
      const { container } = render(<CostRow title="Test Title" oneOff="7.99" />)

      expect(container.querySelector('.discount')).not.toBeInTheDocument()
      expect(container.querySelector('.discount-upgrade')).not.toBeInTheDocument()
    })

    it('should render correct className when is an upgrade', async () => {
      const { container } = render(<CostRow title="Test Title" oneOff="7.99" isUpgrade showDiscount />)

      expect(container.querySelector('.discount-upgrade')).toBeInTheDocument()
    })

    it('should render correct className when not an upgrade', async () => {
      const { container } = render(<CostRow title="Test Title" oneOff="7.99" showDiscount />)

      expect(container.querySelector('.discount')).toBeInTheDocument()
    })
  })

  describe('Upfront price', () => {
    it('should render correctly when passed', () => {
      render(<CostRow title="Test Title" oneOff="7.99" />)
      const upfrontCost = screen.getAllByTestId('upfront-cost')[0]

      within(upfrontCost).getByText('£7.99')
    })

    it('should render as £0 when not passed', () => {
      render(<CostRow title="Test Title" monthly="7.99" />)
      const upfrontCost = screen.getAllByTestId('upfront-cost')[0]

      within(upfrontCost).getByText('£0')
    })

    it('should render heading when showTotal is passed', () => {
      render(<CostRow title="Test Title" oneOff="7.99" showTotal />)
      const upfrontCost = screen.getAllByTestId('upfront-cost')[0]

      within(upfrontCost).getByText('Upfront')
    })

    it('should not render heading when showTotal is not passed', () => {
      render(<CostRow title="Test Title" oneOff="7.99" />)

      expect(screen.queryAllByText('Upfront').length).toBe(0)
    })
  })

  describe('Monthly price', () => {
    it('should render correctly when passed', () => {
      render(<CostRow title="Test Title" monthly="7.99" />)
      const upfrontCost = screen.getAllByTestId('monthly-cost')[0]

      within(upfrontCost).getByText('£7.99')
    })

    it('should render as £0 when not passed', () => {
      render(<CostRow title="Test Title" oneOff="7.99" />)
      const upfrontCost = screen.getAllByTestId('monthly-cost')[0]

      within(upfrontCost).getByText('£0')
    })

    it('should render heading when showTotal is passed', () => {
      render(<CostRow title="Test Title" monthly="7.99" showTotal />)
      const upfrontCost = screen.getAllByTestId('monthly-cost')[0]

      within(upfrontCost).getByText('Monthly')
    })

    it('should not render heading when showTotal is not passed', () => {
      render(<CostRow title="Test Title" oneOff="7.99" />)

      expect(screen.queryAllByText('Monthly').length).toBe(0)
    })

    it('should contain asterix when isTotalDiscountRow and showDiscountAsterix passed ', () => {
      render(<CostRow title="Test Title" monthly="7.99" oneOff="0" showTotal isTotalDiscountRow showDiscountAsterix />)

      expect(screen.queryAllByText('Monthly*').length).toBe(1)
    })
  })

  describe('ABtest affect scenarios', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should not see the upfront price when upfront cost is zero but be visible for screen readers only', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      render(<CostRow title="Test Title" oneOff="0" showTotal />)
      const upfrontCost = screen.getAllByTestId('upfront-cost')[0]
      const zeroUpfront = within(upfrontCost).getByText('£0')
      expect(zeroUpfront).toBeInTheDocument()
      expect(zeroUpfront).toHaveClass('CostCellstyled__UpfrontCostZeroSrOnly-sc-6ym31e-0')
    })

    it('should see the upfront price when upfront cost is zero and test is off', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(false)
      render(<CostRow title="Test Title" oneOff="0" showTotal />)
      const upfrontCost = screen.getAllByTestId('upfront-cost')[0]
      const zeroUpfront = within(upfrontCost).getByText('£0')
      expect(zeroUpfront).toBeInTheDocument()
      expect(zeroUpfront).not.toHaveClass('CostCellstyled__UpfrontCostZeroSrOnly-sc-6ym31e-0')
    })

    it('should not have a grey background when upfront cost is zero and test is on', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(true)
      const { container } = render(<CostRow title="Test Title" oneOff="0" showTotal />)
      expect(container.querySelector('.upfront-cost-cell-column')).not.toBeInTheDocument()
    })

    it('should have a grey background when upfront cost is zero and test is off', () => {
      jest.spyOn(getABTestFeatureValue, 'default').mockReturnValue(false)
      const { container } = render(<CostRow title="Test Title" oneOff="0" showTotal />)
      expect(container.querySelector('.upfront-cost-cell-column')).toBeInTheDocument()
    })
  })
})
