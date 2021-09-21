import formatAmount from '@helpers/formatAmount'
import formatCurrency from '@helpers/formatCurrency'
import { DeviceCosts } from '../../DevicePaymentExample.types'

const getFinancialBreakdown = (
  devicePaymentPlan: BasketV2.DevicePaymentPlan,
  airtimePrice: string = '0',
  priceKey: keyof BasketV2.DevicePrice,
) => {
  const deviceCosts: DeviceCosts = {
    upFrontPrice: formatCurrency(devicePaymentPlan?.upFrontPrice?.[priceKey] || '0'),
    monthlyPrice: formatCurrency(devicePaymentPlan.monthlyPrice?.[priceKey] || '0'),
    totalHandsetPrice: formatCurrency(devicePaymentPlan.totalHandsetPrice?.[priceKey] || '0'),
    totalHandsetCredit: formatCurrency(devicePaymentPlan.totalHandsetCredit?.[priceKey] || '0'),
    interestRate: `${formatAmount(devicePaymentPlan.interestRate || 0)}%`,
    aprRepresentative: `${formatAmount(devicePaymentPlan.aprRepresentative || '0')}%`,
    creditor: 'Vodafone Ltd.',
    duration: devicePaymentPlan.duration?.value || '0',
  }

  const airtimeCosts = {
    monthlyCost: formatCurrency(airtimePrice || '0'),
  }

  const monthlyAirtime = parseFloat(airtimePrice || '0')
  const monthlyHardware = parseFloat(devicePaymentPlan?.monthlyPrice?.[priceKey] || '0')
  const monthlyTotal = (monthlyAirtime + monthlyHardware).toFixed(2)

  return {
    deviceCosts,
    airtimeCosts,
    total: {
      duration: devicePaymentPlan?.duration?.value,
      upfrontCost: formatCurrency(devicePaymentPlan?.upFrontPrice?.[priceKey] || '0'),
      monthlyTotal: formatCurrency(monthlyTotal),
    },
  }
}

export default getFinancialBreakdown
