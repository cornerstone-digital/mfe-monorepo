import EventBus from './EventBus'

describe('EventBus', () => {
  beforeEach(() => {
    EventBus.removeAllSubscribers()
  })

  it('should be instance of EventBus', () => {
    expect(EventBus.publish).toBeInstanceOf(Function)
    expect(EventBus.subscribe).toBeInstanceOf(Function)
    expect(EventBus.subscriptions).toBeInstanceOf(Object)
  })

  it('should contain an empty subscriptions object when clean', () => {
    expect(Object.keys(EventBus.subscriptions).length).toBe(0)
  })

  describe('subscribe()', () => {
    it('should subscribe the caller to the passed eventType with passed callback', () => {
      const eventType = 'someEvent'
      const callback = jest.fn()

      EventBus.subscribe(eventType, callback)

      const eventTypeSubs = EventBus.subscriptions[eventType]
      expect(eventTypeSubs).toBeInstanceOf(Array)
      expect(eventTypeSubs.length).toBe(1)
      expect(eventTypeSubs.includes(callback)).toBeTruthy()
    })

    it('should add to an events subscriber list if already exists', () => {
      const eventType = 'someEvent'
      const callback = jest.fn()
      const callback2 = jest.fn()
      EventBus.subscribe(eventType, callback)

      const eventTypeSubs = EventBus.subscriptions[eventType]
      expect(eventTypeSubs).toBeInstanceOf(Array)
      expect(eventTypeSubs.length).toBe(1)
      expect(eventTypeSubs.includes(callback)).toBeTruthy()

      EventBus.subscribe(eventType, callback2)
      expect(eventTypeSubs.length).toBe(2)
      expect(eventTypeSubs.includes(callback)).toBeTruthy()
      expect(eventTypeSubs.includes(callback2)).toBeTruthy()
    })

    it('should add a new eventType if not already existing', () => {
      const eventType = 'someEvent'
      const eventType2 = 'someEvent2'
      const callback = jest.fn()
      const callback2 = jest.fn()

      EventBus.subscribe(eventType, callback)
      const eventTypeSubs = EventBus.subscriptions[eventType]
      expect(eventTypeSubs).toBeInstanceOf(Array)
      expect(eventTypeSubs.length).toBe(1)
      expect(eventTypeSubs.includes(callback)).toBeTruthy()

      EventBus.subscribe(eventType2, callback2)
      const eventType2Subs = EventBus.subscriptions[eventType2]
      expect(Object.keys(EventBus.subscriptions).length).toBe(2)
      expect(eventTypeSubs.length).toBe(1)
      expect(eventType2Subs.length).toBe(1)
      expect(eventTypeSubs.includes(callback)).toBeTruthy()
      expect(eventType2Subs.includes(callback2)).toBeTruthy()
    })

    describe('unsubscribe()', () => {
      it('should return an unsubscribe method after subscribing', () => {
        const eventType = 'someEvent'
        const callback = jest.fn()
        const subscriber = EventBus.subscribe(eventType, callback)

        expect(subscriber.unsubscribe).toBeInstanceOf(Function)
      })

      it('should allow for unsubscribing a single listener only', () => {
        const eventType = 'someEvent'
        const callback = jest.fn()
        const callback2 = jest.fn()
        const subscriber = EventBus.subscribe(eventType, callback)
        const subscriber2 = EventBus.subscribe(eventType, callback2)

        const eventTypeSubs = EventBus.subscriptions[eventType]

        expect(eventTypeSubs.length).toBe(2)
        expect(subscriber.unsubscribe).toBeInstanceOf(Function)
        expect(subscriber2.unsubscribe).toBeInstanceOf(Function)
        expect(eventTypeSubs.includes(callback)).toBeTruthy()
        expect(eventTypeSubs.includes(callback2)).toBeTruthy()

        subscriber.unsubscribe()
        const eventSubsAfter = EventBus.subscriptions[eventType]

        expect(EventBus.subscriptions[eventType].length).toBe(1)
        expect(subscriber2.unsubscribe).toBeInstanceOf(Function)
        expect(eventSubsAfter.includes(callback)).toBeFalsy()
        expect(eventSubsAfter.includes(callback2)).toBeTruthy()
      })

      it('shouold all calling the unsubscribe method multiple times without error', () => {
        const eventType = 'someEvent'
        const callback = jest.fn()

        const subscriber = EventBus.subscribe(eventType, callback)
        const unsubSpy = jest.spyOn(subscriber, 'unsubscribe')
        subscriber.unsubscribe()
        subscriber.unsubscribe()
        expect(unsubSpy).toBeCalledTimes(2)
      })
    })
  })

  describe('publish()', () => {
    it('should publish an event to all subscribers', () => {
      const eventType = 'someEvent'
      const eventArgs = { someArg: true }
      const callback = jest.fn()
      const callback2 = jest.fn()
      EventBus.subscribe(eventType, callback)
      EventBus.subscribe(eventType, callback2)

      EventBus.publish(eventType, eventArgs)
      expect(callback).toHaveBeenCalledWith(eventArgs)
      expect(callback).toBeCalledTimes(1)
      expect(callback2).toHaveBeenCalledWith(eventArgs)
      expect(callback2).toHaveBeenCalledTimes(1)
    })

    it('should not publish anything for a non-registered event', () => {
      const existingEvent = 'someEvent'
      const notExistingEvent = 'notExist'
      const eventArgs = { someArg: true }
      const callback = jest.fn()

      EventBus.subscribe(existingEvent, callback)
      EventBus.publish(notExistingEvent, eventArgs)

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })

  describe('removeAllSubscribers()', () => {
    it('should remove all subscribers from an existing event', () => {
      const eventType = 'someEvent'
      const eventArgs = { someArg: true }
      const callback = jest.fn()
      const callback2 = jest.fn()
      EventBus.subscribe(eventType, callback)
      EventBus.subscribe(eventType, callback2)

      const registeredCbs = EventBus.subscriptions[eventType]

      expect(registeredCbs.length).toBe(2)

      EventBus.removeAllSubscribers(eventType)

      const registeredCbsAfter = EventBus.subscriptions[eventType]
      expect(registeredCbsAfter.length).toBe(0)

      EventBus.publish(eventType, eventArgs)

      expect(callback).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(0)
    })
  })
})
