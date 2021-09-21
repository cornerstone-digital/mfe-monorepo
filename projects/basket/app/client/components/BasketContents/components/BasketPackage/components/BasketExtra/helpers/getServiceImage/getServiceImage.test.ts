import getServiceImage from './getServiceImage'

describe('getServiceImage', () => {
  it.each`
    productName                                                                | output
    ${'Video Pass'}                                                            | ${'/assets/video-pass.png'}
    ${'Social Pass'}                                                           | ${'/assets/social-pass.png'}
    ${'Combo Pass'}                                                            | ${'/assets/combo-pass.png'}
    ${'Chat Pass'}                                                             | ${'/assets/chat-pass.png'}
    ${'Music Pass'}                                                            | ${'/assets/music-pass.png'}
    ${'Vodafone Insurance: Tier 1 Loss Theft and Damage'}                      | ${'/assets/stolen-phone.png'}
    ${'Vodafone Insurance: Tier 1 Damage'}                                     | ${'/assets/stolen-phone.png'}
    ${'Vodafone Insurance + AppleCare Services: Tier 1 Damage'}                | ${'/assets/stolen-phone.png'}
    ${'Vodafone Insurance + AppleCare Services: Tier 1 Loss Theft and Damage'} | ${'/assets/stolen-phone.png'}
    ${'Test name'}                                                             | ${''}
  `('should return with $output', ({ productName, output }) => {
    expect(getServiceImage(productName)).toBe(output)
  })
})
