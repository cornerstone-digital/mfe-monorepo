class EventBus {
  private static instance: EventBus

  public subscriptions: { [key: string]: ((...args: any[]) => void)[] } = {}

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus()
    }

    return this.instance
  }

  public subscribe(eventType: string, callback: (...args: any[]) => void): { unsubscribe: () => void } {
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = []
    this.subscriptions[eventType].push(callback)

    return {
      unsubscribe: () => {
        this.unsubscribe(eventType, callback)
      },
    }
  }

  public unsubscribe(eventType: string, callback: (...args: any[]) => void): void {
    const eventBus = EventBus.getInstance()
    const subscriptions = eventBus.subscriptions[eventType]

    if (subscriptions?.length && subscriptions?.indexOf(callback) > -1) {
      subscriptions.splice(subscriptions?.indexOf(callback), 1)
    }

    if (eventBus.subscriptions[eventType]?.length === 0) {
      delete eventBus.subscriptions[eventType]
    }
  }

  public publish(eventType: string, arg: any) {
    if (!this.subscriptions[eventType]) return

    this.subscriptions[eventType].forEach(subscriberCb => subscriberCb(arg))
  }

  public removeAllSubscribers(eventType?: string) {
    if (eventType) {
      this.subscriptions[eventType] = []
    }

    Object.keys(this.subscriptions).forEach(key => {
      this.subscriptions[key] = []
    })
  }
}

export default EventBus.getInstance()
