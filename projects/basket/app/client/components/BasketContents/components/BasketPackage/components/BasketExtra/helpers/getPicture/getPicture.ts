import getServiceImage from '../getServiceImage'

const getPicture = (isEngineer: boolean, isFixedLine: boolean, isHBB: boolean, isInsurance: boolean, name?: string) => {
  const picture: { icon?: string; image?: string; iconIsVisible?: boolean } = { iconIsVisible: false }
  if (isEngineer) {
    picture.icon = 'engineer'
  } else if (isFixedLine) {
    picture.icon = 'fixed-line'
  } else if (isHBB) {
    picture.icon = 'mobile-broadband'
  } else if (isInsurance) {
    picture.icon = 'insurance'
    picture.iconIsVisible = true
  } else {
    const image = getServiceImage(name)
    if (image) {
      picture.image = image
    } else {
      picture.icon = 'add-or-plus'
    }
  }
  return picture
}

export default getPicture
