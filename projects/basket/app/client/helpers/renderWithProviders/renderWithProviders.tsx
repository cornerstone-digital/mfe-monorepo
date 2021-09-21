import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@vfuk/core-theme-ws2'
import { OverlayProvider } from '@vfuk/core-overlay-controller'

const renderWithProviders = (Component: React.ReactElement) => {
  const wrapper = document.createElement('div')
  wrapper.id = 'GlobalStylesProvider'
  return render(
    <ThemeProvider theme={theme}>
      <OverlayProvider>{Component}</OverlayProvider>
    </ThemeProvider>,
    { container: document.body.appendChild(wrapper) },
  )
}

export default renderWithProviders
