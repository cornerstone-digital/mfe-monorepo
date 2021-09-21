import { LoggerheadConfig } from '@cornerstone-digital/loggerhead'

declare global {
  const WEBPACK_ASSET_PREFIX: string
  const shallow: any
  const mount: any
  const snapshot: any
  const BeforeSuite: any
  const If: React.SFC<{ condition: boolean }>
  const For: React.SFC<{ each: string; index: string; of: object }>
  const Choose: React.SFC
  const When: React.SFC<{ condition: boolean }>
  const Otherwise: React.SFC
  interface Window {
    ___: BuildInfo
    VFUK: ClientGlobalVars
    utag: any
    vfukTnt: {
      basket: {
        planBenefitsAB: boolean
        withoutVat: boolean
      }
    }
  }
  namespace NodeJS {
    const shallow: any
    const mount: any
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
      history: History
      location: Location
    }
    interface Window {
      ___: BuildInfo
      VFUK: ClientGlobalVars
    }
  }
  namespace Express {
    interface Request {
      app: Application
    }
  }
}

export interface BuildInfo {
  BUILD_TIME: string
  BRANCH_HASH: string
  BRANCH_NAME: string
  LAST_TAG: string
  APP_VERSION: string
}

export interface FlagConfig {
  id?: string
  group?: string
  key: string
  environment?: string
  project?: string
  enabled: boolean
  flags: FlagConfig[]
}

export interface FeatureFlagConfig {
  enabled: boolean
  flags: FlagConfig[]
}

export interface FinancialInfo {
  fb_phone_cost?: string
  fb_interest_type?: string
  fb_interest_rate?: string
  fb_total_credit_amount?: string
  fb_apr?: string
  fb_length_contract?: string | number
  fb_creditor?: string
}

export interface FufDetails {
  upfront?: string
  monthly?: string
}

export interface ClientGlobalVars {
  env: {
    TEALIUM_ENVIRONMENT: string
    ASSET_URL: string
    CDN_DOMAIN: string
    AUTH_COOKIE_PREFIX: string
    FUT_PROD_WHITELIST_DOMAINS: string
    ENABLE_UDL_LOGS: string
    DALMATIAN_ENVIRONMENT: string
    ENABLE_DATADOG_RUM: string
  }
  vfukTnt: {
    basket: { [key: string]: string }
  }
  basketData: {
    financialInfo?: FinancialInfo[]
    fuf?: FufDetails
  }
}

export interface GlobalConfig {
  isProd?: boolean
  isTest: boolean
  environment: string
  stubApis: boolean
  pathPrefix: string
  http: {
    port: number
    robots: string
    methodWhiteList: string[]
    headers: {
      cache: {
        msToExpiry: number
      }
    }
  }
  cdnDomain: string
  logger: LoggerheadConfig
  validation: {
    bastion: {
      enabled: false
      multiPort: false
    }
  }
  featureFlags: FeatureFlagConfig
  state?: {
    persist?: boolean
  }
  strictMode?: boolean
  dal: {
    versioning: {
      enabled: boolean
      catalogueVersion: string
    }
  }
}
