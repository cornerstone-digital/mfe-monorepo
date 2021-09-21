import replaceContentParams from './replaceContentParams'

describe('replaceContentParams', () => {
  test('replaces content params as expected', () => {
    const device = 'iPhone 12'
    const watch = 'Apple watch'
    const originalText = 'Hello this is some text about my {device}. I brought this {device} with a {watch}'
    const convertedText = `Hello this is some text about my ${device}. I brought this ${device} with a ${watch}`
    const cmsReplacementValues = {
      '{device}': device,
      '{watch}': watch,
    }

    expect(replaceContentParams(originalText, cmsReplacementValues)).toEqual(convertedText)
  })

  test('returns empty string if no content is supplied', () => {
    expect(replaceContentParams('', {})).toEqual('')
  })

  test('returns original test if no replacementValue is supplied', () => {
    expect(replaceContentParams('test content')).toEqual('test content')
  })
})
