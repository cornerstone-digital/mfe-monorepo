// @ts-nocheck
import {
  CMSFooterProps,
  CMSFooterIcon,
  CMSFooterLinkGroup,
  CMSFooterLink,
  CMSRawData,
  CMSFooterRawData,
  CMSCommunityLink,
} from '../../MainTemplate.types'

const cleanFooterData = (rawData: CMSRawData[]): CMSFooterProps => {
  const rawFooterData = (rawData[0].consumer_footer || rawData[0].business_footer || {}) as CMSFooterRawData
  const { heading = '', text = '' } = rawFooterData?.bottomfooter?.CPI_text || {}
  const { footerTitle: communityLinkText = '', footerURL: communityLinkUrl = '' } = rawFooterData?.rightFooter?.forms
  const copyright = rawFooterData?.bottomfooter?.copyright?.text || ''
  const icons: CMSFooterIcon[] = []
  const communityLink: CMSCommunityLink = { text: communityLinkText, url: communityLinkUrl }
  const verticalLinks: CMSFooterLinkGroup[] = []
  const horizontalLinks: CMSFooterLink[] = []
  const additionalInfo = { content: { heading, text } }

  try {
    Object.values(rawFooterData.leftFooter).forEach(({ footerTitle, footerURL, name, id }) => {
      icons.push({
        id: id || '',
        icon: name || '',
        url: footerURL || '',
        title: footerTitle || '',
      })
    })

    // TODO: Add our community? It's hardcoded from Shop...

    Object.values(rawFooterData.bottomfooter).forEach(({ footerURL, footerTitle, id }) => {
      if (footerURL)
        horizontalLinks.push({
          id: id || '',
          title: footerTitle || '',
          url: footerURL,
        })
    })

    Object.values(rawFooterData.content).forEach(({ footerTitle: mainFooterTitle, content = [], id: mainId }) => {
      const links = Object.values(content).map(({ footerURL, footerTitle, id }) => {
        return {
          url: footerURL,
          title: footerTitle,
          id,
        }
      })

      verticalLinks.push({
        title: mainFooterTitle || '',
        id: mainId || '',
        links,
      })
    })
  } catch (e) {
    console.warn('Unexpected data found in footer? ', e)
  }

  return {
    communityLink,
    icons,
    verticalLinks,
    horizontalLinks,
    copyright,
    additionalInfo,
  }
}

export default cleanFooterData
