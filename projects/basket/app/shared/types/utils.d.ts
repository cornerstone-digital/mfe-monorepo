declare type OmitOptionals<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? T[K] : never
}

/**
 * Constructs a type that has all properties recustively set to optional.
 *
 * More on how it works: https://stackoverflow.com/a/51365037/4541800
 *  and here: https://stackoverflow.com/a/63107878/4541800
 */
declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/* Constructs a type that has all methods recusrively omited. */
declare type DeepOmitMethods<T> = {
  [P in keyof T]: T[P] extends Function ? never : T[P] extends object ? DeepOmitMethods<T[P]> : T[P]
}
