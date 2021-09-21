import { render } from '@testing-library/react'
import PackageAccessoryHeader from './PackageAccessoryHeader'

describe('PackageAccessoryHeader', () => {
  it('should render for basic scenario', () => {
    const { getByText, queryByText, asFragment, getByRole } = render(<PackageAccessoryHeader />)

    expect(getByRole('heading').textContent).toBe('Accessories')
    expect(getByText('Accessories')).toBeInTheDocument()
    expect(queryByText('Remove')).not.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
