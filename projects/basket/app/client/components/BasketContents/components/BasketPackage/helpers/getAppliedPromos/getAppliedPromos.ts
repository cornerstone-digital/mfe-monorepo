/**
 * Gets promos applied to package, to be shown in simple
 * text list. It will skip those already shown elsewhere.
 * It may also omit price-related promos for legal reasons,
 * which is based on hidePoundsPromo.
 *
 * @param {Array} merchandisingMedia - array of promos
 * @param {Boolean} hidePoundsPromo - whether to hide price discounts
 */
const getAppliedPromos = (merchandisingMedia?: BasketV2.MediaLink[], hidePoundsPromo = true) => {
  const poundInBadData = '&pound;'
  const safeMedia = merchandisingMedia || []
  const alreadyShown = [
    'securenet.merchandisingPromotions.merchandisingPromotion.label',
    'entertainment.merchandisingPromotions.merchandisingPromotion.label',
    'data_allowance.merchandisingPromotions.merchandisingPromotion.label',
    'data_allowance.merchandisingPromotions.merchandisingPromotion.description',
  ]
  const relevantMedia = safeMedia.filter(
    (media = {}) =>
      media.id &&
      media.type &&
      !alreadyShown.includes(media.id) &&
      media.type.toLowerCase() === 'text' &&
      media.value &&
      !media.id.includes('description') &&
      (hidePoundsPromo ? !media.value.includes(poundInBadData) : true),
  )

  return relevantMedia.map(media => media.value?.replace(/&pound;/g, '£')).filter((value, index, arr) => index === arr.indexOf(value))
}

export default getAppliedPromos
