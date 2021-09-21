import { useContext } from 'react'

import BlockContainer from '@web-core/components/molecules/BlockContainer'
import Container from '@web-core/components/atoms/Container'
import Heading from '@web-core/components/atoms/Heading'
import Paragraph from '@web-core/components/atoms/Paragraph'

import getHBBModalPromptVisibility from '@components/BasketItem/helpers/getHBBModalPromptVisibility'
import getModalPromptVisibility from '@components/BasketItem/helpers/getModalPromptVisibility'
import BenefitsModal from '@components/BasketContents/components/BasketPackage/components/BasketBundle/BenefitsModal'
import ItemHighlights from '@components/ItemHighlights'
import StorageColourDetails from '@components/BasketItem/components/StorageColourDetails'
import SizeColourDetails from '@components/BasketItem/components/SizeColourDetails'

import BasketItemContext from '@components/BasketItem/context'

import getChevronVisibility from '@components/BasketItem/helpers/getChevronVisibility'
import getHBBChevronVisibility from '@components/BasketItem/helpers/getHBBChevronVisibility'
import { useStore } from '@store'
import { observer } from 'mobx-react-lite'
import MatchMedia from '@vfuk/core-match-media'
import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

const BasketItemDescription = observer(
  (): JSX.Element => {
    const { basketStore } = useStore()
    const { basket } = basketStore
    const { broadbandInfo, isBroadband, isBundle, isHandset, isPayg, isSimo, packageId, description, isSmartWatch } = useContext(
      BasketItemContext,
    )

    if (!description?.length) return <></>

    const isModalPromptVisible = getModalPromptVisibility(isHandset, isPayg, isSimo)
    const isHBBModalPromptVisible = getHBBModalPromptVisibility(basket, packageId)
    const isChevronVisible = getChevronVisibility(isHandset, isPayg, isSimo)
    const isHBBChevronVisible = getHBBChevronVisibility(basket, packageId)

    const benefitsListVisible = isHBBChevronVisible
    const benefitItemsVisible = !isHBBChevronVisible && !isHBBModalPromptVisible
    const nonBroadbandItemsVisible = isModalPromptVisible || isHBBModalPromptVisible || isChevronVisible || isHBBChevronVisible
    const nonBroadbandBenefitsListVisible = isChevronVisible || isHBBChevronVisible

    return (
      <Choose>
        <When condition={Boolean(isBroadband)}>
          <Container gutters="none" marginTopSm={2}>
            {isHBBModalPromptVisible && <BenefitsModal items={description} bullets />}
            {benefitsListVisible && (
              <BlockContainer
                heading={{
                  text: 'See all benefits',
                  size: 5,
                  appearance: 'none',
                }}
                collapse={{
                  collapsable: true,
                  collapsed: true,
                }}
                borderAppearance="none"
                selector="see-all-benefits"
              >
                <ItemHighlights items={description} bullets={isBundle} />
              </BlockContainer>
            )}
            {benefitItemsVisible && <ItemHighlights items={description} bullets />}
            <ItemHighlights items={[]} bullets>
              <>
                <Paragraph marginTop={1}>{broadbandInfo?.increaseMessage}</Paragraph>

                <If condition={Boolean(broadbandInfo?.address)}>
                  <Heading size={6} marginBottom={1} fontWeight="bold">
                    Installation address:
                  </Heading>
                  <Paragraph>{broadbandInfo!.address}</Paragraph>
                </If>
              </>
            </ItemHighlights>
          </Container>
        </When>

        <Otherwise>
          <Container gutters="none" marginTopSm={2}>
            {getABTestFeatureValue('showStorageColourIcons') && (
              <MatchMedia breakpoint="md" andAbove={true}>
                {isSmartWatch ? <SizeColourDetails /> : <StorageColourDetails />}
              </MatchMedia>
            )}
            {isModalPromptVisible || isHBBModalPromptVisible ? <BenefitsModal items={description} bullets /> : null}
            {nonBroadbandBenefitsListVisible ? (
              <BlockContainer
                heading={{
                  text: 'See all benefits',
                  size: 5,
                  appearance: 'none',
                }}
                collapse={{
                  collapsable: true,
                  collapsed: true,
                }}
                borderAppearance="none"
                selector="see-all-benefits"
              >
                <ItemHighlights items={description} bullets={isBundle} />
              </BlockContainer>
            ) : null}
            {nonBroadbandItemsVisible || <ItemHighlights items={description} bullets={isBundle} />}
          </Container>
        </Otherwise>
      </Choose>
    )
  },
)

export default BasketItemDescription
