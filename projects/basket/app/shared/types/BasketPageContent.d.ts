declare namespace BasketPageContent {
  export interface PageContent {
    basket: Basket
  }

  export interface Basket {
    vf_MetaDescription: string
    vf_enableGetinTouch: string
    vf_Modules: VfModules
    vf_PageTitle: string
    id: number
    friendlyName: string
    isBreadcrumbDisplayable: string
    vf_TealiumPageName: string
    vf_Robots: string[]
    name: string
    links_tracker: any[]
    category: string
    parents: any[]
  }

  export interface VfModules {
    basket_tradeIn: BasketTradeIn
    notifications: HbbPortfolioRefresh
    messages: HbbPortfolioRefresh
    basket_router_delivery_information: BasketRouterDeliveryInformation
    basket_esim: BasketEsim
    basket_esim_modal: BasketEsimModalClass
    basket_pac_stac_content: BasketEsimModalClass
    hbb_portfolio_refresh: HbbPortfolioRefresh
    lionheart_modal: Lionheart
    lionheart_basket_banner: Lionheart
    popular_esim_devices: PopularEsimDevices
  }

  export interface BasketEsim {
    content: BasketEsimContent
    name: string
    header: string
    id: number
    friendlyName: string
    parents: any[]
  }

  export interface BasketEsimContent {
    basket_keep_current_sim: HbbPortfolioRefresh
    basket_esim_get_sim: BasketEsimDeviceUpgrade
    basket_sim_card: HbbPortfolioRefresh
    basket_esim_info: BasketEsimDeviceUpgrade
    basket_esim_info_compatible: BasketEsimDeviceUpgrade
    basket_esim_get_sim_compatible: BasketEsimDeviceUpgrade
    basket_esim_device_upgrade: BasketEsimDeviceUpgrade
    basket_esim_simo_upgrade: BasketEsimDeviceUpgrade
  }

  export interface BasketEsimDeviceUpgrade {
    type?: Type
    featureLoading?: string
    acceptCTA?: string
    bodyText: string
    name: string
    header: string
    id: number
    friendlyName: string
    parents: any[]
    ctaURL?: string
    declineCTA?: string
  }

  export enum Type {
    Info = 'info',
  }

  export interface HbbPortfolioRefreshContent {
    hbb_portfolio_refersh_1year_apple_tv?: HbbPortfolioRefresh
    hbb_portfolio_refersh_intelligent_wifi?: HbbPortfolioRefresh
    hbb_portfolio_refersh_no_price_rise?: HbbPortfolioRefresh
    hbb_portfolio_refersh_2pound_together_discount?: HbbPortfolioRefresh
    hbb_portfolio_refresh_outofcontract_price_rise?: HbbPortfolioRefresh
    '30041'?: HbbPortfolioRefresh
    freedom_benefits?: BasketRouterDeliveryInformation
    ROAMING_AIRTIME_BENEFIT?: HbbPortfolioRefresh
    '030010'?: HbbPortfolioRefresh
    '030040'?: HbbPortfolioRefresh
    '030030'?: HbbPortfolioRefresh
    '030030_Business'?: HbbPortfolioRefresh
    '030050'?: HbbPortfolioRefresh
    connectivity_plan?: HbbPortfolioRefresh
    number_associated_watch?: HbbPortfolioRefresh
    chosen_connect?: HbbPortfolioRefresh
    MAX_AVAILABLE?: HbbPortfolioRefresh
    MAX_2_MBPS?: HbbPortfolioRefresh
    MAX_10_MBPS?: HbbPortfolioRefresh
    package_footer?: HbbPortfolioRefresh
    RPI_withoutVAT?: HbbPortfolioRefresh
    rpi?: HbbPortfolioRefresh
    SMALL_BUSINESS_BASKET_FOOTER?: HbbPortfolioRefresh
    flexi_upgrade_fee?: HbbPortfolioRefresh
    basket_bingo_subtotal_footer?: HbbPortfolioRefresh
    basket_label_modal_header?: HbbPortfolioRefresh
    basket_label_your_device_plan?: HbbPortfolioRefresh
    basket_label_your_airtime_plan?: HbbPortfolioRefresh
    basket_label_total_package_cost?: HbbPortfolioRefresh
    basket_label_total_phone_cost?: HbbPortfolioRefresh
    basket_label_total_monthly_cost?: HbbPortfolioRefresh
    basket_label_interest_rate?: HbbPortfolioRefresh
    basket_label_plan_type?: HbbPortfolioRefresh
    basket_label_monthly_cost?: HbbPortfolioRefresh
    basket_label_creditor?: HbbPortfolioRefresh
    basket_label_length_of_contract?: HbbPortfolioRefresh
    basket_label_apr?: HbbPortfolioRefresh
    basket_label_total_credit_amount?: HbbPortfolioRefresh
    basket_label_upfront_cost?: HbbPortfolioRefresh
    basket_label_modal_footer?: HbbPortfolioRefresh
    BSKT_INVALID_INPUT_042?: BasketEsimDeviceUpgrade
    MAX_SB_PLANS_EXCEEDED?: BasketEsimDeviceUpgrade
    DEMO_ERROR_MESSAGE?: DemoErrorMessage
    SUBCATEGORY_SMALLBUSINESS_INELIGIBLE_HANDSET?: BasketEsimDeviceUpgrade
    SUBCATEGORY_SOLETRADER_INELIGIBLE_LOAN_WATCH?: BasketEsimDeviceUpgrade
    SUBCATEGORY_SOLETRADER_INELIGIBLE_LOAN_PHONE?: BasketEsimDeviceUpgrade
    SUBCATEGORY_LOAN_NON_LOAN_MIX_WATCH?: BasketEsimDeviceUpgrade
    SUBCATEGORY_LOAN_NONLOAN_MIX_HANDSET?: BasketEsimDeviceUpgrade
    LOAN_DECLINE_CHECKOUT_WATCH_HANDSET?: BasketEsimDeviceUpgrade
    LOAN_DECLINE_CHECKOUT_HANDSET_WATCH?: BasketEsimDeviceUpgrade
    LOAN_DECLINE_CHECKOUT_WATCH_ONLY?: BasketEsimDeviceUpgrade
    LOAN_DECLINE_CHECKOUT_HANDSET_ONLY?: BasketEsimDeviceUpgrade
    Err_Vou_004?: BasketEsimDeviceUpgrade
    Err_Vou_003?: BasketEsimDeviceUpgrade
    Err_Vou_002?: BasketEsimDeviceUpgrade
    BSKT_INVALID_INPUT_037?: BasketEsimDeviceUpgrade
    Err_Vou_001?: BasketEsimDeviceUpgrade
    BSKT_INVALID_INPUT_068?: BasketEsimDeviceUpgrade
    BASKET_LOAN_CAP?: BasketEsimDeviceUpgrade
    BASKET_WATCH_CAP?: BasketEsimDeviceUpgrade
    BASKET_PHONE_CAP?: BasketEsimDeviceUpgrade
    MAXIMUM_LENDING_LIMIT?: BasketEsimDeviceUpgrade
    REPAYMENT_ISSUES?: BasketEsimDeviceUpgrade
    MAXIMUM_CTNS_WITH_CONCURRENT_LOANS?: BasketEsimDeviceUpgrade
    MAXIMUM_LOANS_FOR_CTN?: BasketEsimDeviceUpgrade
    MAXIMUM_ALLOWED_LOANS?: BasketEsimDeviceUpgrade
    MAX_LOAN_LIMIT_REACHED?: BasketEsimDeviceUpgrade
    BSKT_INVALID_INPUT_001?: BasketEsimDeviceUpgrade
    BSKT_INVALID_INPUT_047?: BasketEsimDeviceUpgrade
    basket_airtime_plan?: BasketEsimDeviceUpgrade
    AIRTIME_DEVICE_MISMATCH?: BasketEsimDeviceUpgrade
    LOAN_INVALID_UPFRONT_COST?: BasketEsimDeviceUpgrade
    LOAN_INVALID_DURATION?: BasketEsimDeviceUpgrade
    basket_airtime_plan_length?: BasketEsimDeviceUpgrade
    TRADEIN_QUOTE_EXP?: BasketEsimDeviceUpgrade
    basket_limited_company_partnership?: BasketEsimDeviceUpgrade
  }

  export interface HbbPortfolioRefresh {
    acceptCTA?: string
    name: string
    id: number
    friendlyName: string
    parents: any[]
    bodyText?: string
    content?: HbbPortfolioRefreshContent
  }

  export interface DemoErrorMessage {
    ctaURL: string
    featureNotAvailable: string
    type: Type
    acceptCTA: string
    bodyText: string
    declineCTA: string
    name: string
    header: string
    id: number
    friendlyName: string
    parents: any[]
  }

  export interface BasketRouterDeliveryInformation {
    subTitle?: string
    mainTitle: string
    name: string
    id: number
    friendlyName: string
    parents: any[]
    subLinks?: string[]
  }

  export interface BasketEsimModalClass {
    img: any[]
    moduleSubType: string
    additionalComponents: any[]
    id: number
    friendlyName: string
    heading: string
    name: string
    mainCopy: string
    parents: any[]
  }

  export interface BasketTradeIn {
    unique_code_label: string
    header_2: string
    name: string
    header_1: string
    textContent: string[]
    id: number
    device_label: string
    title: string
    friendlyName: string
    expiry_date_label: string
    parents: any[]
  }

  export interface Lionheart {
    primaryImg: PrimaryImg
    headerText: string
    buttonValue: string
    content: any[]
    name: string
    id: number
    friendlyName: string
    htmlBlock?: string
    parents: any[]
    linkText?: string
  }

  export interface PrimaryImg {
    'Polygon-background-white': PolygonBackgroundWhite
  }

  export interface PolygonBackgroundWhite {
    smallImage_bloblink_: string
    mediumImage_bloblink_: string
    desktopImage_bloblink_: string
    name: string
    id: number
    friendlyName: string
    parents: Parents
  }

  export interface Parents {
    'Image_P:1480076234475': ImageP1480076234475
  }

  export interface ImageP1480076234475 {
    name: string
    id: number
    parents: any[]
  }

  export interface PopularEsimDevices {
    title: string
    content: PopularEsimDevicesContent
    name: string
    header: string
    id: number
    friendlyName: string
    parents: any[]
  }

  export interface PopularEsimDevicesContent {
    apple_list: BasketRouterDeliveryInformation
    samsung_list: BasketRouterDeliveryInformation
    google_list: BasketRouterDeliveryInformation
  }
}
