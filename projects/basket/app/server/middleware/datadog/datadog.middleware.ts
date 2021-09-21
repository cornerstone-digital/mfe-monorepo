import tracer from 'dd-trace'
import datadogTracer from '@vfuk/middleware-utils-datadog-tracer'

const getEndpoints = () => {
  /* eslint-disable-next-line */
  const { whitelist } = require('../dalmatian/whitelist')
  return whitelist
}

datadogTracer({
  config: {
    enabled: String(process.env.DD_FLAG).toLowerCase() === 'true',
    // enabled: true,
    analytics: true,
  },
  tracer,
  getEndpoints,
})
