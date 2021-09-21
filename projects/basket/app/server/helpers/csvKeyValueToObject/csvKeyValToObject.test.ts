import csvKeyValToObject from './csvKeyValToObject'

describe('csvKeyValToObject', () => {
  it('should map csv to object', () => {
    expect(csvKeyValToObject('test1=true,test2=false')).toEqual({ test2: false, test1: true })
  })

  it('should return with empty object by default', () => {
    expect(csvKeyValToObject('')).toEqual({})
  })

  it('should ignore if value is not true or false', () => {
    expect(csvKeyValToObject('test1=true,test2=something')).toEqual({ test1: true })
  })
})
