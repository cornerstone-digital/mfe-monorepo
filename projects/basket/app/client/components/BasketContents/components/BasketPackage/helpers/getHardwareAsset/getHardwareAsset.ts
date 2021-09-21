import assetURL from '@web-shop-core/helpers/assetURL'

const getFrontGrid = (merchandisingMedia: BasketV2.MediaLink[]) => merchandisingMedia.find(item => item.id === 'imageURLs.grid') || {}

const getFrontThumb = (merchandisingMedia: BasketV2.MediaLink[]) =>
  merchandisingMedia.find(item => item.id === 'imageURLs.thumbs.front') || {}

const getHardwareAsset = (productClass?: string, merchandisingMedia?: BasketV2.MediaLink[]): string | undefined => {
  if (!productClass || !merchandisingMedia) return

  const frontGridAsset = getFrontGrid(merchandisingMedia).value
  const frontThumbAsset = getFrontThumb(merchandisingMedia).value

  if (['accessories', 'handset', 'data_device', 'ehandset'].includes(productClass)) {
    return assetURL(frontGridAsset || frontThumbAsset)
  } else if (productClass === 'fixed broadband equipment 2019') {
    return assetURL(frontThumbAsset)
  }
}

export default getHardwareAsset
