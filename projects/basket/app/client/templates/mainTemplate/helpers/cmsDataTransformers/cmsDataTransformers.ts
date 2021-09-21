import { UserState } from '@pages/BasketPage/BasketPage.types'
import { Social, Link, LinkGroup } from '@vfuk/core-footer/dist/Footer.types'
import { CMSFooterProps, CMSHeaderProps, CMSFooterAdditionalInfo } from '../../MainTemplate.types'
import userLinksLoggedIn from '@web-shop-core/components/templates/UserDropdownTemplate/configs/userLinksLoggedIn'
import userLinksLoggedOut from '@web-shop-core/components/templates/UserDropdownTemplate/configs/userLinksLoggedOut'
import AnalyticsService from '@web-cms-core/core/organisms/CMSConsumerMegaNav/helpers/AnalyticsService'
import { lowerCase } from 'lodash'
import { IconProps } from '@vfuk/core-icon/dist/Icon.types'

const socialIconTranformer = (icon: any): Social => {
  return {
    name: `social-${lowerCase(icon.icon)}` as IconProps['name'],
    srText: icon.title,
    url: icon.url,
  } as Social
}

const footerLinkTransformer = (link: any): Link => {
  return {
    text: link.title,
    url: link.url,
  }
}

const footerLinkGroupTransformer = (linkGroup: any): LinkGroup => {
  return {
    headingText: linkGroup.title,
    links: linkGroup.links ? linkGroup.links.map(footerLinkTransformer) : [],
  }
}

export const getTransformedFooterData = (cmsFooterData: CMSFooterProps) => {
  return cmsFooterData
    ? {
        communityLink: cmsFooterData.communityLink,
        copyrightText: cmsFooterData.copyright || '',
        social: cmsFooterData.icons ? cmsFooterData.icons.map(socialIconTranformer) : [],
        linkGroups: cmsFooterData.verticalLinks ? cmsFooterData.verticalLinks.map(footerLinkGroupTransformer) : [],
        legalLinks: cmsFooterData.horizontalLinks ? cmsFooterData.horizontalLinks.map(footerLinkTransformer) : [],
        additionalInfo: (cmsFooterData.additionalInfo || {}) as CMSFooterAdditionalInfo,
      }
    : {}
}

export const getTransformedHeaderData = (cmsHeaderData: CMSHeaderProps, userState: UserState) => {
  const { mainLinks, topBar } = cmsHeaderData
  return cmsHeaderData
    ? {
        mainLinks: mainLinks ? [...mainLinks] : [],
        topBar: {
          leftLinks: topBar?.leftLinks ? topBar.leftLinks : [],
          rightLinks: topBar?.rightLinks ? topBar.rightLinks : [],
        },
        user: {
          name: '',
          links: !!userState && userState.loginStatus ? userLinksLoggedIn : userLinksLoggedOut,
        },
        onLinkClick: AnalyticsService.handleLinkClick,
      }
    : {}
}
