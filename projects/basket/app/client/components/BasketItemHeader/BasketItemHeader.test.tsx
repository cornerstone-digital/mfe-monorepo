import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { DataSpeedStatus } from '@pages/BasketPage/BasketPage.types'
import BasketItemHeader from './BasketItemHeader'

import AnalyticsUtil from '@utilities/Analytics'
import { BasketItemHeaderProps } from './BasketItemHeader.types'
import { mockStore } from '@tools/mocks/storeMock'

jest.mock('@utilities/Analytics')

jest.mock('@store', () => ({
  useStore: jest.fn().mockImplementation(() =>
    mockStore({
      basketId: 'some-basket',
    }),
  ),
}))

AnalyticsUtil.trackLink = jest.fn()

const props: BasketItemHeaderProps = {
  title: 'header title',
  onRemove: jest.fn(),
  onUndo: jest.fn(),
  headerStatus: 'present',
  isPackage: true,
  changePackageLink: '',
  packageId: '123',
}

describe('<BasketItemHeader />', () => {
  test('should render title', () => {
    render(<BasketItemHeader {...props} />)
    expect(screen.getByText('header title')).toBeInTheDocument()
  })

  test('should render subtitle', () => {
    render(<BasketItemHeader {...props} subTitle="header subtitle" />)
    expect(screen.getByText('header subtitle')).toBeInTheDocument()
  })

  test('should render change button', () => {
    const { getByText } = render(<BasketItemHeader {...props} changePackageLink="test" showChangeButton />)
    const button = getByText('Change')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('change-button')
  })

  test('should render change button for item in combi package', () => {
    const { getByText } = render(<BasketItemHeader {...props} changePackageLink="test" isPackage={false} showChangeButton />)
    const button = getByText('Change')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('change-button')
  })

  test('should render action button', () => {
    const { getByText } = render(<BasketItemHeader {...props} />)
    expect(getByText('Remove')).toBeInTheDocument()
    expect(getByText('Remove').parentElement?.tagName.toLowerCase()).toBe('button')
  })

  test('should trigger removal on action button when header status is "present"', () => {
    const removeMock = jest.fn()
    const { getByText } = render(<BasketItemHeader {...props} onRemove={removeMock} />)
    getByText('Remove').click()
    expect(removeMock).toHaveBeenCalled()
  })

  test('should render package header with remove button', () => {
    const { asFragment } = render(<BasketItemHeader {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger undo on action button when header status is "removed"', () => {
    const undoMock = jest.fn()
    const { getByText } = render(<BasketItemHeader {...props} onUndo={undoMock} headerStatus="removed" />)
    getByText('Undo').click()
    expect(undoMock).toHaveBeenCalled()
  })

  test('should not show remove button during transition', () => {
    const { getByText, queryByText } = render(<BasketItemHeader {...props} headerStatus="removing" />)
    expect(getByText('Removing header title')).toBeInTheDocument()
    expect(queryByText('remove')).toBeNull()
  })

  test('should render removing with loading icon', () => {
    const { asFragment, getByText } = render(<BasketItemHeader {...props} headerStatus="removing" />)
    expect(getByText('Removing header title')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render with undo button', () => {
    const { asFragment, getByText } = render(<BasketItemHeader {...props} headerStatus="removed" />)
    expect(getByText('You removed header title')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render retrieving with loading icon', () => {
    const { asFragment, getByText } = render(<BasketItemHeader {...props} headerStatus="retrieving" />)
    expect(getByText('Retrieving header title')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render extra header', () => {
    const { asFragment, getByText } = render(<BasketItemHeader {...props} isPackage={false} />)
    expect(getByText('header title')).toBeInTheDocument()
    expect(getByText('Remove')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should update correctly', () => {
    const { asFragment, getByText } = render(<BasketItemHeader {...props} headerStatus="removing" isPackage={false} />)
    expect(getByText('Removing header title')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render package header', () => {
    const oldWindow = global.window
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    })
    const { getByText } = render(<BasketItemHeader {...props} changePackageLink="/basket" showChangeButton />)
    getByText('Change').click()
    expect(AnalyticsUtil.trackLink).toBeCalledWith('basketPage.changePackageCta', {
      itemType: undefined,
      pageError: undefined,
      newBasket: {
        basketId: 'some-basket',
      },
      packageId: '123',
    })
    expect(global.window.location.href).toBe('/basket')

    global.window = oldWindow
  })

  test('should be hidden if transitioning', async () => {
    jest.useFakeTimers()
    const { container, rerender } = render(<BasketItemHeader {...props} />)
    rerender(<BasketItemHeader {...props} headerStatus="removing" />)
    expect(container.querySelector('.vfuk-BasketItemHeader__is-hidden')).toBeInTheDocument()
    act(() => {
      jest.runAllTimers()
    })
    expect(container.querySelector('.vfuk-BasketItemHeader__is-hidden')).toBeNull()
  })

  describe('data speed tests', () => {
    test('should render data speed link', () => {
      props.dataSpeed = {
        key: 'MAX_10_MBPS',
        message: 'Speed: Maximum download of 10 Mbps',
      }
      const { asFragment, getByText } = render(
        <BasketItemHeader
          {...props}
          dataSpeed={{
            key: 'MAX_10_MBPS',
            message: 'Speed: Maximum download of 10 Mbps',
          }}
        />,
      )
      expect(getByText('Speed: Maximum download of 10 Mbps')).toBeInTheDocument()
      expect(getByText('Remove')).toBeInTheDocument()
      expect(asFragment()).toMatchSnapshot()
    })

    describe('when data speed link is clicked', () => {
      test('should render SpeedInfoModal', () => {
        props.dataSpeed = {
          key: 'MAX_10_MBPS',
          message: 'Speed: Maximum download of 10 Mbps',
        }
        const wrapper = shallow(<BasketItemHeader {...props} />)
          .find('DataSpeedButton')
          .dive()
        const dataSpeedButton = wrapper.find('button').at(0)
        dataSpeedButton.find('button').simulate('click')
        expect(wrapper.find('SpeedInfoModal').length).toEqual(1)
      })

      test.each([
        ['MAX_2_MBPS', 'basketPage.dataSpeed2Mbps'],
        ['MAX_10_MBPS', 'basketPage.dataSpeed10Mbps'],
        ['MAX_AVAILABLE', 'basketPage.dataSpeedFastest'],
      ])('should trigger the correct analytics event for different speeds', (speed, expectedAnalyticsEvent) => {
        props.dataSpeed = {
          key: speed as DataSpeedStatus,
          message: 'Speed: Maximum download of Some Mbps',
        }
        const wrapper = shallow(<BasketItemHeader {...props} />)
          .find('DataSpeedButton')
          .dive()
        const dataSpeedButton = wrapper.find('button').at(0)
        dataSpeedButton.find('button').simulate('click')
        expect(AnalyticsUtil.trackLink).toHaveBeenCalledWith(expectedAnalyticsEvent, {
          newBasket: { basketId: 'some-basket' },
          packageId: '123',
        })
      })
    })

    describe('when data speed modal close button is clicked', () => {
      test('should not render SpeedInfoModal', () => {
        props.dataSpeed = {
          key: 'MAX_10_MBPS',
          message: 'Speed: Maximum download of 10 Mbps',
        }
        const wrapper = shallow(<BasketItemHeader {...props} />)
          .find('DataSpeedButton')
          .dive()
        const dataSpeedButton = wrapper.find('button').at(0)
        dataSpeedButton.find('button').simulate('click')
        expect(wrapper.find('SpeedInfoModal').length).toEqual(1)
        const speedinfoModal = wrapper.find('SpeedInfoModal')
        speedinfoModal.prop('onClose')()
        expect(wrapper.find('SpeedInfoModal').length).toEqual(0)
      })
    })
  })
})
