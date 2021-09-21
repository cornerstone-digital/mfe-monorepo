import get from 'lodash/get'

import getCookie from '@web-shop-core/helpers/getCookie'

const getABTestFeatureValue = (value: string) => {
  return Boolean(get(window, `vfukTnt.basket.${value}`) || getCookie(value))
}

export default getABTestFeatureValue
