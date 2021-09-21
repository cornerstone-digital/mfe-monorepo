import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { Grid, GridRow } from '@vfuk/core-grid'
import Paragraph from '@web-core/components/atoms/Paragraph'
import BlockContainer from '@web-core/components/molecules/BlockContainer'

import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getPackageFooterMessages from '@helpers/getPackageFooterMessages'
import { useStore } from '@store'

import styles from './RpiContent.scss'

const ABWrapper: React.FC = ({ children }) => {
  return (
    <Grid className={styles['wrapper']}>
      <GridRow noGutters marginTop={8} marginBottom={8}>
        {children}
      </GridRow>
    </Grid>
  )
}

const RpiContent = observer(() => {
  const { basketStore } = useStore()
  const { basket, rpiWithoutVatContent, pageContent, rpiContent, smallBusinessBasketFooterContent } = basketStore
  const hasSmallBusinessPackage = basket.packages?.filter(pkg => pkg.accountSubCategory === 'smallBusiness').length
  const isWithVat = basket.isBusiness || !getABTestFeatureValue('withoutVat')
  const footerRpiContent = isWithVat ? rpiContent : rpiWithoutVatContent
  const footerMessage = hasSmallBusinessPackage ? smallBusinessBasketFooterContent : footerRpiContent
  const messages = getPackageFooterMessages(toJS(basket.packages) as BasketV2.ModelPackage[], pageContent)

  const Wrapper = getABTestFeatureValue('tcsBelowCTA') ? ABWrapper : BlockContainer

  return (
    <Wrapper>
      <Paragraph key="rpi" fontSize="xs">
        {footerMessage}
      </Paragraph>
      {Object.values(messages).map((msg: string, key: number) => (
        <Paragraph key={key} fontSize="xs">
          {msg}
        </Paragraph>
      ))}
    </Wrapper>
  )
})

export default RpiContent
