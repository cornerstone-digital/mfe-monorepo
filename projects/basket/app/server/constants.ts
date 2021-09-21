// Match env variable strings
export const FEATURE_FLAGS_CONSTS = {
  BINGO: 'bingo',
  ESIM: 'esim',
  BINGO_LAUNCHED: 'bingo_launched',
  BINGO_ONENUMBERRENAME: 'bingo_onenumberrename',
}

export const FEATURE_FLAG_LD_KEYS: Record<string, string> = {
  [FEATURE_FLAGS_CONSTS.BINGO]: 'web-shop-basket-bingo-enabled',
  [FEATURE_FLAGS_CONSTS.ESIM]: 'web-shop-basket-esim-enabled',
  [FEATURE_FLAGS_CONSTS.BINGO_LAUNCHED]: 'web-shop-basket-bingo-launch-enabled',
  [FEATURE_FLAGS_CONSTS.BINGO_ONENUMBERRENAME]: 'web-shop-basket-bingo-onenumberrename-enabled',
}
