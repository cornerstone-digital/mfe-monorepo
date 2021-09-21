import { FC } from 'react'
import Paragraph from '@web-core/components/atoms/Paragraph'

import { SmartWatchDetailsProps } from './SmartWatchDetails.types'
import { useStore } from '@store'
import { observer } from 'mobx-react-lite'

const SmartWatchDetails: FC<SmartWatchDetailsProps> = observer(props => {
  const { phonePaired } = props
  const { basketStore } = useStore()
  const { pageContent } = basketStore

  const connectivityText = pageContent?.vf_Modules?.messages?.content?.connectivity_plan?.bodyText
  const associatedNumberText = pageContent?.vf_Modules?.messages?.content?.number_associated_watch?.bodyText
  const chosenToConnectText = pageContent?.vf_Modules?.messages?.content?.chosen_connect?.bodyText

  return (
    <>
      <Paragraph marginVerticalSm={1}>{connectivityText}</Paragraph>
      {phonePaired && (
        <>
          <Paragraph marginBottomSm={1}>
            {associatedNumberText} <strong>{phonePaired}</strong>
          </Paragraph>
          <Paragraph marginBottomSm={1}>{chosenToConnectText}</Paragraph>
        </>
      )}
    </>
  )
})

export default SmartWatchDetails
