import getBundleDescription, { techDebtGetUom } from './getBundleDescription'
import mockPageContent from '@shared/config/content/BasketPageContent.json'

const pageContent: BasketPageContent.Basket = mockPageContent[0]?.basket as BasketPageContent.Basket

describe('getBundleDescription', () => {
  it('return mins, text and data in the expected format', () => {
    const bundle = {
      allowances: [
        {
          type: 'ORIGDATA',
          value: '1',
          displayUom: 'GB',
          tilUom: 'DATA',
        },
        {
          type: 'UK TEXT',
          value: 'Unlimited',
          displayUom: 'texts',
          tilUom: 'SMS',
        },
        {
          type: 'UK DATA',
          value: '1',
          displayUom: 'GB',
          tilUom: 'DATA',
        },
        {
          type: 'UK MIN',
          value: '1000',
          displayUom: 'minutes',
          tilUom: '',
        },
        {
          type: 'MMS',
          value: 'Unlimited',
          uom: '-',
          displayUom: 'picture messages',
          tilUom: 'MMS',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result.length).toEqual(4)
    expect(result[0]).toEqual('1000 minutes')
    expect(result[1]).toEqual('Unlimited texts')
    expect(result[2]).toEqual('1GB data allowance')
    expect(result[3]).toEqual('Unlimited picture messages')
  })

  it('returns with securenet and entertainment labels', () => {
    const bundle = {
      allowances: [],
      merchandisingMedia: [
        {
          id: 'securenet.merchandisingPromotions.merchandisingPromotion.label',
          value: 'fake value',
        },
        {
          id: 'entertainment.merchandisingPromotions.merchandisingPromotion.label',
          value: 'fake label',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result[0]).toEqual('fake value')
    expect(result[1]).toEqual('fake label')
  })

  it('return mins, text, data and secure net in the expected format with fallback', () => {
    const bundle = {
      allowances: [],
      merchandisingMedia: [
        {
          id: 'securenet.merchandisingPromotions.merchandisingPromotion.label',
          value: '',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result[0]).toEqual('3 month free trial of Secure Net')
  })

  it('returns with entertainment image', () => {
    const bundle = {
      allowances: [],
      merchandisingMedia: [
        {
          id: 'entertainment.merchandisingPromotions.merchandisingPromotion.PromotionMedia',
          value: '/image',
        },
      ],
    }

    const result = getBundleDescription(bundle)
    expect(result[0]).toMatchSnapshot()
  })

  it('returns no data unit of measurement if the value is Unlimited', () => {
    const bundle = {
      allowances: [
        {
          type: 'UK DATA',
          value: 'Unlimited',
          displayUom: 'GB',
          tilUom: 'DATA',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result.length).toEqual(1)
    expect(result[0]).toEqual('Unlimited data')
  })

  it('returns with extra data if freedata is provided', () => {
    const bundle = {
      allowances: [
        {
          type: 'UK DATA',
          value: '100',
          displayUom: 'GB',
          tilUom: 'DATA',
        },
        {
          type: 'freedata',
          value: '20',
          displayUom: 'GB',
          tilUom: 'DATA',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result.length).toEqual(1)
    expect(result[0]).toEqual('100GB data allowance, includes 20GB extra data')
  })

  it('returns no data unit of measurement if the value is Unlimited', () => {
    const bundle = {
      allowances: [
        {
          type: 'inclusive eu minutes',
          value: '500 international minutes to EU',
        },
      ],
    }

    const result = getBundleDescription(bundle)

    expect(result.length).toEqual(1)
    expect(result[0]).toEqual('500 international minutes to EU')
  })

  it('returns "Inclusive roaming in 48 destinations" for global roaming', () => {
    const bundle = {
      bundleType: 'unlimited48',
    }

    const result = getBundleDescription(bundle, pageContent?.vf_Modules?.messages)
    expect(result[0]).toEqual('Inclusive roaming in 48 destinations\r\n')
  })

  it('returns "Inclusive roaming in 77 destinations" for global roaming', () => {
    const bundle = {
      bundleType: 'unlimited77',
    }

    const result = getBundleDescription(bundle, pageContent?.vf_Modules?.messages)
    expect(result[0]).toEqual('Inclusive roaming in 77 destinations\r\n')
  })

  it('returns reward points', () => {
    const bundle = {
      rewardPoints: '55',
    }

    const result = getBundleDescription(bundle, pageContent?.vf_Modules?.messages)
    expect(result[0]).toEqual('55 rewards points')
  })

  it('returns "Device Care" if related benefit id is present', () => {
    const bundle = {
      benefits: [{ skuId: '030020' }, { skuId: '030030' }, { skuId: '030010' }],
    }
    const cmsMessages = {
      content: {
        '030010': { bodyText: 'Device Care' },
      },
    } as BasketPageContent.HbbPortfolioRefresh

    const result = getBundleDescription(bundle, cmsMessages)
    expect(result[0]).toEqual('Device Care')
  })

  it('returns "3x Unlimited Data Booster" if related benefit id is present', () => {
    const bundle = {
      benefits: [{ skuId: '030020' }, { skuId: '030030' }, { skuId: '030010' }, { skuId: '030040' }],
    }
    const cmsMessages = {
      content: {
        '030040': { bodyText: '3x Unlimited Data Booster' },
      },
    } as BasketPageContent.HbbPortfolioRefresh

    const result = getBundleDescription(bundle, cmsMessages)
    expect(result[0]).toEqual('3x Unlimited Data Booster')
  })

  it('returns "6x Unlimited Data Booster" if related benefit id is present', () => {
    const bundle = {
      benefits: [{ skuId: '030020' }, { skuId: '030030' }, { skuId: '030010' }, { skuId: '030050' }],
    }
    const cmsMessages = {
      content: {
        '030050': { bodyText: '6x Unlimited Data Booster' },
      },
    } as BasketPageContent.HbbPortfolioRefresh

    const result = getBundleDescription(bundle, cmsMessages)
    expect(result[0]).toEqual('6x Unlimited Data Booster')
  })

  it('returns "£3.50pm off discount" at the end if related benefit id is present', () => {
    const bundle = {
      benefits: [{ skuId: '030030' }, { skuId: '030020' }, { skuId: '030030' }, { skuId: '030010' }, { skuId: '030050' }],
    }
    const cmsMessages = {
      content: {
        '030030': { bodyText: '£3.50pm off Smartwatch Connectivity Plan' },
        '030050': { bodyText: '6x Unlimited Data Booster' },
      },
    } as BasketPageContent.HbbPortfolioRefresh

    const result = getBundleDescription(bundle, cmsMessages)
    expect(result[1]).toEqual('£3.50pm off Smartwatch Connectivity Plan')
  })

  it('returns "£3.50pm off discount" with "†" sign at the end if related benefit id is present and isOneNumberRenameEnabled is true', () => {
    const bundle = {
      benefits: [{ skuId: '030030' }, { skuId: '030020' }, { skuId: '030030' }, { skuId: '030010' }, { skuId: '030050' }],
    }
    const cmsMessages = {
      content: {
        '030030_Business': { bodyText: '£3.50pm off Smartwatch Connectivity Plan †' },
      },
    } as BasketPageContent.HbbPortfolioRefresh

    const result = getBundleDescription(bundle, cmsMessages, true)
    expect(result[0]).toEqual('£3.50pm off Smartwatch Connectivity Plan †')
  })

  describe('techDebtGetUom', () => {
    it.each`
      type         | expected
      ${'uk min'}  | ${'minutes'}
      ${'uk data'} | ${'data'}
      ${'uk text'} | ${'texts'}
    `('should return $expected in case of $type', ({ type, expected }) => {
      expect(techDebtGetUom({ type })).toBe(expected)
    })
  })
})
