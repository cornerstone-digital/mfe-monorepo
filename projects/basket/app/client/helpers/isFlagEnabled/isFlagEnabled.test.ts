import isFlagEnabled from './isFlagEnabled'
import { FlagConfig } from '@shared/types/global'

const flags: FlagConfig[] = [
  { key: 'testfeature1', enabled: true, flags: [] },
  { key: 'testfeature2', enabled: false, flags: [] },
]

describe('isFlagEnabled', () => {
  it('should return true if the flag is enabled', () => {
    expect(isFlagEnabled('testfeature1', {}, { enabled: true, flags })).toBe(true)
  })

  it('should return undefined if the flag is disabled', () => {
    expect(isFlagEnabled('testfeature2', {}, { enabled: true, flags })).toBe(undefined)
  })

  it('should return false if the flag is disabled in the queryMap', () => {
    expect(isFlagEnabled('testfeature1', { testfeature1: 'false' }, { enabled: true, flags })).toBe(false)
  })

  it('should return true if the flag is enabled in the queryMap', () => {
    expect(isFlagEnabled('testfeature2', { testfeature2: 'true' }, { enabled: true, flags })).toBe(true)
  })

  it('should return undefined if feature flags are turned off', () => {
    expect(isFlagEnabled('testfeature2', {}, { enabled: false, flags })).toBe(undefined)
  })
})
