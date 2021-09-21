import { BASKET_CONSTS } from '@constants'
import getDescription from './getDescription'

import mockPageContent from '@shared/config/content/BasketPageContent.json'

describe('getDescription', () => {
  describe('with broadband journey', () => {
    const planType = BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH
    const mockAddress = {
      identification: {
        id: 'A00001191120',
        contextId: 'Gold',
      },
      postCode: 'SL6 1DJ',
      houseName: '',
      houseNumber: '98',
      flatNumber: '',
      streetName: 'Braywick Road',
      town: 'Maidenhead',
      county: 'Berkshire',
      country: 'United Kingdom',
      locality: '',
      citySubDivisionName: 'TH',
      moveTypeCode: '',
    }

    describe('if it has commitmentMessage', () => {
      const commitmentPeriod = { value: '12', uom: 'Months' }
      it.each`
        extra                   | description
        ${'wifiExpert'}         | ${'test wifi description'}
        ${'broadbandAntiVirus'} | ${'test broadband description'}
        ${'includedCalls'}      | ${'test calls description'}
        ${'noPriceRise'}        | ${'test prices description'}
      `('should extend $extra field with $description of description', ({ extra, description }) => {
        const mockBundle = { [extra]: description, commitmentPeriod }

        expect(getDescription(mockBundle, planType, false, [])).toContain(description)
      })
    })
    describe('if it has no commitmentMessage returned description', () => {
      test('should contain increaseMessage from pageContent', () => {
        const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket
        const description = getDescription({}, planType, false, [], pageContent)

        expect(description).toContain('Please note, your monthly bill will increase by £3 a month after your initial contract.')
      })

      test('should contain installation address', () => {
        const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket
        const description = getDescription({}, planType, false, [], pageContent, mockAddress)

        expect(description).toContain('Installation address:')
        expect(description).toContain('98 Braywick Road, Maidenhead, SL6 1DJ')
      })

      test('should not contain installation address if upgrade journey', () => {
        const pageContent = mockPageContent[0]?.basket as BasketPageContent.Basket
        const description = getDescription({}, planType, true, [], pageContent, mockAddress)

        expect(description).not.toContain('Installation address:')
        expect(description).not.toContain('98 Braywick Road, Maidenhead, SL6 1DJ')
      })
    })
  })

  describe('with non broadband journey', () => {
    const planType = BASKET_CONSTS.PLAN_TYPE_HANDSET

    test('should contain bundleDescription in returned description', () => {
      const mockDescription = ['mock description']
      const description = getDescription({}, planType, false, mockDescription)
      expect(description).toContain(mockDescription[0])
    })

    test('should contain bundleDescription in returned description', () => {
      const mockDescription = ['mock title', 'mock description']
      const expectedMockDescription = [...mockDescription]
      const description = getDescription({}, planType, false, mockDescription, undefined, undefined, 'mock title')
      expect(description).not.toContain(expectedMockDescription[0])
      expect(description).toContain(expectedMockDescription[1])
    })
  })
})
