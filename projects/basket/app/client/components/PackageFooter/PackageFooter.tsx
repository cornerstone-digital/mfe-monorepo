import { FC, useState, useEffect } from 'react'
import Paragraph from '@web-core/components/atoms/Paragraph'

import getPackageFooterMessages from '@helpers/getPackageFooterMessages'
import { PackageFooterProps } from './PackageFooter.types'

import styles from './PackageFooter.scss'

const PackageFooter: FC<PackageFooterProps> = props => {
  const [messageList, setMessageList] = useState<string[]>()

  useEffect(() => {
    const packages: BasketV2.ModelPackage | BasketV2.ModelPackage[] = Array.isArray(props.package) ? props.package : [props.package]
    const messages = getPackageFooterMessages(packages, props.pageContent)
    setMessageList(Object.values(messages))
  }, [props.pageContent])

  if (!messageList?.length) {
    return <></>
  }

  return (
    <div className={styles.wrapper}>
      {messageList.map((msg, key) => (
        <Paragraph key={key} justify="center" fontSize="xs">
          {msg}
        </Paragraph>
      ))}
    </div>
  )
}

export default PackageFooter
