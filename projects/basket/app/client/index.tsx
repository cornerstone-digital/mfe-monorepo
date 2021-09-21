import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'

import GlobalStylesProvider from '@web-core/components/utilities/GlobalStylesProvider'
import { getValue } from '@web-shop-core/helpers/envVars'
import authService from '@web-shop-core/services/authService'
import { createRootStore, StoreProvider } from '@store'
import routes from './routes'

import { datadogRum } from '@datadog/browser-rum'

if (typeof window !== 'undefined') {
  authService.session()
}

if (module.hot) {
  module.hot.accept()
}

const root: HTMLElement | null = document.getElementById('root')
const store = createRootStore()
const App = () => {
  useEffect(() => {
    if (getValue('ENABLE_DATADOG_RUM') === 'true') {
      datadogRum.init({
        applicationId: '99123130-43a7-46da-868e-afbaf1e3da5c',
        clientToken: 'pubcdd1ef125178972d7551d172c8ccdfe6',
        site: 'datadoghq.com',
        service: 'web-shop-basket',
        env: getValue('DALMATIAN_ENVIRONMENT'),
        sampleRate: 100,
        trackInteractions: true,
      })
    }
  }, [])
  return (
    <StoreProvider store={store}>
      <GlobalStylesProvider>
        <Router>{renderRoutes(routes, { skipLink: 'content' })}</Router>
      </GlobalStylesProvider>
    </StoreProvider>
  )
}

ReactDOM.render(<App />, root)
