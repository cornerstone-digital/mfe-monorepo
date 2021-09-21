import { screen } from '@testing-library/react'

import renderWithProviders from '@helpers/renderWithProviders'

import BasketIncludedItems from './BasketIncludedItems'

const hardwares: BasketV2.Hardware[] = [
  {
    displayName: 'Hardware 2',
    displayOrder: 2,
    merchandisingMedia: [
      {
        id: 'imageURLs.thumbs.front',
        value: '/hardware-image-2.jpg',
        type: 'URL',
        footNotes: [],
      },
    ],
  },
  {
    displayName: 'Hardware 1',
    displayOrder: 1,
    merchandisingMedia: [
      {
        id: 'imageURLs.thumbs.front',
        value: '/hardware-image-1.jpg',
        type: 'URL',
        footNotes: [],
      },
    ],
  },
]

describe('BasketIncludedItems', () => {
  it('has additional hardware highlights list when only one hardware', async () => {
    renderWithProviders(<BasketIncludedItems hardwares={[hardwares[0]]} title="Test title" />)
    const items = await screen.findAllByText('Hardware 2')
    expect(items).toHaveLength(2)
  })

  it('has additional hardware description when only one hardware and footer is supplied', () => {
    const { container, getAllByText } = renderWithProviders(
      <BasketIncludedItems hardwares={[hardwares[0]]} title="Test title" footer={'Test footer'} />,
    )
    expect(getAllByText('Test footer')).toHaveLength(2)
    expect(container.querySelector('[data-selector="bullets"] p')).toBeInTheDocument()
  })

  it('has no additional hardware description when only one hardware and footer is not supplied', () => {
    const { container } = renderWithProviders(<BasketIncludedItems hardwares={[hardwares[0]]} title="Test title" />)
    expect(container.querySelector('[data-selector="bullets"] p')).not.toBeInTheDocument()
  })

  it('has title, images, list and footer', () => {
    renderWithProviders(<BasketIncludedItems hardwares={hardwares} title="Test title" footer="Test footer" />)
    expect(screen.getByRole('heading', { name: 'Test title' })).toBeInTheDocument()
    expect(screen.getByText('Test footer')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('has images and list items in order', () => {
    renderWithProviders(<BasketIncludedItems hardwares={hardwares} title="Test title" />)
    const images = screen.getAllByRole('img')
    const listItems = screen.getAllByRole('listitem')
    expect(listItems[0]).toHaveTextContent('Hardware 1')
    expect(listItems[1]).toHaveTextContent('Hardware 2')
    expect(images[0]).toHaveAttribute('src', 'http://mock-localhost/hardware-image-1.jpg')
    expect(images[1]).toHaveAttribute('src', 'http://mock-localhost/hardware-image-2.jpg')
  })
})
