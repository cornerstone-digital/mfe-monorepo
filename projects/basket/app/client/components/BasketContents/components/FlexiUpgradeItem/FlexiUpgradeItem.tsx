import { observer } from 'mobx-react-lite'

import BasketItem from '@components/BasketItem'
import { useStore } from '@store'
import Section from '@web-core/components/atoms/Section'
import formatCurrency from '@web-core/helpers/formatCurrency'
import getPrice from '@helpers/getPrice'
import { useEffect } from 'react'

const FlexiUpgradeItem = observer(() => {
  const { basketStore } = useStore()
  const { pageContent, basket } = basketStore
  const { packages = [], isBusiness } = basket

  const isFlexi = packages[0]?.services?.find(
    ({ name, productClass }) =>
      productClass && productClass.toLowerCase() === 'fee' && name && name.toLowerCase() === 'fee for flexi-upgrade',
  )
  const flexiAddon = packages[0]?.services?.find(({ name }) => name?.toLowerCase().includes('flexi'))
  const flexiFee = getPrice(flexiAddon?.priceDetails?.oneOffPrice, isBusiness)
  const flexiDescription = pageContent?.vf_Modules?.messages?.content?.flexi_upgrade_fee?.bodyText || ''

  useEffect(() => {
    if (!window.VFUK.basketData) window.VFUK.basketData = { fuf: {} }

    if (isFlexi) {
      window.VFUK.basketData.fuf = {
        monthly: getPrice(flexiAddon?.priceDetails?.monthlyPrice, isBusiness),
        upfront: flexiFee,
      }
    }

    return () => {
      window.VFUK.basketData.fuf = {}
    }
  }, [isFlexi, flexiAddon?.priceDetails])

  if (!isFlexi) return null

  return (
    <Section borderShadow padding={2} marginBottom={2}>
      <BasketItem
        title="Flexi-upgrade fee"
        description={[flexiDescription]}
        icon="upgrade"
        iconAppearance="secondary-1"
        upfrontPrice={formatCurrency(flexiFee)}
        isFlexiBanner
        isBusiness={isBusiness}
      />
    </Section>
  )
})

export default FlexiUpgradeItem
