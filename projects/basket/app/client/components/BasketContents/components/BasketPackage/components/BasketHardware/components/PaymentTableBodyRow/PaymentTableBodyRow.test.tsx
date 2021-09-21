import { render } from '@testing-library/react'
import PaymentTableBodyRow from './PaymentTableBodyRow'

describe('PaymentTableBodyRow', () => {
  const tbody = document.createElement('tbody')
  const table = document.createElement('table')

  test('should render given props', () => {
    const { getByText } = render(<PaymentTableBodyRow text="test-text" value="test-value" label="test-label" />, {
      container: document.body.appendChild(table.appendChild(tbody)),
    })
    expect(getByText('test-text')).toBeInTheDocument()
    expect(getByText('test-value')).toBeInTheDocument()
    expect(getByText('test-label')).toBeInTheDocument()
  })
})
