import { observer } from 'mobx-react-lite'

import BlockContainer from '@web-core/components/molecules/BlockContainer'
import { Grid } from '@vfuk/core-grid'
import CostRow from './components/CostRow/CostRow'
import { BasketTotalCostProps } from './BasketTotalCost.types'

import getPackageFooterMessages from '@helpers/getPackageFooterMessages'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getPrice from './helpers/getPrice'
import { useStore } from '@store'

import { BASKET_CONSTS } from '@constants'

const BasketTotalCost = observer((props: BasketTotalCostProps) => {
  const {
    basketStore: {
      basket: { priceDetails, isUpgradeOrder, packages, isBusiness },
      pageContent,
    },
  } = useStore()
  const { oneOffPrice, oneOffDiscountPrice, monthlyPrice, monthlyDiscountPrice, totalOneoffSaving, totalMonthlySaving } = priceDetails || {}
  const { hideExVatRows } = props

  const isWithVat = isBusiness || !getABTestFeatureValue('withoutVat')

  const { gross: oneOffGross, net: oneOffNet, vat: oneOffVat } = getPrice(oneOffPrice, oneOffDiscountPrice)
  const { gross: monthlyGross, net: monthlyNet, vat: monthlyVat } = getPrice(monthlyPrice, monthlyDiscountPrice)
  const showDiscountAsterix =
    packages && pageContent ? !!getPackageFooterMessages(packages, pageContent)[BASKET_CONSTS.MP_TYPE_LIMITED_TIME] : false

  const upfrontTotalDiscount = totalOneoffSaving?.gross || '0'
  const monthlyTotalDiscount = totalMonthlySaving?.gross || '0'
  const showTotalDiscount = parseFloat(upfrontTotalDiscount) || parseFloat(monthlyTotalDiscount)

  return (
    <BlockContainer marginVertical={2} guttering="none" borderAppearance="shadow">
      <Grid>
        {showTotalDiscount && !hideExVatRows ? (
          <CostRow
            title="Total discount"
            oneOff={upfrontTotalDiscount}
            monthly={monthlyTotalDiscount}
            showDiscountAsterix={showDiscountAsterix}
            isUpgrade={isUpgradeOrder}
            showDiscount
            isTotalDiscountRow
          />
        ) : null}
        {isWithVat && !hideExVatRows && (
          <>
            <CostRow title="Ex. VAT" oneOff={oneOffNet} monthly={monthlyNet} />
            <CostRow title="20% VAT" oneOff={oneOffVat} monthly={monthlyVat} />
          </>
        )}
        <CostRow title="Total cost" oneOff={oneOffGross} monthly={monthlyGross} showDiscountAsterix={showDiscountAsterix} showTotal />
      </Grid>
    </BlockContainer>
  )
})

export default BasketTotalCost
