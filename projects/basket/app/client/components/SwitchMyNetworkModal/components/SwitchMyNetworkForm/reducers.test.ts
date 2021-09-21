import { formReducer } from './reducers'
import { FormReducerState } from './SwitchMyNetworkForm.types'

const initialState: FormReducerState = {
  code: 'defaultCode',
  date: 'defaultDate',
  phoneNumber: 'defaultPhoneNumber',
}

describe('formReducer', () => {
  test.each`
    type              | data               | field
    ${'code'}         | ${'dummycode'}     | ${'code'}
    ${'date'}         | ${'2021-05-11'}    | ${'date'}
    ${'phone-number'} | ${'0719484768912'} | ${'phoneNumber'}
  `('should set $field of state with $data', ({ type, data, field }) => {
    const computedState: FormReducerState = formReducer(initialState, { type, data })
    expect(computedState).toEqual(expect.objectContaining({ [field]: data }))
  })

  test('should set each values if no valid type given', () => {
    const computedState: FormReducerState = formReducer(initialState, { type: 'reset', data: '' })
    expect(computedState).toEqual({
      code: '',
      date: '',
      phoneNumber: '',
    })
  })
})
