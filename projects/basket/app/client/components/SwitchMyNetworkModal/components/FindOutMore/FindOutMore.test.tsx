import FindOutMore from './FindOutMore'

describe('<FindOutMore />', () => {
  test('should render', () => {
    const wrapper = shallow(<FindOutMore />)
    expect(wrapper.length).toEqual(1)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })
})
