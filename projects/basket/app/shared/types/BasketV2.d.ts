declare namespace BasketV2 {
  /**
   * AccessLine
   */
  export interface AccessLine {
    channelId?: string
    id?: string
    migrationEligibility?: boolean
    orderClassification?: 'New' | 'Migration'
    partialTelephoneNumber?: string
  }
  /**
   * ActiveBundle
   */
  export interface ActiveBundle {
    activeDiscounts?: BasketV2.ActiveDiscount[]
    assetIntegrationId?: string
    bundleId?: string
    bundlePrice?: BasketV2.ActiveBundlePrice
    identifier?: BasketV2.Tuple
    isActiveSubscription?: boolean
    packageLineId?: string
    planStartDate?: string // date
  }
  /**
   * ActiveBundlePrice
   */
  export interface ActiveBundlePrice {
    bundleId?: string
    merchandisingPromotions?: BasketV2.MerchandisingPromotion
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
  }
  /**
   * ActiveDiscount
   */
  export interface ActiveDiscount {
    discountId?: string
    offerId?: string
    qualifier?: BasketV2.Tuple
  }
  /**
   * AddActiveBundle
   */
  export interface AddActiveBundle {
    activeDiscounts?: BasketV2.AddActiveDiscount[]
    assetIntegrationId?: string
    bundleId?: string
    identifier?: BasketV2.Tuple
    /**
     * planStartDate as yyyy-MM-dd
     * example:
     * 2019-05-29
     */
    planStartDate?: string // date
  }
  namespace AddActiveBundlesUsingPUT {
    export interface BodyParameters {
      addActiveBundleList: BasketV2.AddActiveBundlesUsingPUT.Parameters.AddActiveBundleList
    }
    namespace Parameters {
      export type AddActiveBundleList = BasketV2.AddActiveBundle[]
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * AddActiveDiscount
   */
  export interface AddActiveDiscount {
    discountId?: string
  }
  /**
   * AddDevice
   */
  export interface AddDevice {
    action?: string
    attributes?: BasketV2.Attribute[]
    contractOptions?: BasketV2.ContractOptions
    skuId?: string
  }
  namespace AddExtrasUsingPOST1 {
    export interface BodyParameters {
      addProductRequest: BasketV2.AddExtrasUsingPOST1.Parameters.AddProductRequest
    }
    namespace Parameters {
      export type AddProductRequest = BasketV2.AddProductRequest
    }
    namespace Responses {
      export type $200 = BasketV2.CreatePackageResponse
      export type $201 = BasketV2.CreatePackageResponse
      export type $400 = BasketV2.ErrorResponse
      export type $409 = BasketV2.CompatibilityResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * AddPackage
   */
  export interface AddPackage {
    accountCategory?: string
    accountSubCategory?: 'soleTrader' | 'smallBusiness'
    additionalDetails?: {
      [name: string]: string
    }
    appointmentWindow?: BasketV2.AppointmentWindow
    bundle?: BasketV2.AddProduct
    confirmRequired?: boolean
    deviceFinancingId?: string
    hardwares?: BasketV2.AddDevice[]
    installationAddress?: BasketV2.InstallationAddress
    linePackageType?: string
    lineTreatmentType?: string
    packageLinkIdentifier?: string
    packageOfferCode?: string
    packageType?: string
    phoneNumber?: string
    primaryDeviceIdentifier?: string
    servicePoint?: BasketV2.ServicePoint
    serviceStartDate?: string
    services?: BasketV2.AddProduct[]
    tradeInCredit?: BasketV2.TradeInCredit
    tradeInOfferCode?: string
  }
  namespace AddPackageUsingPOST1 {
    export interface BodyParameters {
      addPackage: BasketV2.AddPackageUsingPOST1.Parameters.AddPackage
    }
    namespace Parameters {
      export type AddPackage = BasketV2.AddPackage
    }
    namespace Responses {
      export type $200 = BasketV2.CreatePackageResponse
      export type $201 = BasketV2.CreatePackageResponse
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * AddProduct
   */
  export interface AddProduct {
    action?: string
    attributes?: BasketV2.Attribute[]
    skuId?: string
  }
  /**
   * AddProductRequest
   */
  export interface AddProductRequest {
    products?: BasketV2.Product[]
  }
  /**
   * Allowance
   */
  export interface Allowance {
    displayUom?: string
    tilUom?: string
    type?: string
    uom?: string
    value?: string
  }
  namespace ApplyVoucherUsingPUT1 {
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $409 = BasketV2.Basket
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * AppointmentWindow
   */
  export interface AppointmentWindow {
    endTime?: string
    identificationId?: string
    operationalPreferenceCode?: string
    siteNotes?: BasketV2.SiteNote[]
    startDateTime?: string
    startTime?: string
    timeSlot?: string
  }
  /**
   * Attribute
   */
  export interface Attribute {
    name?: string
    value?: string
  }
  /**
   * AvailableServices
   */
  export interface AvailableServices {
    service?: string[]
  }
  /**
   * Basket
   */
  export interface Basket {
    activeBundles?: BasketV2.ActiveBundle[]
    affiliateFlag?: boolean
    affiliateId?: string
    basketId?: string
    changeCode?: string
    combiPackageIds?: string[]
    customerRequestedDate?: string
    deliveryInfo?: BasketV2.DeliveryInfo
    hashvalue?: string
    isChanged?: boolean
    isJourneyAddedToEmptyBasket?: boolean
    journey?: BasketV2.Journey
    lastModified?: string // date-time
    loanEligibilityStatus?: 'ELIGIBLE' | 'INELIGIBLE'
    metadata?: BasketV2.Metadata
    packages?: BasketV2.ModelPackage[]
    priceDetails?: BasketV2.PriceDetails
    priceProposal?: BasketV2.PriceProposal[]
    source?: string
    splitDeliveryEligible?: boolean
    totalMonthlyPriceSaving?: string
    totalOneoffPriceSaving?: string
    validated?: boolean
    vetOutcome?: BasketV2.VetOutcome
    voucherCode?: string
    voucherDescription?: string
    voucherErrorMessage?: string
  }
  /**
   * BenefitAdvertisement
   */
  export interface BenefitAdvertisement {
    skuId?: string
  }
  /**
   * Bundle
   */
  export interface Bundle {
    action?: string
    allowances?: BasketV2.Allowance[]
    attributes?: BasketV2.Attribute[]
    avgDownloadSpeed?: string
    benefits?: BasketV2.BenefitAdvertisement[]
    broadbandAntiVirus?: string
    bundleClass?: string
    bundleType?: string
    bundledServiceProducts?: BasketV2.BundledServiceProduct[]
    commitmentPeriod?: BasketV2.CommitmentPeriod
    description?: string
    displayDescription?: string
    displayName?: string
    displayOrder?: number // int32
    includedCalls?: string
    isChanged?: boolean
    isVodafoneGlobalRoaming?: boolean
    maxCapSpeed?: string
    merchandisingMedia?: BasketV2.MediaLink[]
    name?: string
    noPriceRise?: string
    packageLineId?: string
    paymentType?: string
    planCategory?: string
    portability?: BasketV2.Portability
    priceDetails?: BasketV2.BundlePrice
    productClass?: string
    serviceId?: string
    showInSummary?: boolean
    skuId?: string
    speed?: string
    wifiExpert?: string
  }
  /**
   * BundlePrice
   */
  export interface BundlePrice {
    listOfMerchandisingPromotion?: BasketV2.MerchandisingPromotion[]
    merchandisingPromotions?: BasketV2.MerchandisingPromotion
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
    removedPromotionFootNote?: string
    totalMonthlySavingsAmount?: BasketV2.DecimalPrice
  }
  /**
   * BundledServiceProduct
   */
  export interface BundledServiceProduct {
    description?: string
    miscellaneous?: BasketV2.Attribute[]
    name?: string
    priceDetail?: BasketV2.ServicePrice
    productClass?: string
    servicePointId?: string
    skuId?: string
  }
  /**
   * CardinalityIncompatibility
   */
  export interface CardinalityIncompatibility {
    groupCardinality?: string
    productIds?: string[]
    relationCardinality?: string
  }
  /**
   * CommitmentPeriod
   */
  export interface CommitmentPeriod {
    uom?: string
    value?: string
  }
  /**
   * CompatibilityPackage
   */
  export interface CompatibilityPackage {
    incompatibleProducts?: BasketV2.IncompatibleChildProduct[]
  }
  /**
   * CompatibilityResponse
   */
  export interface CompatibilityResponse {
    packages?: BasketV2.CompatibilityPackage[]
    valid?: boolean
  }
  /**
   * ContractOptions
   */
  export interface ContractOptions {
    customerType?: string
    duration?: BasketV2.Duration
    upFrontPrice?: number // double
  }
  /**
   * ContractOptionsDTO
   */
  export interface ContractOptionsDTO {
    duration?: BasketV2.DurationDTO
    upFrontPrice?: number // double
  }
  /**
   * CreateBasketRequest
   */
  export interface CreateBasketRequest {
    activeBundles?: BasketV2.AddActiveBundle[]
    affiliateFlag?: boolean
    affiliateId?: string
    customerRequestedDate?: string
    journey?: BasketV2.Journey
    packages?: BasketV2.AddPackage[]
    returnURL?: string
    source?: string
  }
  namespace CreateBasketUsingPOST1 {
    export interface BodyParameters {
      createBasketRequest: BasketV2.CreateBasketUsingPOST1.Parameters.CreateBasketRequest
    }
    namespace Parameters {
      export type CreateBasketRequest = BasketV2.CreateBasketRequest
    }
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $201 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * CreatePackageResponse
   */
  export interface CreatePackageResponse {
    accountCategory?: string
    accountSubCategory?: 'soleTrader' | 'smallBusiness'
    bundle?: BasketV2.Bundle
    combiPackageId?: string
    dependentOn?: string[]
    discounts?: BasketV2.Discount[]
    hardwares?: BasketV2.Hardware[]
    isChanged?: boolean
    packageId?: string
    packageOfferCode?: string
    packageType?: string
    priceDetails?: BasketV2.PackagePriceDetails
    removable?: boolean
    sequence?: number // int32
    services?: BasketV2.Service[]
    tradeInCredit?: BasketV2.TradeInCredit
    voucherCode?: string
  }
  /**
   * Credit
   * There are 3 types of credits to note: bacs is a bank transfer, oneOffBillCredit is a one off bill credit added to the account and monthlyBillCredit is a reduction each month
   */
  export interface Credit {
    creditProductId?: number // int32
    guaranteedPrice?: number // double
    monthlyCredit?: BasketV2.MonthlyCredit
    type?: 'BACS' | 'ONE_OFF_BILL_CREDIT' | 'MONTHLY_BILL_CREDIT'
    upToPrice?: number // double
  }
  /**
   * DecimalPrice
   */
  export interface DecimalPrice {
    /**
     * The GROSS component of price (price including VAT)
     * example:
     * 12
     */
    gross?: number
    /**
     * The NET component of price
     * example:
     * 10
     */
    net?: number
    /**
     * The unit of measure. Applies to net, vat & gross values
     * example:
     * £
     */
    uom?: string
    /**
     * The VAT component of price
     * example:
     * 2
     */
    vat?: number
  }
  namespace DeleteActiveBundlesUsingDELETE {
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * DeleteBasketResponse
   */
  export interface DeleteBasketResponse {
    basketId?: string
  }
  namespace DeleteBasketUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.DeleteBasketResponse
      export type $204 = BasketV2.DeleteBasketResponse
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace DeleteBundlePortabilityUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace DeleteCombiPackageUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace DeletePackageUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * DeliveryInfo
   */
  export interface DeliveryInfo {
    availableFrom?: string
    deliveryType?: string
    displayName?: string
    price?: BasketV2.Price
    skuId?: string
    stockStatus?: string
    storeInfo?: BasketV2.StoreInfo
  }
  /**
   * DeviceBriefDescription
   */
  export interface DeviceBriefDescription {
    key?: string
    type?: string
    value?: string
    valueUOM?: string
  }
  /**
   * DeviceFinancingOption
   */
  export interface DeviceFinancingOption {
    apr?: string
    deviceFinancingId?: string
    financeProvider?: string
    financeTerm?: string
    monthlyPrice?: BasketV2.Price
    selected?: boolean
    totalPriceWithInterest?: BasketV2.Price
  }
  /**
   * DevicePaymentPlan
   */
  export interface DevicePaymentPlan {
    aprRepresentative?: string
    description?: string
    duration?: BasketV2.Duration
    interestRate?: string
    monthlyDiscountPrice?: BasketV2.DevicePrice
    monthlyPrice?: BasketV2.DevicePrice
    totalHandsetCredit?: BasketV2.DevicePrice
    totalHandsetPrice?: BasketV2.DevicePrice
    upFrontDiscountPrice?: BasketV2.DevicePrice
    upFrontPrice?: BasketV2.DevicePrice
  }
  /**
   * DevicePrice
   */
  export interface DevicePrice {
    gross?: string
    net?: string
    uom?: string
    vat?: string
  }
  /**
   * Discount
   */
  export interface Discount {
    action?: string
    confirmedRequired?: string
    discountValue?: BasketV2.DiscountValue
    duration?: string
    label?: string
    merchandisingMedia?: BasketV2.MediaLink[]
    productLineId?: string
    skuId?: string
    tag?: string
    tenure?: string
  }
  /**
   * DiscountValue
   */
  export interface DiscountValue {
    type?: string
    value?: string
  }
  /**
   * Duration
   */
  export interface Duration {
    uom?: string
    value?: string
  }
  /**
   * DurationDTO
   */
  export interface DurationDTO {
    uom?: string
    value?: string
  }
  /**
   * EmptyBasketResponse
   */
  export interface EmptyBasketResponse {
    basketId?: string
  }
  namespace EmptyBasketUsingPOST1 {
    namespace Responses {
      export type $200 = BasketV2.EmptyBasketResponse
      export type $204 = BasketV2.EmptyBasketResponse
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * ErrorResponse
   */
  export interface ErrorResponse {
    errorCode?: string
    errorMessage?: string
    referenceId?: string
    validationDetails?: BasketV2.ValidationDetail[]
  }
  /**
   * ExcludesIncompatibility
   */
  export interface ExcludesIncompatibility {
    productIds?: string[]
  }
  /**
   * Grade
   */
  export interface Grade {
    condition?: string
    level?: string
  }
  /**
   * Hardware
   */
  export interface Hardware {
    action?: string
    attributes?: BasketV2.Attribute[]
    boxPrice?: BasketV2.Price
    capacity?: string
    colourHexcode?: string
    colourName?: string
    deviceSize?: string
    contractOptions?: BasketV2.ContractOptions
    description?: string
    deviceBriefDescription?: BasketV2.DeviceBriefDescription[]
    deviceColor?: string
    devicePromotion?: string
    deviceSize?: string
    displayDescription?: string
    displayName?: string
    displayOrder?: number // int32
    freeGift?: boolean
    groupType?: string
    isChanged?: boolean
    isCompatibleWithWatch?: boolean
    make?: string
    memorySize?: string
    merchandisingMedia?: BasketV2.MediaLink[]
    model?: string
    name?: string
    packageLineId?: string
    priceDetails?: BasketV2.HardwarePrice
    productClass?: string
    productSubClass?: string
    shortDisplayName?: string
    showInSummary?: boolean
    simType?: 'ESIMONLY' | 'HYBRID' | 'PHYSICAL'
    skuId?: string
  }
  /**
   * HardwarePrice
   */
  export interface HardwarePrice {
    deviceFinancingId?: string
    devicePaymentPlan?: BasketV2.DevicePaymentPlan
    financingOptions?: BasketV2.DeviceFinancingOption[]
    merchandisingPromotions?: BasketV2.MerchandisingPromotion
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
    oneOffDiscountPrice?: BasketV2.Price
    oneOffPrice?: BasketV2.Price
  }
  /**
   * Identification
   */
  export interface Identification {
    contextId?: string
    id?: string
  }
  /**
   * IncompatibleChildProduct
   */
  export interface IncompatibleChildProduct {
    cardinalityIncompatibility?: BasketV2.CardinalityIncompatibility
    excludesIncompatibility?: BasketV2.ExcludesIncompatibility
    productId?: string
    requiresIncompatibility?: BasketV2.RequiresIncompatibility
    unavailable?: boolean
  }
  /**
   * InstallationAddress
   */
  export interface InstallationAddress {
    citySubDivisionName?: string
    country?: string
    county?: string
    flatNumber?: string
    houseName?: string
    houseNumber?: string
    identification?: BasketV2.Identification
    locality?: string
    moveTypeCode?: string
    postCode?: string
    streetName?: string
    town?: string
  }
  /**
   * ItemReference
   */
  export interface ItemReference {
    classificationCode?: string
    identificationId?: string
    name?: string
  }
  /**
   * Journey
   */
  export interface Journey {
    journeyType?: string
    offerCode?: string
  }
  /**
   * LineDirectory
   */
  export interface LineDirectory {
    directoryCode?: string
    featureCode?: string
    locationCode?: string
  }
  /**
   * LineLocator
   */
  export interface LineLocator {
    cableLinkID?: string
    distributionPoint?: string
    districtCode?: string
    exchangeCode?: string
    exchangeName?: string
    l2SID?: string
  }
  /**
   * LineReference
   */
  export interface LineReference {
    availableServices?: BasketV2.AvailableServices
    lineDirectory?: BasketV2.LineDirectory[]
    lineLocator?: BasketV2.LineLocator
    lineSettings?: BasketV2.LineSettings
    lineStatus?: BasketV2.LineStatus
  }
  /**
   * LineSettings
   */
  export interface LineSettings {
    installationCode?: string
    serviceCode?: string
    terminationCode?: string
  }
  /**
   * LineSpeeds
   */
  export interface LineSpeeds {
    avgDownSpeed?: string
    bandwidthMeasure?: string
    lastObservedDate?: string
    maxDownSpeed?: string
    maxUpSpeed?: string
    minDownSpeed?: string
    minGuaranteedDownSpeed?: string
    minUpSpeed?: string
  }
  /**
   * LineStatus
   */
  export interface LineStatus {
    accessLineStatus?: string
    gnpStatus?: string
    lineOption?: string
    lineType?: string
    narrowBandServicesAvailable?: string
    standbyPowerRequired?: boolean
    statusCode?: string
    technology?: string
    tempStructure?: boolean
  }
  /**
   * LineTreatment
   */
  export interface LineTreatment {
    appointmentNeeded?: boolean
    connectionCharge?: string
    earliestAvailableDate?: string
    identification?: string
    preOrder?: boolean
    registerOfInterest?: boolean
  }
  /**
   * MediaLink
   */
  export interface MediaLink {
    footNotes?: string[]
    id?: string
    type?: string
    value?: string
  }
  /**
   * MerchandisingPromotion
   */
  export interface MerchandisingPromotion {
    belowTheLine?: string
    category?: string
    confirmRequired?: boolean
    description?: string
    discountId?: string
    footNotes?: string[]
    label?: string
    mpType?: string
    offerGroup?: string
    packageType?: string[]
    priceEstablishedLabel?: string
    priority?: string
    qualifier?: BasketV2.Qualifier
    tag?: string
  }
  /**
   * Metadata
   */
  export interface Metadata {
    basketStatus?: string
    reason?: string
    returnURL?: string
    salesOrderId?: string
  }
  /**
   * MiniBundle
   */
  export interface MiniBundle {
    commitmentPeriod?: BasketV2.CommitmentPeriod
    displayName?: string
    packageLineId?: string
    priceDetails?: BasketV2.PriceDetails
    skuId?: string
  }
  /**
   * MiniHardware
   */
  export interface MiniHardware {
    contractOptions?: BasketV2.ContractOptions
    displayName?: string
    packageLineId?: string
    priceDetails?: BasketV2.PriceDetails
    skuId?: string
  }
  /**
   * MiniPackage
   */
  export interface MiniPackage {
    accessories?: BasketV2.MiniHardware[]
    basketId?: string
    bundle?: BasketV2.MiniBundle
    hardware?: BasketV2.MiniHardware
    insurance?: BasketV2.MiniService
    packageId?: string
    packageOfferCode?: string
    passes?: BasketV2.MiniService[]
    priceDetails?: BasketV2.PriceDetails
    tradeInCredit?: BasketV2.TradeInCredit
  }
  /**
   * MiniService
   */
  export interface MiniService {
    displayName?: string
    packageLineId?: string
    priceDetails?: BasketV2.PriceDetails
    skuId?: string
  }
  /**
   * MiscReference
   */
  export interface MiscReference {
    anfp?: string
    customerAgreedDate?: string
    installationType?: string
    lineLength?: string
    readyForServiceDate?: string
    serviceProviderName?: string
  }
  /**
   * ModelPackage
   */
  export interface ModelPackage {
    accountCategory?: string
    accountSubCategory?: 'soleTrader' | 'smallBusiness'
    additionalDetails?: {
      [name: string]: string
    }
    appointmentWindow?: BasketV2.AppointmentWindow
    bundle?: BasketV2.Bundle
    combiPackageId?: string
    confirmRequired?: boolean
    dependentOn?: string[]
    deviceFinancingId?: string
    discounts?: BasketV2.Discount[]
    hardwares?: BasketV2.Hardware[]
    installationAddress?: BasketV2.InstallationAddress
    isChanged?: boolean
    linePackageType?: string
    lineTreatmentType?: string
    packageId?: string
    packageLinkIdentifier?: string
    packageOfferCode?: string
    packageType?: string
    phoneNumber?: string
    planType?: string
    priceDetails?: BasketV2.PackagePriceDetails
    primaryDeviceIdentifier?: string
    removable?: boolean
    sequence?: number // int32
    servicePoint?: BasketV2.ServicePoint
    serviceStartDate?: string
    services?: BasketV2.Service[]
    tradeInCredit?: BasketV2.TradeInCredit
    tradeInOfferCode?: string
    voucherCode?: string
  }
  /**
   * MonthlyCredit
   */
  export interface MonthlyCredit {
    monthlyPrice?: number // double
    tenure?: number // int32
  }
  /**
   * PackagePriceDetails
   */
  export interface PackagePriceDetails {
    financingOptions?: BasketV2.DeviceFinancingOption[]
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
    oneOffDiscountPrice?: BasketV2.Price
    oneOffPrice?: BasketV2.Price
  }
  /**
   * PatchPackage
   */
  export interface PatchPackage {
    packageLinkIdentifier?: string
    primaryDeviceIdentifier?: string
    simPatchType?: 'ESIM' | 'PHYSICAL'
    tradeInCredit?: BasketV2.TradeInCredit
    tradeInOfferCode?: string
  }
  namespace PatchPackageUsingPATCH {
    export interface BodyParameters {
      patchPackage: BasketV2.PatchPackageUsingPATCH.Parameters.PatchPackage
    }
    namespace Parameters {
      export type PatchPackage = BasketV2.PatchPackage
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * PendingOrder
   */
  export interface PendingOrder {
    completionDate?: string
    thirdPartyFlag?: string
    typeCode?: string
  }
  /**
   * Portability
   */
  export interface Portability {
    code?: string
    codeType?: 'PAC' | 'STAC'
    donorNetworkOperator?: string
    donorServiceProvider?: string
    expiryDate?: string // date-time
    msisdn?: string
    reason?: string
    reasonCode?: string
    status?: 'VALID' | 'INVALID'
    validPortDate?: string // date-time
  }
  /**
   * PremiseAndServicePoint
   */
  export interface PremiseAndServicePoint {
    installationAddress?: BasketV2.InstallationAddress
    linePackageType?: string
    lineTreatmentType?: string
    phoneNumber?: string
    servicePoint?: BasketV2.ServicePoint
  }
  /**
   * Price
   */
  export interface Price {
    gross?: string
    net?: string
    vat?: string
  }
  /**
   * PriceDetails
   */
  export interface PriceDetails {
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
    oneOffDiscountPrice?: BasketV2.Price
    oneOffPrice?: BasketV2.Price
    totalMonthlySaving?: BasketV2.Price
    totalOneoffSaving?: BasketV2.Price
  }
  /**
   * PriceProposal
   */
  export interface PriceProposal {
    packageId?: string
    productDetail?: BasketV2.PriceProposalProductDetail
    promotionType?: 'CROSS_SELL'
    qualifyingLine?: BasketV2.ProposalQualifier
    saving?: BasketV2.PriceProposalSaving
  }
  /**
   * PriceProposalProductDetail
   */
  export interface PriceProposalProductDetail {
    category?: 'SIMO_24' | 'SIMO_18' | 'FTR6' | 'WATCH'
    lineType?: 'QUALIFYING_LINE' | 'REWARD_LINE'
  }
  /**
   * PriceProposalSaving
   */
  export interface PriceProposalSaving {
    exact?: BasketV2.ProposalSavingValue
    maximum?: BasketV2.ProposalSavingValue
    minimum?: BasketV2.ProposalSavingValue
  }
  /**
   * PrimaryDeviceIdentifierRequest
   */
  export interface PrimaryDeviceIdentifierRequest {
    primaryDeviceIdentifier?: string
  }
  /**
   * Product
   */
  export interface Product {
    action?: string
    deviceFinancingId?: string
    productType?: string
    skuId?: string
  }
  /**
   * ProposalQualifier
   */
  export interface ProposalQualifier {
    bundleId?: string
    displayName?: string
    identifier?: BasketV2.Tuple
  }
  /**
   * ProposalSavingValue
   */
  export interface ProposalSavingValue {
    message?: string
    uom?: string
    value?: number // double
  }
  /**
   * Qualifier
   */
  export interface Qualifier {
    bundleId?: string
    identifier?: BasketV2.Tuple
  }
  namespace ReadBasketUsingGET1 {
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace ReadMiniPackageUsingGET1 {
    namespace Responses {
      export type $200 = BasketV2.MiniPackage
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace RemoveExtrasFromPackageUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.CreatePackageResponse
      export type $400 = BasketV2.ErrorResponse
      export type $409 = BasketV2.CompatibilityResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace RemoveExtrasUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.CreatePackageResponse
      export type $201 = BasketV2.CreatePackageResponse
      export type $400 = BasketV2.ErrorResponse
      export type $409 = BasketV2.CompatibilityResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace RemoveVoucherUsingDELETE1 {
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * RequiresIncompatibility
   */
  export interface RequiresIncompatibility {
    productClasses?: string[]
    productIds?: string[]
    productLines?: string[]
  }
  /**
   * ResponseEntity
   */
  export interface ResponseEntity {
    body?: {}
    statusCode?:
      | '100 CONTINUE'
      | '101 SWITCHING_PROTOCOLS'
      | '102 PROCESSING'
      | '103 CHECKPOINT'
      | '200 OK'
      | '201 CREATED'
      | '202 ACCEPTED'
      | '203 NON_AUTHORITATIVE_INFORMATION'
      | '204 NO_CONTENT'
      | '205 RESET_CONTENT'
      | '206 PARTIAL_CONTENT'
      | '207 MULTI_STATUS'
      | '208 ALREADY_REPORTED'
      | '226 IM_USED'
      | '300 MULTIPLE_CHOICES'
      | '301 MOVED_PERMANENTLY'
      | '302 FOUND'
      | '302 MOVED_TEMPORARILY'
      | '303 SEE_OTHER'
      | '304 NOT_MODIFIED'
      | '305 USE_PROXY'
      | '307 TEMPORARY_REDIRECT'
      | '308 PERMANENT_REDIRECT'
      | '400 BAD_REQUEST'
      | '401 UNAUTHORIZED'
      | '402 PAYMENT_REQUIRED'
      | '403 FORBIDDEN'
      | '404 NOT_FOUND'
      | '405 METHOD_NOT_ALLOWED'
      | '406 NOT_ACCEPTABLE'
      | '407 PROXY_AUTHENTICATION_REQUIRED'
      | '408 REQUEST_TIMEOUT'
      | '409 CONFLICT'
      | '410 GONE'
      | '411 LENGTH_REQUIRED'
      | '412 PRECONDITION_FAILED'
      | '413 PAYLOAD_TOO_LARGE'
      | '413 REQUEST_ENTITY_TOO_LARGE'
      | '414 URI_TOO_LONG'
      | '414 REQUEST_URI_TOO_LONG'
      | '415 UNSUPPORTED_MEDIA_TYPE'
      | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
      | '417 EXPECTATION_FAILED'
      | '418 I_AM_A_TEAPOT'
      | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
      | '420 METHOD_FAILURE'
      | '421 DESTINATION_LOCKED'
      | '422 UNPROCESSABLE_ENTITY'
      | '423 LOCKED'
      | '424 FAILED_DEPENDENCY'
      | '425 TOO_EARLY'
      | '426 UPGRADE_REQUIRED'
      | '428 PRECONDITION_REQUIRED'
      | '429 TOO_MANY_REQUESTS'
      | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
      | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
      | '500 INTERNAL_SERVER_ERROR'
      | '501 NOT_IMPLEMENTED'
      | '502 BAD_GATEWAY'
      | '503 SERVICE_UNAVAILABLE'
      | '504 GATEWAY_TIMEOUT'
      | '505 HTTP_VERSION_NOT_SUPPORTED'
      | '506 VARIANT_ALSO_NEGOTIATES'
      | '507 INSUFFICIENT_STORAGE'
      | '508 LOOP_DETECTED'
      | '509 BANDWIDTH_LIMIT_EXCEEDED'
      | '510 NOT_EXTENDED'
      | '511 NETWORK_AUTHENTICATION_REQUIRED'
    statusCodeValue?: number // int32
  }
  /**
   * Service
   */
  export interface Service {
    action?: string
    allowances?: BasketV2.Allowance[]
    attributes?: BasketV2.Attribute[]
    dataRollover?: string
    description?: string
    displayDescription?: string
    displayName?: string
    freeGift?: boolean
    isChanged?: boolean
    merchandisingMedia?: BasketV2.MediaLink[]
    name?: string
    packageLineId?: string
    planDuration?: BasketV2.CommitmentPeriod
    priceDetails?: BasketV2.ServicePrice
    productClass?: string
    rewardPoints?: string
    rootProductId?: string
    skuId?: string
    specificationGroup?: BasketV2.Specifications[]
  }
  /**
   * ServiceLine
   */
  export interface ServiceLine {
    itemReference?: BasketV2.ItemReference
    lineSpeeds?: BasketV2.LineSpeeds
    miscRefernce?: BasketV2.MiscReference
    serviceLineTreatments?: BasketV2.ServiceLineTreatment[]
  }
  /**
   * ServiceLineTreatment
   */
  export interface ServiceLineTreatment {
    accessLine?: BasketV2.AccessLine
    canNumberBeRetained?: boolean
    lineInfo?: string
    parentIdentification?: string
    pendingOrders?: BasketV2.PendingOrder[]
    portInFlag?: string
    serviceAction?: string
    serviceType?: string
    simValue?: string
    vicCode?: string
  }
  /**
   * ServiceLines
   */
  export interface ServiceLines {
    classificationCode?: string
    lineTreatments?: BasketV2.LineTreatment[]
    networkType?: string
    serviceLines?: BasketV2.ServiceLine[]
  }
  /**
   * ServicePoint
   */
  export interface ServicePoint {
    lineReference?: BasketV2.LineReference
    lineRefernece?: BasketV2.LineReference
    serviceReference?: BasketV2.ServiceReference
  }
  /**
   * ServicePrice
   */
  export interface ServicePrice {
    merchandisingPromotions?: BasketV2.MerchandisingPromotion
    monthlyDiscountPrice?: BasketV2.Price
    monthlyPrice?: BasketV2.Price
    oneOffDiscountPrice?: BasketV2.Price
    oneOffPrice?: BasketV2.Price
  }
  /**
   * ServiceReference
   */
  export interface ServiceReference {
    serviceLines?: BasketV2.ServiceLines[]
  }
  /**
   * ServiceStartDateRequest
   */
  export interface ServiceStartDateRequest {
    serviceStartDate?: string
  }
  /**
   * SiteNote
   */
  export interface SiteNote {
    notes?: string
    typeCode?: string
  }
  /**
   * Specifications
   */
  export interface Specifications {
    comparable?: string
    description?: string
    footNote?: string
    iskey?: string
    name?: string
    specPriority?: string
    value?: string
    valueType?: string
    valueUOM?: string
  }
  /**
   * StoreInfo
   */
  export interface StoreInfo {
    stockStatus?: string
    storeAlias?: string
    storeId?: string
    storeName?: string
  }
  /**
   * TradeInCredit
   * Trade in Credit object for holding trade in selection for customer. This provides discounts against the bill depending on selected phone and discount types. Provided from external system.
   */
  export interface TradeInCredit {
    credit?: BasketV2.Credit
    deviceId?: string
    deviceName?: string
    diagnostic?: boolean
    expiryDateTime?: string // date-time
    grade?: BasketV2.Grade
    installedId?: string
    quoteId?: string
  }
  /**
   * Tuple
   */
  export interface Tuple {
    key?: string
    value?: string
  }
  /**
   * UpdateBasketRequest
   */
  export interface UpdateBasketRequest {
    affiliateFlag?: boolean
    customerRequestedDate?: string
    deliveryInfo?: BasketV2.DeliveryInfo
    metadata?: BasketV2.Metadata
    removeVoucherCode?: boolean
    vetOutcome?: BasketV2.VetOutcome
    voucherCode?: string
  }
  namespace UpdateBasketUsingPUT1 {
    export interface BodyParameters {
      updateBasket: BasketV2.UpdateBasketUsingPUT1.Parameters.UpdateBasket
    }
    namespace Parameters {
      export type UpdateBasket = BasketV2.UpdateBasketRequest
    }
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdateBroadbandPackageUsingPUT1 {
    export interface BodyParameters {
      appointmentWindow: BasketV2.UpdateBroadbandPackageUsingPUT1.Parameters.AppointmentWindow
    }
    namespace Parameters {
      export type AppointmentWindow = BasketV2.AppointmentWindow
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * UpdateBundle
   */
  export interface UpdateBundle {
    action?: string
    productLineId?: string
    skuId?: string
  }
  namespace UpdateBundlePortabilityUsingPUT1 {
    export interface BodyParameters {
      portability: BasketV2.UpdateBundlePortabilityUsingPUT1.Parameters.Portability
    }
    namespace Parameters {
      export type Portability = BasketV2.Portability
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * UpdateDevice
   */
  export interface UpdateDevice {
    action?: string
    contractOptions?: BasketV2.ContractOptions
    deviceFinancingId?: string
    productLineId?: string
    skuId?: string
  }
  /**
   * UpdateFinancingOptionRequest
   */
  export interface UpdateFinancingOptionRequest {
    deviceFinancingId?: string
  }
  namespace UpdateFinancingOptionUsingPUT1 {
    export interface BodyParameters {
      updateFinancingOptionRequest: BasketV2.UpdateFinancingOptionUsingPUT1.Parameters.UpdateFinancingOptionRequest
    }
    namespace Parameters {
      export type UpdateFinancingOptionRequest = BasketV2.UpdateFinancingOptionRequest
    }
    namespace Responses {
      export type $200 = BasketV2.Basket
      export type $204 = BasketV2.Basket
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdateHardwareUsingPUT1 {
    export interface BodyParameters {
      updateHardwareRequest: BasketV2.UpdateHardwareUsingPUT1.Parameters.UpdateHardwareRequest
    }
    namespace Parameters {
      export type UpdateHardwareRequest = BasketV2.AddDevice
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdateHardwareWithContractOptionsUsingPUT {
    export interface BodyParameters {
      contractOptionsDTO: BasketV2.UpdateHardwareWithContractOptionsUsingPUT.Parameters.ContractOptionsDTO
    }
    namespace Parameters {
      export type ContractOptionsDTO = BasketV2.ContractOptionsDTO
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdateJourneyUsingPUT1 {
    export interface BodyParameters {
      journey: BasketV2.UpdateJourneyUsingPUT1.Parameters.Journey
    }
    namespace Parameters {
      export type Journey = BasketV2.Journey
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * UpdatePackage
   */
  export interface UpdatePackage {
    accountCategory?: string
    accountSubCategory?: 'soleTrader' | 'smallBusiness'
    bundle?: BasketV2.UpdateBundle
    confirmRequired?: boolean
    hardwares?: BasketV2.UpdateDevice[]
    packageOfferCode?: string
    packageType?: string
    services?: BasketV2.UpdateService[]
    tradeInCredit?: BasketV2.TradeInCredit
    tradeInOfferCode?: string
  }
  namespace UpdatePackageUsingPUT1 {
    export interface BodyParameters {
      updatePackage: BasketV2.UpdatePackageUsingPUT1.Parameters.UpdatePackage
    }
    namespace Parameters {
      export type UpdatePackage = BasketV2.UpdatePackage
    }
    namespace Responses {
      export type $200 = BasketV2.ModelPackage
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdatePremiseAndServicePointUsingPUT1 {
    export interface BodyParameters {
      premiseAndServicePoint: BasketV2.UpdatePremiseAndServicePointUsingPUT1.Parameters.PremiseAndServicePoint
    }
    namespace Parameters {
      export type PremiseAndServicePoint = BasketV2.PremiseAndServicePoint
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace UpdatePrimaryDeviceIdentifierUsingPUT {
    export interface BodyParameters {
      updatePrimaryDeviceIdentifierRequest: BasketV2.UpdatePrimaryDeviceIdentifierUsingPUT.Parameters.UpdatePrimaryDeviceIdentifierRequest
    }
    namespace Parameters {
      export type UpdatePrimaryDeviceIdentifierRequest = BasketV2.PrimaryDeviceIdentifierRequest
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * UpdateService
   */
  export interface UpdateService {
    action?: string
    productLineId?: string
    skuId?: string
  }
  namespace UpdateServiceStartDateUsingPUT1 {
    export interface BodyParameters {
      serviceStartDateRequest: BasketV2.UpdateServiceStartDateUsingPUT1.Parameters.ServiceStartDateRequest
    }
    namespace Parameters {
      export type ServiceStartDateRequest = BasketV2.ServiceStartDateRequest
    }
    namespace Responses {
      export type $200 = BasketV2.ResponseEntity
      export type $204 = BasketV2.ResponseEntity
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  namespace ValidateBasketUsingPOST1 {
    namespace Responses {
      export type $200 = BasketV2.CompatibilityResponse
      export type $400 = BasketV2.ErrorResponse
      export type $500 = BasketV2.ErrorResponse
    }
  }
  /**
   * ValidationDetail
   */
  export interface ValidationDetail {
    errorCode?: string
    errorMessage?: string
  }
  /**
   * VetOutcome
   */
  export interface VetOutcome {
    availableNumberOfConnections?: string
    availableRecurringChargeLimit?: string
    creditVetId?: string
    outcomeCode?: string
  }
}
