import getABTestFeatureValue from '@helpers/getABTestFeatureValue'

const getChevronVisibility = (isHandset?: boolean, isPayg?: boolean, isSimo?: boolean) => {
  const targetVariantChevron = getABTestFeatureValue('planChevronAB')
  return targetVariantChevron && ((isHandset && !isPayg) || isSimo)
}

export default getChevronVisibility
