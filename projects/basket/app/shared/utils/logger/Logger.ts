import Loggerhead, { LogLevels } from '@cornerstone-digital/loggerhead'

const logger: Loggerhead = new Loggerhead({
  namespace: 'web-shop-basket',
  masking: {
    enabled: false,
    rules: [],
  },
  enabled: process.env.DALMATIAN_LOGGER_ENABLED === 'true',
  level: Number(process.env.DALMATIAN_LOGGER_LEVEL || 7) as LogLevels,
})

export default logger
