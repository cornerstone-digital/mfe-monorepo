import getWorker from './worker'

describe('getWorker', () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue('mockworker')

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should work', () => {
    expect(getWorker()).toBe('mockworker')
    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })

  it('should return with empty string if Blob is undefined', () => {
    const oldBlob = global.Blob
    global.Blob = undefined as any
    expect(getWorker()).toBe('')
    global.Blob = oldBlob
  })
})
