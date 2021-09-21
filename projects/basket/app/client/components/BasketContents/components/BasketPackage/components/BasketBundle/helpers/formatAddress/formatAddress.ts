const formatAddress = (installationAddress?: BasketV2.InstallationAddress): string => {
  if (!installationAddress) return ''

  const { flatNumber, houseName, houseNumber, streetName, town, postCode = '' } = installationAddress

  return [flatNumber, houseName, houseNumber, `${streetName}, ${town}, `]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase())
    .concat(postCode.toUpperCase())
}

export default formatAddress
