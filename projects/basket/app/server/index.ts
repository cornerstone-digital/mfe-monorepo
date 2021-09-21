import '@babel/polyfill'
import MainServer from './server'
import config from './config/global'

import Logger from './utils/logger'

const logger = new Logger('Web-Shop-Basket:Bootstapper', config.logger)

const startServer = async () => {
  logger.info('Attempting to initialise')
  MainServer.bootstrap().startServer()
}

startServer()
