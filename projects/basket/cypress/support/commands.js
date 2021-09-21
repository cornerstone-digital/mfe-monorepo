/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

const BASE_URL = Cypress.config().baseUrl
// Removes http(s) from the start of the URL
const BASE_DOMAIN = BASE_URL.replace(/(^\w+:|^)\/\//, '')

const DEFAULT_BASKET_ID = '64cdef57-3ef7-4801-9faf-dd730f3edeeb'
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

addMatchImageSnapshotCommand({
  failureThreshold: 0.3,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.0 },
  // capture: 'viewport',
})

Cypress.Commands.add('setResolution', size => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1])
  } else {
    cy.viewport(size)
  }
})

Cypress.Commands.add('acceptCookies', () => {
  cy.setCookie('OptanonAlertBoxClosed', '2019-11-12T11:07:02.301Z', { domain: BASE_DOMAIN })
  cy.setCookie(
    'OptanonConsent',
    'isIABGlobal=false&datestamp=Tue+Nov+12+2019+11%3A07%3A02+GMT%2B0000+(Greenwich+Mean+Time)&version=5.5.0&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C104%3A1%2C3%3A1%2C105%3A1%2C4%3A1%2C107%3A1%2C108%3A1%2C109%3A1%2C111%3A1%2C112%3A1%2C113%3A1%2C114%3A1%2C115%3A1%2C117%3A1%2C118%3A1%2C120%3A1%2C122%3A1%2C123%3A1%2C124%3A1%2C125%3A1%2C128%3A1%2C129%3A1%2C133%3A1%2C134%3A1%2C101%3A1%2C135%3A1%2C0_213482%3A1%2C0_213391%3A1%2C0_209031%3A1%2C0_209027%3A1%2C0_212999%3A1%2C0_209023%3A1%2C0_212892%3A1%2C0_213057%3A1%2C0_213524%3A1%2C0_213049%3A1%2C0_214329%3A1%2C0_213078%3A1%2C0_213390%3A1%2C0_216867%3A1%2C0_209030%3A1%2C0_213481%3A1%2C0_209026%3A1%2C0_209022%3A1%2C0_213019%3A1%2C0_212883%3A1%2C0_213523%3A1%2C0_213389%3A1%2C0_216866%3A1%2C0_213059%3A1%2C0_213001%3A1%2C0_209029%3A1%2C0_209025%3A1%2C0_213018%3A1%2C0_209021%3A1%2C0_213522%3A1%2C0_213080%3A1%2C0_213483%3A1%2C0_213392%3A1%2C0_209032%3A1%2C0_213058%3A1%2C0_213000%3A1%2C0_209028%3A1%2C0_214330%3A1%2C0_209024%3A1%2C0_213079%3A1%2C8%3A1%2C116%3A1%2C121%3A1%2C138%3A1&AwaitingReconsent=false',
    { domain: BASE_DOMAIN },
  )
})

const url = Cypress.env('TAGS') === '@smoke' ? '/basket' : `/basket?basketId=${DEFAULT_BASKET_ID}`

const basketApiUrl = `${BASE_URL}/basket/api/basket/v2/basket/*`
const authSessionApiUrl = `${BASE_URL}/basket/auth/session`
const assetModuleApiUrl = `${BASE_URL}/basket/api/digital/v1/content/asset?assetType=Module_C&assetName=`
const assetPageApiUrl = `${BASE_URL}/basket/api/digital/v1/content/asset?assetName=basket&assetType=Page`

const fixtureUrls = {
  meganav: assetModuleApiUrl + 'consumer_meganav',
  footer: assetModuleApiUrl + 'consumer_footer',
  businessMeganav: assetModuleApiUrl + 'business_meganav',
  businessFooter: assetModuleApiUrl + 'business_footer',
}

Cypress.Commands.add('setAuthSessionScenario', (fileName = '_default/auth/session') => {
  cy.intercept('GET', authSessionApiUrl, { fixture: fileName }).as('authSessionRequest')
})

Cypress.Commands.add('setAssetsScenario', (name = '_default/assets') => {
  cy.intercept('GET', fixtureUrls.meganav, { fixture: `${name}/consumer_meganav` }).as('meganavAssetRequest')
  cy.intercept('GET', fixtureUrls.footer, { fixture: `${name}/consumer_footer` }).as('footerAssetRequest')
  cy.intercept('GET', fixtureUrls.businessMeganav, { fixture: `${name}/business_meganav` }).as('meganavAssetRequest')
  cy.intercept('GET', fixtureUrls.businessFooter, { fixture: `${name}/business_footer` }).as('footerAssetRequest')
  cy.intercept('GET', assetPageApiUrl, { fixture: `${name}/basket` }).as('basketAssetRequest')
})

Cypress.Commands.add('setValidateMock', (fixture = '', statusCode = 200) => {
  if (fixture) {
    cy.intercept('POST', basketApiUrl + '/validate', {
      statusCode,
      fixture: `basket/${fixture}/validate`,
    }).as('validateRequest')
    return
  }
  cy.intercept('POST', '**/validate', { statusCode, body: {} }).as('validateRequest')
})

Cypress.Commands.add('setScenarioMock', (filePath, requestType = 'GET', urlPattern = basketApiUrl, statusCode = 200) => {
  cy.intercept(requestType.toUpperCase(), urlPattern, {
    fixture: `basket/${filePath}/${requestType.toLowerCase()}`,
    statusCode,
  })
})

Cypress.Commands.add('setScenarioMocks', (name, loadDefaultPage = false, aliasPrefix = '') => {
  cy.setAuthSessionScenario()
  cy.setAssetsScenario()

  cy.intercept('GET', basketApiUrl, { fixture: `basket/${name}/get` }).as(aliasPrefix || 'basketRequest')

  if (loadDefaultPage) {
    cy.loadPage()
  }
})

Cypress.Commands.add('loadPage', (params = { pageUrl: url, urlParams: '' }) => {
  cy.visit((params?.pageUrl || url) + (params?.urlParams || ''))
  cy.acceptCookies()
})

Cypress.Commands.add('screenshotPage', testTitle => {
  if (!testTitle) {
    testTitle = `${this.test.parent.title} - ${this.test.title}`
  }

  cy.eyesOpen({
    appName: 'Basket',
    testName: testTitle,
  })

  cy.eyesCheckWindow({
    tag: 'Basket Page',
    target: 'region',
    selector: {
      type: 'css',
      selector: '#content',
    },
    fully: true,
  })

  cy.eyesClose()
})

Cypress.Commands.add('setPortabilityMock', () => {
  cy.intercept('GET', '**/portability/authcode/validate*', { fixture: 'basket/network-switch/default/validate' }).as(
    'portabilityValidateRequest',
  )
  cy.intercept('POST', '**/portability', { fixture: 'basket/network-switch/default/portability' }).as('portabilityPostRequest')
})

Cypress.on('uncaught:exception', err => {
  if (err.message.includes('KAMPYLE_ONSITE_SDK')) {
    return false
  }
})
