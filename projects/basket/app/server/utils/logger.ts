/* tslint:disable */
import debug from 'debug'
import { addMinutes, format } from 'date-fns'
import { LoggerheadConfig, LogLevels } from '@cornerstone-digital/loggerhead'

const timestampFormat = 'yyyy-MM-dd HH:mm:ss'

const LogLevelsEnum = {
  OFF: 0,
  FATAL: 1,
  ERROR: 2,
  WARN: 3,
  INFO: 4,
  DEBUG: 5,
  TRACE: 6,
  ALL: 7,
}
class Logger {
  instance: debug.Debugger
  level: LogLevels
  enabled: boolean

  constructor(namespace: string, config: LoggerheadConfig) {
    this.instance = debug(namespace)
    this.instance.enabled = config.enabled
    this.level = config.level
    this.enabled = config.enabled

    return this
  }

  loggingEnabled() {
    return this.enabled
  }

  getLevel() {
    return this.level
  }

  setLevel(level: LogLevels) {
    this.level = level
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  getTimestamp(timeFormat: string) {
    const date = new Date()
    return format(addMinutes(date, date.getTimezoneOffset()), timeFormat)
  }

  trace(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.TRACE) {
      args.unshift('TRACE')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }

  info(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.INFO) {
      args.unshift('INFO')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }

  debug(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.DEBUG) {
      args.unshift('DEBUG')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }

  warn(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.WARN) {
      args.unshift('WARN')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }

  error(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.ERROR) {
      args.unshift('ERROR')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }

  fatal(formatter: any, ...args: any) {
    if (this.loggingEnabled() && this.level >= LogLevelsEnum.FATAL) {
      args.unshift('FATAL')
      args.unshift(this.getTimestamp(timestampFormat))
      this.instance(formatter, ...args)
    }
  }
}

export default Logger
