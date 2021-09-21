import StandardPageTemplate from '@vfuk/core-standard-page-template'
import { renderRoutes } from 'react-router-config'
import { CMSFooterProps, CMSHeaderProps, FooterPropsWithAdditionalInfo, MainTemplateProps } from './MainTemplate.types'
import { useEffect, useState } from 'react'

import { ThemeProvider } from 'styled-components'
import theme from '@vfuk/core-theme-ws2'
import { getTransformedFooterData, getTransformedHeaderData } from './helpers/cmsDataTransformers/cmsDataTransformers'

import { HeaderProps } from '@vfuk/core-header/dist/Header.types'
import { FooterProps } from '@vfuk/core-footer/dist/Footer.types'
import { getState } from '@web-shop-core/state/states/UserState'
import isBusinessCustomer from './helpers/isBusinessCustomer'

import fetchCMSData from '@helpers/fetchCMSData'
import cleanHeaderData from './helpers/cleanHeaderData'
import cleanFooterData from './helpers/cleanFooterData'

const defaultHeaderData: HeaderProps = {
  user: {
    name: '',
    links: [],
  },
  showBasket: true,
  showSearch: true,
  skipLink: false,
  mainLinks: [],
  topBar: {
    leftLinks: [],
    rightLinks: [],
  },
  onLinkClick: () => {},
}

const defaultFooterData: FooterPropsWithAdditionalInfo = {
  onInteractionClick: () => {},
  onLoad: () => {},
  social: [],
  linkGroups: [],
  legalLinks: [],
  copyrightText: '',
  companyInfo: '',
  additionalInfo: {
    content: {
      heading: '',
      text: '',
    },
  },
}

const MainTemplate: React.FunctionComponent<MainTemplateProps> = props => {
  const { route } = props

  const userState = getState()
  const [cmsHeaderData, setCmsHeaderData] = useState<CMSHeaderProps>({})
  const [cmsFooterData, setCmsFooterData] = useState<CMSFooterProps>({})

  const isBusiness = isBusinessCustomer(userState)

  useEffect(() => {
    fetchData()
  }, [])

  const footerAssetName = isBusiness ? 'business_footer' : 'consumer_footer'
  const headerAssetName = isBusiness ? 'business_meganav' : 'consumer_meganav'
  const fetchData = async () => {
    const cleanedCmsFooterData = await fetchCMSData<CMSFooterProps>(footerAssetName, cleanFooterData)
    setCmsFooterData(cleanedCmsFooterData)
    const cleanedCmsHeaderData = await fetchCMSData<CMSHeaderProps>(headerAssetName, cleanHeaderData)
    setCmsHeaderData(cleanedCmsHeaderData)
  }

  const transformedFooterData = getTransformedFooterData(cmsFooterData)
  const transformedHeaderData = getTransformedHeaderData(cmsHeaderData, userState)

  const footerData: FooterProps = {
    ...defaultFooterData,
    ...transformedFooterData,
  }

  const headerData: HeaderProps = {
    ...defaultHeaderData,
    ...transformedHeaderData,
  }

  return (
    <ThemeProvider theme={theme}>
      <StandardPageTemplate headerData={headerData} footerData={footerData}>
        <If condition={(route && route.routes?.length) as any}>{renderRoutes(route?.routes)}</If>
      </StandardPageTemplate>
    </ThemeProvider>
  )
}

export default MainTemplate
