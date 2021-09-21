import getABTestFeatureValue from '@helpers/getABTestFeatureValue'
import getChevronVisibility from '../getChevronVisibility'

const getModalPromptVisibility = (isHandset?: boolean, isPayg?: boolean, isSimo?: boolean) => {
  const targetVariantModal = getABTestFeatureValue('planBenefitsAB')
  const isChevronVisible = getChevronVisibility(isHandset, isPayg, isSimo)
  return targetVariantModal && !isChevronVisible && ((isHandset && !isPayg) || isSimo)
}

export default getModalPromptVisibility
