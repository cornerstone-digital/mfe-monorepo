import { BasketError } from '@pages/BasketPage/BasketPage.types'

const getValidationButtonLink = (validationDetails?: BasketError[]) => {
  const appleLink = '/mobile/phones/pay-monthly-contracts/apple'
  const samsungLink = '/mobile/phones/pay-monthly-contracts/samsung'
  // determine the link - look into the validationDetails[0].errorMessage
  const errorMessage = (validationDetails?.length && validationDetails[0].errorMessage.toLowerCase()) || ''
  return errorMessage.includes('samsung') ? samsungLink : errorMessage.includes('apple') ? appleLink : ''
}

export default getValidationButtonLink
