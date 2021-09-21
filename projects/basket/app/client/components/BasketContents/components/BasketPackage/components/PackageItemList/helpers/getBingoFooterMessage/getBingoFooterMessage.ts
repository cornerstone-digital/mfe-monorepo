import replaceContentParams from '@helpers/replaceContentParams'
import { hasHandset, hasWatch } from '@helpers/typeCheck'

const getBingoFooterMessage = (content: string = '', modelPackage?: BasketV2.ModelPackage | BasketV2.ModelPackage[]) => {
  const singlePackage = Array.isArray(modelPackage) ? modelPackage.find(({ hardwares }) => hasHandset(hardwares)) : modelPackage
  const planType = hasWatch(singlePackage?.hardwares) ? 'Watch Plan' : 'Phone Plan'
  const cmsReplacementValues = {
    '{param}': planType,
  }

  return replaceContentParams(content, cmsReplacementValues)
}

export default getBingoFooterMessage
