const replaceContentParams = (originalText?: string, replacementValues?: Record<string, string>): string => {
  if (!originalText) return ''
  if (!replacementValues) return originalText

  for (let replacement of Object.entries(replacementValues)) {
    const allKeyInstances = new RegExp(replacement[0], 'g')
    originalText = originalText.replace(allKeyInstances, replacement[1])
  }

  return originalText
}

export default replaceContentParams
