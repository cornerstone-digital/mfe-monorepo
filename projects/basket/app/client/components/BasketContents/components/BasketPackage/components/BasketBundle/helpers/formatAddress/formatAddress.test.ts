import formatAddress from './formatAddress'

test('formatAddress returns an empty string when no value passed', () => {
  const address = formatAddress()
  expect(address).toEqual('')
})

test('formatAddress returns corrected formatted address', () => {
  const installationAddress = {
    citySubDivisionName: '',
    country: 'United Kingdom',
    county: '',
    flatNumber: '',
    houseName: '',
    houseNumber: '89',
    locality: '',
    moveTypeCode: '',
    postCode: 'YO30 5TB',
    streetName: 'EASTHOLME DRIVE',
    town: 'YORK',
  }
  const address = formatAddress(installationAddress)
  expect(address).toEqual('89 Eastholme Drive, York, YO30 5TB')
})

test('formatAddress handles incomplete data without erroring', () => {
  const installationAddress = {
    citySubDivisionName: '',
    country: 'United Kingdom',
    county: '',
    flatNumber: '',
    houseName: '',
    houseNumber: '',
    locality: '',
    moveTypeCode: '',
    postCode: 'YO30 5TB',
    streetName: 'EASTHOLME DRIVE',
    town: 'YORK',
  }
  const address = formatAddress(installationAddress)
  expect(address).toEqual('Eastholme Drive, York, YO30 5TB')
})
