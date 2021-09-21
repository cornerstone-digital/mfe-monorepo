import { FormReducerAction, FormReducerState } from './SwitchMyNetworkForm.types'

export function formReducer(state: FormReducerState, action: FormReducerAction) {
  switch (action.type) {
    case 'code':
      return { ...state, code: action.data, date: '' }
    case 'phone-number':
      return { ...state, phoneNumber: action.data, date: '' }
    case 'date':
      return { ...state, date: action.data }
    default:
      return { code: action.data, phoneNumber: action.data, date: action.data }
  }
}
