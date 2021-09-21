import { FooterProps } from '@vfuk/core-footer/dist/Footer.types'
import { IconNames } from '@vfuk/core-icon/dist/IconNames.types'
import { RouteConfig } from 'react-router-config'
export interface MainTemplateProps {
  route?: RouteConfig
}

export type CMSHeaderLink = {
  title: string
  url: string
  icon: IconNames
}

export type CMSHeaderMainLink = {
  title: string
  icon: IconNames
  links: CMSHeaderLink[]
}

export type CMSHeaderProps = {
  mainLinks?: CMSHeaderMainLink[]
  topBar?: {
    leftLinks: CMSHeaderLink[]
    rightLinks: CMSHeaderLink[]
  }
}

export type CMSFooterLink = {
  id: string
  title: string
  url: string
}

export type CMSFooterLinkGroup = {
  id: string
  links: CMSFooterLink[]
  title: string
}

export type CMSFooterIcon = {
  id: string
  url: string
  title: string
  icon: string
}

export type CMSCommunityLink = {
  text: string
  url: string
}

export type CMSFooterAdditionalInfo = {
  content: {
    heading: string
    text: string
  }
}
export type CMSFooterProps = {
  communityLink?: CMSCommunityLink
  copyright?: string
  horizontalLinks?: CMSFooterLink[]
  verticalLinks?: CMSFooterLinkGroup[]
  icons?: CMSFooterIcon[]
  additionalInfo?: CMSFooterAdditionalInfo
}

export interface FooterPropsWithAdditionalInfo extends FooterProps {
  additionalInfo: CMSFooterAdditionalInfo
}

export type CMSFooterRawData = {
  bottomfooter: {
    [key: string]: {
      footerURL?: string
      footerTitle?: string
      id?: string
      text?: string
      heading?: string
    }
    copyright: {
      text: string
    }
    CPI_text: {
      heading: string
      text: string
    }
  }
  leftFooter: {
    [key: string]: {
      footerURL?: string
      footerTitle?: string
      id?: string
      name?: string
    }
  }
  rightFooter: {
    forms: {
      footerURL?: string
      footerTitle?: string
      id?: string
      name?: string
      friendlyName?: string
    }
  }
  content: {
    [key: string]: {
      footerTitle?: string
      content?: {
        [key: string]: {
          footerURL: string
          footerTitle: string
          id: string
        }
      }
      id?: string
    }
  }
}
export type CMSRawData = {
  consumer_footer?: CMSFooterRawData
  business_footer?: CMSFooterRawData
}
