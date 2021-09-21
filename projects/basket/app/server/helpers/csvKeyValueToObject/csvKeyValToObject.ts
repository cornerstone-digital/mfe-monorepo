/**
 * csvKeyValToObject
 * Converts a string (i.e. an env var) that has multple csv split key/value(boolean) pairs and converts into an object
 * @param envVar String - Comma separated key/value pairs in the form 'a=true,b=false,c=true'
 * @param separator String - key/value separator
 */
const csvKeyValToObject = (envVar?: string, separator: string = '='): { [key: string]: boolean } => {
  return (
    envVar?.split(',').reduce((acc, curr) => {
      const [flagName, isEnabled] = curr.split(separator)
      const strippedValue = isEnabled?.replace(/\s/g, '')
      // be defensive in case env var string has been poorly set
      if (flagName && (strippedValue === 'true' || strippedValue === 'false')) {
        return {
          ...acc,
          [flagName.replace(/\s/g, '')]: isEnabled.replace(/\s/g, '') === 'true',
        }
      }
      return acc
    }, {}) || {}
  )
}

export default csvKeyValToObject
