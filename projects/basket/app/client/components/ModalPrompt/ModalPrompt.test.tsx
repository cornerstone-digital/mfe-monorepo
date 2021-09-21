import { render } from '@testing-library/react'

import ModalPrompt from './ModalPrompt'

const onClickMock = jest.fn()

describe('<ModalPrompt />', () => {
  it(`renders without exploding`, () => {
    render(<ModalPrompt onClick={onClickMock} text="test" />)
  })
})
