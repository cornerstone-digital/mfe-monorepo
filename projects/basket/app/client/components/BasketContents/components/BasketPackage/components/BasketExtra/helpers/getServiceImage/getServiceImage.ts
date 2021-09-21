import { BasketExtraPassImage } from '../../BasketExtras.types'

const getServiceImage = (productName: BasketV2.Bundle['name']) => {
  const passImage: BasketExtraPassImage = {
    'Video Pass': 'video-pass.png',
    'Social Pass': 'social-pass.png',
    'Combo Pass': 'combo-pass.png',
    'Chat Pass': 'chat-pass.png',
    'Music Pass': 'music-pass.png',
    'Vodafone Insurance: Tier 1 Loss Theft and Damage': 'stolen-phone.png',
    'Vodafone Insurance: Tier 1 Damage': 'stolen-phone.png',
    'Vodafone Insurance + AppleCare Services: Tier 1 Damage': 'stolen-phone.png',
    'Vodafone Insurance + AppleCare Services: Tier 1 Loss Theft and Damage': 'stolen-phone.png',
  }

  return productName && passImage[productName] ? `${WEBPACK_ASSET_PREFIX}/assets/${passImage[productName]}` : ''
}

export default getServiceImage
