import PacStacExplained from './PacStacExplained'

describe('<PacStacExplained />', () => {
  test('should render', () => {
    const wrapper = shallow(<PacStacExplained />)
    expect(wrapper.length).toEqual(1)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })
})
