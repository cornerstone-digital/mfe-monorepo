// @ts-nocheck
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import toJson from 'enzyme-to-json'
import { configureMobx } from '../../app/client/store/configureMobx'

import '@testing-library/jest-dom'

Enzyme.configure({ adapter: new Adapter() })

configureMobx({
  enforceActions: 'never',
  computedRequiresReaction: false,
  safeDescriptors: false,
})

global.shallow = Enzyme.shallow
global.snapshot = toJson

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
})

// Location
// Mock for window.location.assign so we can 'navigate'
// within tests without JSDOM 'Not implemented' errors
global.location = {
  assign: jest.fn(),
}

// mock web worker
global.Worker = class {
  postMessage() {}

  addEventListener() {}
}

// URL
global.URL = {
  createObjectURL: jest.fn(),
}

// console.error = jest.fn(msg => {
//   throw new Error(msg)
// })

global.WEBPACK_ASSET_PREFIX = ''
global.CORE_WS2_ASSETS = ''
global.CORE_FONT_PREFIX = ''
global.CORE_WS10_ASSETS = ''

global.VFUK = {
  env: {
    ASSET_URL: 'http://mock-localhost',
  },
  basketData: {
    financialInfo: [],
  },
}
