import { render } from '@testing-library/react'

import ItemHighlights from './ItemHighlights'

describe('<ItemHighlights ... />', () => {
  test('renders ItemHighlights', async () => {
    const LIST_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const { container, findAllByText } = render(
      <ItemHighlights items={LIST_ITEMS} bullets>
        <h1>child</h1>
      </ItemHighlights>,
    )
    const items = await findAllByText(/Item [0-9]/)
    const children = await findAllByText(/child/)
    const bullets = container.getElementsByClassName('wrapper success size-1') // get the <Icon> component by fixed classes it uses
    expect(items).toHaveLength(LIST_ITEMS.length)
    expect(children).toHaveLength(1)
    expect(bullets).toHaveLength(LIST_ITEMS.length)
  })

  test('should not render with bullets when the bullets are false', () => {
    const LIST_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const { container } = render(<ItemHighlights items={LIST_ITEMS}></ItemHighlights>)
    const bullets = container.getElementsByClassName('wrapper success size-1')
    expect(bullets).toHaveLength(0)
  })
})
