import { getTransformedFooterData, getTransformedHeaderData } from './cmsDataTransformers'

import businessFooterMockJson from '@cypress-root/fixtures/_default/assets/business_footer.json'
import businessHeaderMockJson from '@cypress-root/fixtures/_default/assets/business_meganav.json'

import consumerFooterMockJson from '@cypress-root/fixtures/_default/assets/consumer_footer.json'
import consumerHeaderMockJson from '@cypress-root/fixtures/_default/assets/consumer_meganav.json'

import cleanHeaderData from '../cleanHeaderData'
import cleanFooterData from '../cleanFooterData'

const formattedBusinessFooterData = cleanFooterData(businessFooterMockJson as any)
const formattedConsumerFooterData = cleanFooterData(consumerFooterMockJson as any)
const formattedBusinessHeaderData = cleanHeaderData(businessHeaderMockJson)
const formattedConsumerHeaderData = cleanHeaderData(consumerHeaderMockJson)

jest.mock('@web-cms-core/core/organisms/CMSConsumerMegaNav/helpers/AnalyticsService', () => ({
  handleLinkClick: jest.fn().mockImplementation(() => {}),
}))

describe('transformers', () => {
  it.each`
    transformerFn               | inputMock
    ${getTransformedFooterData} | ${formattedBusinessFooterData}
    ${getTransformedFooterData} | ${formattedConsumerFooterData}
    ${getTransformedHeaderData} | ${formattedBusinessHeaderData}
    ${getTransformedHeaderData} | ${formattedConsumerHeaderData}
  `('should transform data as expected', ({ transformerFn, inputMock }) => {
    expect(transformerFn(inputMock)).toMatchSnapshot()
  })
})
