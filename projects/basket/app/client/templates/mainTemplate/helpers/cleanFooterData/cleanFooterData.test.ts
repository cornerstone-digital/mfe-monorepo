import { CMSFooterProps, CMSRawData } from '../../MainTemplate.types'
import cleanFooterData from './cleanFooterData'

describe('cleanFooterData', () => {
  it('should return expected result when there is data', () => {
    const mockInput: CMSRawData[] = [
      {
        consumer_footer: {
          bottomfooter: {
            CPI_text: {
              heading: 'cpi heading',
              text: 'cpi text',
            },
            copyright: {
              text: 'copyright text',
            },
            cookie_policy: {
              footerURL: 'cookie/footer/url',
              footerTitle: 'cookie footer title',
              id: 'cookie-footer-id',
            },
          },
          leftFooter: {
            Facebook: {
              footerTitle: 'Facebook',
              footerURL: 'facebook/url',
              name: 'Facebook link',
              id: 'facebook-id',
            },
          },
          rightFooter: {
            forms: {
              footerTitle: 'Ask our community',
              footerURL: 'https://forum.vodafone.co.uk/',
            },
          },
          content: {
            footer_buying: {
              id: 'main-content-footer-id',
              footerTitle: 'main content footer title',
              content: {
                item: {
                  footerURL: 'content/footer/url',
                  footerTitle: 'conent footer title',
                  id: 'conent-footer-id',
                },
              },
            },
          },
        },
      },
    ]

    const expectedOutput: CMSFooterProps = {
      icons: [{ id: 'facebook-id', icon: 'Facebook link', url: 'facebook/url', title: 'Facebook' }],
      verticalLinks: [
        {
          title: 'main content footer title',
          id: 'main-content-footer-id',
          links: [
            {
              url: 'content/footer/url',
              title: 'conent footer title',
              id: 'conent-footer-id',
            },
          ],
        },
      ],
      horizontalLinks: [
        {
          id: 'cookie-footer-id',
          title: 'cookie footer title',
          url: 'cookie/footer/url',
        },
      ],
      copyright: 'copyright text',
      additionalInfo: { content: { heading: 'cpi heading', text: 'cpi text' } },
      communityLink: { text: 'Ask our community', url: 'https://forum.vodafone.co.uk/' },
    }
    expect(cleanFooterData(mockInput)).toEqual(expectedOutput)
  })

  it('sould return expected result when there is no data', () => {
    const mockInput: CMSRawData[] = [
      {
        consumer_footer: {
          bottomfooter: {
            CPI_text: {
              heading: 'cpi heading',
              text: 'cpi text',
            },
            copyright: {
              text: 'copyright text',
            },
          },
          rightFooter: {
            forms: {},
          },
          leftFooter: {},
          content: {},
        },
      },
    ]

    const expectedOutput: CMSFooterProps = {
      icons: [],
      verticalLinks: [],
      horizontalLinks: [],
      copyright: 'copyright text',
      additionalInfo: {
        content: {
          heading: 'cpi heading',
          text: 'cpi text',
        },
      },
      communityLink: { text: '', url: '' },
    }
    expect(cleanFooterData(mockInput)).toEqual(expectedOutput)
  })
})
