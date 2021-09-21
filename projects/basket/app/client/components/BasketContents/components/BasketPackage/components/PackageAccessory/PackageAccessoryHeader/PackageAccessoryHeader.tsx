import Heading from '@web-core/components/atoms/Heading'

import styles from './PackageAccessoryHeader.scss'

const PackageAccessoryHeader = () => {
  return (
    <div className={styles['package-header']}>
      <Heading level={5} size={6} margin={0} fontWeight="bold" appearance="inherit">
        Accessories
      </Heading>
    </div>
  )
}

export default PackageAccessoryHeader
