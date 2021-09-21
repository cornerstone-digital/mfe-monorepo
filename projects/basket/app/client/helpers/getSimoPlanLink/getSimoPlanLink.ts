import { isSimo } from '@helpers/typeCheck'

const getSimoPlanLink = (pkg: BasketV2.ModelPackage): string => {
  // Using harcoded PROD url since this is meant to be used
  // for email deeplinking and all environments should have prod
  const isSimoPackage = isSimo(pkg.bundle)
  const planId = pkg?.bundle?.skuId
  if (isSimoPackage && planId) {
    return `https://www.vodafone.co.uk/mobile/best-sim-only-deals?planId=${planId}&login=true`
  }
  return ''
}

export default getSimoPlanLink
