import { sanitizeJson } from '@shared/helpers/transformUtils/transformUtils'

describe('transformUtils', () => {
  describe('sanitizeJson', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    const method = () => {}
    const symbol = Symbol()
    const array: any[] = []
    const givenObject = {
      1: null,
      2: undefined,
      3: true,
      4: false,
      5: 1,
      6: 0,
      7: 'foo',
      8: '',
      9: symbol,
      10: method,
      11: array,
    }

    it('should remove all nulls, undefineds and JSON-unsafe properties', () => {
      const given = {
        ...givenObject,
        extraObj: { ...givenObject },
      }
      const expected = {
        3: true,
        4: false,
        5: 1,
        6: 0,
        7: 'foo',
        8: '',
        11: array,
        extraObj: {
          3: true,
          4: false,
          5: 1,
          6: 0,
          7: 'foo',
          8: '',
          11: array,
        },
      }
      const actual = sanitizeJson(given) as Record<string, any>
      expect(actual).toEqual(expected)
    })

    it('should return deep object clone', () => {
      const given = {
        array,
        object: { array },
      }
      const expected = {
        array,
        object: {
          array,
        },
      }
      const actual = sanitizeJson(given) as Record<string, any>
      expect(actual).not.toBe(expected)
      expect(actual.object).not.toBe(expected.object)
      expect(actual.array).not.toBe(expected.array)
      expect(actual.object.array).not.toBe(expected.object.array)
    })

    it('should log error and return with input if there is any', () => {
      const mockObj: any = {}
      mockObj.a = { b: mockObj }

      expect(sanitizeJson(mockObj)).toEqual(mockObj)
      expect(console.error).toHaveBeenCalled()
    })
  })
})
