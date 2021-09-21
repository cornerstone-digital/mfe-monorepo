/**
 * Method to transform broadband plantype to readable names
 * @param {String} category
 * @param planType
 * @returns {Array}
 */
const mapToBroadband = (category?: string, planType?: string): string => {
  if (!category || !planType) return 'consumer'

  const broadbandTypes: { [key: string]: string } = {
    'BroadBand:FTTH': 'gigafast',
    'BroadBand:FTTC': category.toLowerCase() === 'consumer' ? 'superfast' : 'business',
  }

  return broadbandTypes[planType]
}

const mapBroadbandPlanType = (packages: BasketV2.ModelPackage[]): string[] => {
  return packages.map((broadbandpackage: BasketV2.ModelPackage) => {
    return mapToBroadband(broadbandpackage.accountCategory, broadbandpackage.planType)
  })
}

export default mapBroadbandPlanType
