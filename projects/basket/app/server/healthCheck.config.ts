// documentation
// https://vfuk-digital.visualstudio.com/Digital/_wiki/wikis/Digital%20X.wiki/1685/Configuration

// baseUrl determined by variable on VSTS
// changes based on release ENV
// e.g on DEV it's point at https://dal.dx-dev.internal.vodafoneaws.co.uk to allow us to hit vHealth
const baseUrl: string | undefined = process.env.LAMBDA_HEALTH_CHECK_SERVICE_URL
const rootUrl: string = '/basket'
export default {
  // where you want to reach health endpoints
  // e.g localhost:8000/web-shop/health
  rootUrl,
  // setup to check environment variables and internal dependencies
  health: {
    environmentVariables: [
      {
        key: 'DALMATIAN_LOGGER_ENABLED',
        checkType: 'string',
      },
      {
        key: 'DALMATIAN_LOGGER_LEVEL',
        checkType: 'string',
      },
      {
        key: 'AWS_GATEWAY_DAL_API_KEY',
        checkType: 'string',
      },
      {
        key: 'AWS_GATEWAY_DAL_URL',
        checkType: 'string',
      },
      {
        key: 'AWS_GATEWAY_HOST_HEADER',
        checkType: 'string',
      },
    ],
    // Functionality of these endpoints and structure needs to be extended. this will be happening 14.3
    // will be extended for 3rd party API's REDIS/ DynamoDB
    localEndpoints: [
      // asset can't use the healthcheckEnv url as it's prefix as it doesn't get hosted on there
    ],
  },
  vHealth: {
    services: [
      {
        // various vhealth services already setup
        category: 'web',
        // custom id for the service you're hitting
        id: 'basket',
        // vhealth endpoint, always use service vhealth
        // if it doesn't exist it will automatically default it to health
        url: `${baseUrl}${rootUrl}/api/basket/actuator/vhealth`,
      },
      // uncommented for now as portabilit hasn't been whitelisted inside api-gtw lambda repo
      // {
      //   category: 'portability',
      //   id: 'portability',
      //   url: `${baseUrl}/portability/actuator/vhealth`
      // }
    ],
  },
}
