import enzyme from 'enzyme'
import toJson from 'enzyme-to-json'

import BasketContentLoader from './BasketContentLoader'

test('it should render', () => {
  const wrapper = enzyme.shallow(<BasketContentLoader />)
  expect(wrapper.length).toEqual(1)
  expect(toJson(wrapper)).toMatchSnapshot()
})
