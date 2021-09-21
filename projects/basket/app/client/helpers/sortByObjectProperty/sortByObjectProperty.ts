const sortByObjectProperty = <T extends object>(property: keyof T, a: T, b: T): number => {
  if (a[property] > b[property]) {
    return 1
  }
  if (b[property] > a[property]) {
    return -1
  }

  return 0
}

export default sortByObjectProperty
