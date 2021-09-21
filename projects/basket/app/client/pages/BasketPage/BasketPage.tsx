import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import BasketStatus from '@components/BasketStatus'
import PageLoading from '@components/PageLoading'
import BasketModal from '@components/BasketModal'
import BasketContainer from '@containers/BasketContainer'
import EmptyBasket from './internal/EmptyBasket'
import PageButtons from './internal/PageButtons'

import Container from '@web-core/components/atoms/Container'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import { OverlayProvider } from '@vfuk/core-overlay-controller'

import Heading from '@web-core/components/atoms/Heading'
import Banner from '@web-core/components/organisms/Banner'
import Section from '@web-core/components/atoms/Section'
import Flyout from '@web-core/components/molecules/Flyout'
import HeadTags from '@web-core/components/utilities/HeadTags'
import ContactUs from '@web-shop-core/components/molecules/ContactUs'

import basketService from '@web-shop-core/services/basketService'
import VFUK from '@web-shop-core/helpers/environmentVariables'
import handleLoanCancellation from './helpers/handleLoanCancellation'

import { useStore } from '@store'
import theme from '@vfuk/core-theme-ws2'
import { ThemeProvider } from 'styled-components'
import getWorker from './worker'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

import styles from './BasketPage.scss'

const pageWorker = new Worker(getWorker())

const BasketPage = observer(() => {
  const { basketStore } = useStore()
  const {
    basket: { isBusiness, basketId },
    isEmpty,
    isLoading,
    pageContent,
    queryMap: { validate },
    updateStatus,
    waitingForApiResponse,
  } = basketStore

  const { BRANCH_HASH, APP_VERSION } = global.window.___
  const envBuildInfoString = `${APP_VERSION} - ${BRANCH_HASH}`
  const title = `${pageContent?.vf_PageTitle || 'Basket'} | Vodafone`
  const pageTitle = VFUK.env.TEALIUM_ENVIRONMENT === 'dev' ? `[${envBuildInfoString}] ${title}` : title

  const handleQueryChange = async () => {
    if (!isLoading && validate === 'true' && basketId) {
      try {
        handleLoanCancellation(pageContent.vf_Modules.notifications.content)
        await basketService.validateBasket(basketId)
      } catch (notificationError) {
        updateStatus('basketIsInvalid', notificationError)
      }
    }
  }

  const topButtonsVisible = !isEmpty && (!getABTestFeatureValue('showDoubledTotalCost') || isBusiness)

  useEffect(() => {
    handleQueryChange()
  }, [isLoading])

  return (
    <div id="content">
      <ThemeProvider theme={theme}>
        <OverlayProvider>
          <Section appearance="light2" paddingBottom={8}>
            <HeadTags
              title={pageTitle}
              description="Your shopping basket. Here you can review the items in your basket, continue to the checkout,
      modify the contents of your basket or continue shopping."
            />
            {basketStore.basketId && (
              <input type="hidden" id="basketId" value={`https://www.vodafone.co.uk/basket?basketId=${basketStore.basketId}`} />
            )}
            <BasketModal />
            <Flyout tabTitle="Get in touch" tabIconNames={['chat', 'call', 'info-circle']} sticky justify="right" appearance="dark1">
              <ContactUs segment={isBusiness ? 'business' : 'consumer'} />
            </Flyout>
            <Banner
              imageContrast="dark"
              backgroundImgSrc={`${WEBPACK_ASSET_PREFIX}/assets/banner.jpg`}
              size="sm"
              align="center"
              appearance="dark1"
              gutters="none"
            >
              <Heading level={1} size={1} justify="center" appearance="light" marginBottom={0}>
                Your basket
              </Heading>
            </Banner>
            {waitingForApiResponse && <PageLoading />}
            <Container gutters="none">
              <Grid className={styles.grid}>
                {topButtonsVisible && (
                  <GridRow>
                    <GridColumn offsetLg={2} colLg={8} marginTop={2} marginBottom={2}>
                      <PageButtons />
                    </GridColumn>
                  </GridRow>
                )}
                <BasketStatus worker={pageWorker} />
                <GridRow marginTop={3} marginBottom={3}>
                  <GridColumn offsetLg={2} colLg={8}>
                    {isEmpty && !isLoading ? <EmptyBasket /> : <BasketContainer />}
                  </GridColumn>
                </GridRow>
              </Grid>
            </Container>
          </Section>
        </OverlayProvider>
      </ThemeProvider>
    </div>
  )
})

BasketPage.displayName = 'BasketPage'

export default BasketPage
