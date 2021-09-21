import { BASKET_CONSTS } from '@constants'
import getIcon from './getIcon'

describe('getIcon', () => {
  it.each`
    planType                                  | displayName | output
    ${BASKET_CONSTS.PLAN_TYPE_BROADBAND_FTTH} | ${''}       | ${'broadband-or-wifi'}
    ${BASKET_CONSTS.PLAN_TYPE_WATCH_SIMO}     | ${''}       | ${'SIM-upgrade'}
    ${BASKET_CONSTS.PLAN_TYPE_HANDSET}        | ${'esim'}   | ${'cpu'}
    ${BASKET_CONSTS.PLAN_TYPE_HANDSET}        | ${'sim'}    | ${'sim'}
  `('should return correct icon', ({ planType, displayName, output }) => {
    expect(getIcon(planType, displayName)).toBe(output)
  })
})
