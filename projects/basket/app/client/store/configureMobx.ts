import { configure } from 'mobx'

type Options = Parameters<typeof configure>[0]

export function configureMobx(overrrideOptions?: Options) {
  // Info about options and possible values: https://mobx.js.org/configuration.html
  const options: Options = {
    enforceActions: 'always', // Require state to always be changed through actions (including it's creation).

    // Require computed values to be only accessed from an action or reaction.
    computedRequiresReaction: true,

    // Warn when observables are accessed without a "MobX context" - reports missing observer HOC wrappers
    observableRequiresReaction: false,

    // Warn when a reaction (e.g. observer HOC) is used without accessing any observables.
    reactionRequiresObservable: true,

    // Enable MobX error handling/recovery. Exceptions won't be propagated to our try/catch.
    disableErrorBoundaries: false,

    safeDescriptors: true,

    ...overrrideOptions,
  }

  configure(options)
}
