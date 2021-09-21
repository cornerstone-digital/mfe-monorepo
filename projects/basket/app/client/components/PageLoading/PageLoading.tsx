import Spinner from '@web-core/components/atoms/Loading'

import styles from './PageLoading.scss'

export const PageLoading = () => (
  <div className={styles.wrapper}>
    <Spinner appearance="brand" size="lg" />
  </div>
)

export default PageLoading
