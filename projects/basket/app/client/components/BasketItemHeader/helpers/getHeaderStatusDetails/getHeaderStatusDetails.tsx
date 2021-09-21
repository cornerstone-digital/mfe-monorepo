import { HeaderStatuses, HeaderStatusType } from '@components/BasketItemHeader/BasketItemHeader.types'
import Icon from '@web-core/components/atoms/Icon'
import Loading from '@web-core/components/atoms/Loading'

const getHeaderStatusDetails = (title?: string, subTitle?: string, headerStatus?: HeaderStatusType, isPackage?: boolean) => {
  const iconSize = isPackage ? 2 : 1
  const loadingSize = isPackage ? 'sm' : 'xs'

  const headerStatuses: HeaderStatuses = {
    present: {
      headerTitle: title,
      headerSubTitle: subTitle,
      headerAction: 'Remove',
      headerIcon: <Icon name="delete" size={iconSize} />,
    },
    removing: {
      headerTitle: `Removing ${title}`,
      headerSubTitle: subTitle,
      headerAction: '',
      headerIcon: <Loading size={loadingSize} />,
    },
    removed: {
      headerTitle: `You removed ${title}`,
      headerSubTitle: subTitle,
      headerAction: 'Undo',
      headerIcon: <Icon name="refresh" size={iconSize} />,
    },
    retrieving: {
      headerTitle: `Retrieving ${title}`,
      headerSubTitle: subTitle,
      headerAction: '',
      headerIcon: <Loading size={loadingSize} />,
    },
  }
  return headerStatus && headerStatuses[headerStatus]
}

export default getHeaderStatusDetails
