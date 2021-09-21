export default class TransformUtils {
  /**
   * @deprecated Use 'sanitizeJson' exported function directly
   */
  static removeNulls(obj?: any) {
    return sanitizeJson(obj)
  }
}

/**
 * Returns a deep clone of the provided object with all nullish and JSON-unsafe values removed.
 */
export function sanitizeJson<T>(object: T): T {
  try {
    return JSON.parse(
      JSON.stringify(object, (_, value: any) => {
        return value === null ? undefined : value
      }),
    )
  } catch (error) {
    console.error('Failed to remove nulls from object: %o with error: %o', object, error)
    return object
  }
}
