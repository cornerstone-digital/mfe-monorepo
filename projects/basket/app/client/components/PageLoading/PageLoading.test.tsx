import { render } from '@testing-library/react'
import PageLoading from './PageLoading'

describe('<PageLoading />', () => {
  test('should render properly', () => {
    const { asFragment } = render(<PageLoading />)
    expect(asFragment()).toMatchSnapshot()
  })
})
