const getSelectorFromTitle = (headerTitle: string): string => {
  return headerTitle
    .replace(/[^0-9a-z ]/gi, '')
    .toLowerCase()
    .split(' ')
    .join('-')
}

export default getSelectorFromTitle
