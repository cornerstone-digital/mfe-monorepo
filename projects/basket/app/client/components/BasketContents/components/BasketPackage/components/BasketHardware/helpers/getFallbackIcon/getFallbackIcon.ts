type fallBackIconsType = 'handset' | 'sim card' | 'broadband:ftth' | 'default'

const getFallbackIcon = (productClass?: string) => {
  const fallBackIcons = {
    handset: 'mobile',
    'sim card': 'sim',
    'broadband:ftth': 'broadband-or-wifi',
    default: 'photos',
  }
  const iconToShow = (productClass || 'default').toLowerCase() as fallBackIconsType
  return fallBackIcons[iconToShow] || fallBackIcons['default']
}

export default getFallbackIcon
