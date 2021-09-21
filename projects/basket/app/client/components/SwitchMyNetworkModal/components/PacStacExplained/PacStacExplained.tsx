import List from '@web-core/components/atoms/List'
import Section from '@web-core/components/atoms/Section'
import Paragraph from '@web-core/components/atoms/Paragraph'
import BlockContainer from '@web-core/components/molecules/BlockContainer'
import Icon from '@web-core/components/atoms/Icon'
import Heading from '@web-core/components/atoms/Heading'

import styles from './PacStacExplained.scss'

const pacListItems = [
  { id: '1', content: 'Cancel your contract with your current network' },
  { id: '2', content: 'Move your current mobile number over to Vodafone' },
  { id: '3', content: 'Example code: ABC123456' },
]

const stacListItems = [
  { id: '4', content: 'Cancel your contract with your current network' },
  { id: '5', content: "Disconnect your current mobile number. You'll get a new number with Vodafone" },
  { id: '6', content: 'Example code: 123456ABC' },
]

const PacStacExplained = (): JSX.Element => {
  return (
    <BlockContainer
      heading={{ text: 'What are PAC and STAC codes?', size: 6, fontWeight: 'bold' }}
      collapse={{ collapsable: true, collapsed: true, icon: { justify: 'left', appearance: 'dark' } }}
      borderAppearance="none"
      marginBottom={2}
    >
      <div className={styles['content']}>
        <Icon name="info-circle" appearance="dark" size={2} />
        <Section paddingLeft={2}>
          <Heading level={3} size={6} fontWeight="bold">
            Use a PAC code to:
          </Heading>
          <List items={pacListItems} />
          <Heading level={3} size={6} fontWeight="bold">
            Use a STAC code to:
          </Heading>
          <List items={stacListItems} />
          <Heading level={3} size={6} fontWeight="bold">
            How do I get my PAC or STAC?
          </Heading>
          <Paragraph>Just send a free text to 65075 from the mobile you want to switch</Paragraph>
          <Paragraph>
            For <strong>PAC</strong>: Text PAC to 65075
            <br />
            For <strong>STAC</strong>: Text STAC to 75075
          </Paragraph>
          <Paragraph>Or visit your current network&apos;s website to get the code you need.</Paragraph>
        </Section>
      </div>
    </BlockContainer>
  )
}

export default PacStacExplained
