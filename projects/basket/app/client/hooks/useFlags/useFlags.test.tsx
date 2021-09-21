import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import axios from 'axios'
import * as storeHooks from '@store'

import useFlags from './useFlags'

jest.mock('@store', () => ({
  useStore: jest.fn().mockReturnValue({ basketStore: {} }),
}))

jest.mock('axios', () => ({
  get: jest.fn().mockRejectedValue('Uh-oh!'),
}))

describe('useFlags', () => {
  it('should console error the rejected message if fetching fails', async () => {
    const spyFn = jest.spyOn(console, 'error').mockImplementation()
    renderHook(() => useFlags())
    await waitFor(() => {
      expect(spyFn).toBeCalledWith('Uh-oh!')
    })
    spyFn.mockRestore()
  })

  it('should set flags if fetching was successful', async () => {
    const spyFn = jest.spyOn(console, 'error')
    const spySetFlags = jest.fn()
    const mockFlags = { flag1: 'true', flag2: 'false' }

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { flags: mockFlags } })
    jest.spyOn(storeHooks, 'useStore').mockReturnValueOnce({ basketStore: { setFlagData: spySetFlags } } as any)

    renderHook(() => useFlags())
    await waitFor(() => {
      expect(spyFn).not.toBeCalled()
      expect(spySetFlags).toBeCalledWith({ flags: mockFlags })
    })
  })
})
