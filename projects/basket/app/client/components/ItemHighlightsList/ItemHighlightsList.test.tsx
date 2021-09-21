import { render } from '@testing-library/react'

import ItemHighlightsList from './ItemHighlightsList'

describe('<ItemHighlightsList ... />', () => {
  test('displays a list of strings without bullets', async () => {
    const LIST_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const { findAllByText, queryAllByRole } = render(<ItemHighlightsList items={LIST_ITEMS} />)

    const items = await findAllByText(/Item [0-9]/)
    const bullets = await queryAllByRole('img')

    expect(items).toHaveLength(LIST_ITEMS.length)
    expect(bullets).toHaveLength(0)
  })

  test('displays a list of strings with bullets', async () => {
    const LIST_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const { findAllByText, queryAllByRole } = render(<ItemHighlightsList items={LIST_ITEMS} bulletElement={<img alt="test" />} />)

    const items = await findAllByText(/Item [0-9]/)
    const bullets = await queryAllByRole('img')

    expect(items).toHaveLength(LIST_ITEMS.length)
    expect(bullets).toHaveLength(LIST_ITEMS.length)
  })

  test('displays a list of html elements', async () => {
    const LIST_ITEMS = [<h1 key="1">Item 1</h1>, <h1 key="2">Item 2</h1>]
    const { findAllByRole } = render(<ItemHighlightsList items={LIST_ITEMS} />)
    const items = await findAllByRole('heading')
    expect(items).toHaveLength(LIST_ITEMS.length)
  })
})
