import CMSMapper from '@web-cms-core/core/organisms/CMSConsumerMegaNav/helpers/CMSMapper'

const cleanHeaderData = (rawData: any) => {
  if (!rawData) return null

  return CMSMapper.formatCMSData(rawData)
}

export default cleanHeaderData
