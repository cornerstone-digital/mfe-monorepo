const matchesConstCI = (stringConst: string = '', testString?: string): boolean => {
  return testString?.toUpperCase() === stringConst
}

export default matchesConstCI
