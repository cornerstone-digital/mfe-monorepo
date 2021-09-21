import getAllowanceByType from '@web-shop-core/helpers/getAllowanceByType'
import Image from '@web-core/components/atoms/Image'
import Spacing from '@vfuk/core-spacing'

import assetURL from '@web-shop-core/helpers/assetURL'
import { BenefitId } from '@constants'
import replaceContentParams from '@helpers/replaceContentParams'

const getMediaById = (arr: BasketV2.MediaLink[], value: string) => {
  return arr.find(({ id }) => id && id.toLowerCase() === value?.toLowerCase()) || {}
}

// Needed to continue selling PAYG on our website. I hate myself
export const techDebtGetUom = ({ type, uom, displayUom, tilUom }: { [key: string]: string }) => {
  const safeUom = displayUom || uom || tilUom
  const invalidUom = !safeUom || safeUom === '-'

  if (invalidUom && type) {
    const lowerType = type.toLowerCase()

    if (lowerType.includes('min')) {
      return 'minutes'
    }
    if (lowerType.includes('data')) {
      return 'data'
    }
    if (lowerType.includes('text')) {
      return 'texts'
    }
  }

  return safeUom
}

function getBenefitId(benefit: BasketV2.BenefitAdvertisement, isOneNumberRenameEnabled?: boolean) {
  return isOneNumberRenameEnabled && benefit.skuId === BenefitId.SMARTWATCH_CONNECTIVITY
    ? BenefitId.SMARTWATCH_CONNECTIVITY_BUSINESS
    : benefit.skuId
}

const getBundleDescription = (
  bundle: BasketV2.Bundle & BasketV2.Service,
  cmsMessages?: BasketPageContent.HbbPortfolioRefresh,
  isOneNumberRenameEnabled?: boolean,
) => {
  const cmsMessagesContent = cmsMessages?.content || {}
  const { allowances, merchandisingMedia, rewardPoints, bundleType, benefits: bingoComplexBenefits = [] } = bundle
  const ukMin = getAllowanceByType(allowances || [], 'uk min', 'voice')
  const ukText = getAllowanceByType(allowances || [], 'uk text')
  const ukData = getAllowanceByType(allowances || [], 'uk data') || getAllowanceByType(allowances || [], 'data')
  const freeData = getAllowanceByType(allowances || [], 'freedata')
  const internationalMins = getAllowanceByType(allowances || [], 'inclusive eu minutes')
  const pictureMessaging = getAllowanceByType(allowances || [], 'mms')
  const secureNet = getMediaById(merchandisingMedia || [], 'securenet.merchandisingPromotions.merchandisingPromotion.label')
  const entertainmentLabel = getMediaById(merchandisingMedia || [], 'entertainment.merchandisingPromotions.merchandisingPromotion.label')
  const entertainmentImage = getMediaById(
    merchandisingMedia || [],
    'entertainment.merchandisingPromotions.merchandisingPromotion.PromotionMedia',
  )

  const bundleDescription = bingoComplexBenefits.reduce((acc: React.ReactNode[], benefit) => {
    const benefitId = getBenefitId(benefit, isOneNumberRenameEnabled) as BenefitId
    if (Object.values(BenefitId).indexOf(benefitId) > -1 && cmsMessagesContent[benefitId]?.bodyText) {
      acc.push(cmsMessagesContent[benefitId]?.bodyText || '')
    }
    return acc
  }, [])

  if (ukMin.value) {
    bundleDescription.push(`${ukMin.value} ${techDebtGetUom(ukMin)}`)
  }

  if (ukText.value) {
    bundleDescription.push(`${ukText.value} ${techDebtGetUom(ukText)}`)
  }

  if (ukData.value) {
    let dataDescription = `${ukData.value}${techDebtGetUom(ukData)} data allowance`
    if (ukData.value.toLowerCase() === 'unlimited') {
      dataDescription = `${ukData.value} data`
    }
    if (freeData.value) {
      dataDescription = `${dataDescription}, includes ${freeData.value}${techDebtGetUom(freeData)} extra data`
    }
    bundleDescription.push(dataDescription)
  }

  if (pictureMessaging?.value) {
    bundleDescription.push(`${pictureMessaging.value} ${pictureMessaging.displayUom}`)
  }

  if (bundleType?.match(/\d+/g)) {
    const match = bundleType?.match(/\d+/g) || []
    const roamFreeCopy = replaceContentParams(cmsMessagesContent.ROAMING_AIRTIME_BENEFIT?.bodyText, { '{param}': match[0] })
    if (roamFreeCopy) {
      bundleDescription.push(roamFreeCopy)
    }
  }

  if (internationalMins.value) {
    bundleDescription.push(internationalMins.value)
  }

  if (rewardPoints) {
    bundleDescription.push(`${rewardPoints} rewards points`)
  }

  if (secureNet.id) {
    bundleDescription.push(secureNet.value || '3 month free trial of Secure Net')
  }

  if (entertainmentLabel.id && entertainmentImage.id) {
    const imageURL = assetURL(entertainmentImage.value)

    bundleDescription.push(
      <div>
        {entertainmentLabel.value}
        <Spacing spacingLevel={{ top: 1 }}>
          <Image src={imageURL} srcLg={imageURL} height="40px" width="auto" />
        </Spacing>
      </div>,
    )
  } else {
    if (entertainmentLabel.id) {
      bundleDescription.push(entertainmentLabel.value)
    }

    if (entertainmentImage.id) {
      const imageURL = assetURL(entertainmentImage.value)

      bundleDescription.push(<Image src={imageURL} srcLg={imageURL} height="40px" width="auto" />)
    }
  }

  return bundleDescription
}

export default getBundleDescription
