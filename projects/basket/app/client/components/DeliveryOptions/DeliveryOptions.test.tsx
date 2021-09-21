import DeliveryOptions from './DeliveryOptions'
import { DeliveryOptionsProps } from './DeliveryOptions.types'

const props: DeliveryOptionsProps = {
  hasCollection: true,
  hasPremiumDelivery: true,
  hasStandardDelivery: true,
}

function getColumnInput(extendProps: DeliveryOptionsProps) {
  const wrapper = shallow(<DeliveryOptions {...extendProps} />)
  const column = wrapper.find({ className: 'column' })
  const icon = column.find('Icon').prop('name')
  const title = column.find('Heading').prop('children')
  return { icon, title }
}

describe('<DeliveryOptions />', () => {
  test('renders collection column', () => {
    const { icon, title } = getColumnInput({ hasCollection: true })
    expect(icon).toEqual('store')
    expect(title).toEqual('Click and collect')
  })
  test('renders standard delivery column', () => {
    const { icon, title } = getColumnInput({ hasStandardDelivery: true })
    expect(icon).toEqual('delivery')
    expect(title).toEqual('Standard delivery')
  })
  test('renders premium delivery column', () => {
    const { icon, title } = getColumnInput({ hasPremiumDelivery: true })
    expect(icon).toEqual('express-delivery')
    expect(title).toEqual('Premium delivery')
  })
  test('renders without exploding', () => {
    const wrapper = shallow(<DeliveryOptions {...props} />)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })
})
