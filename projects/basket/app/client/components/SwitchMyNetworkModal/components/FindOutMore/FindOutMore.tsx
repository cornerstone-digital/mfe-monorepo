import List from '@web-core/components/atoms/List'
import Paragraph from '@web-core/components/atoms/Paragraph'
import BlockContainer from '@web-core/components/molecules/BlockContainer'

const firstStepContent = (
  <>
    Request a PAC or STAC code from your current network, free of charge
    <Paragraph marginTop={2}>Just send a free text to 65075 from the mobile you want to switch</Paragraph>
    <Paragraph>
      For <strong>PAC</strong>: Text PAC to 65075
      <br />
      For <strong>STAC</strong>: Text STAC to 75075
    </Paragraph>
    <Paragraph>Or visit your current network&apos;s website to get the code you need.</Paragraph>
  </>
)

const secondStepContent = (
  <>
    <strong>Once you have your PAC or STAC code, share it with us here.</strong> Choose which day you want to move your number to Vodafone.
    <Paragraph marginTop={2}>PAC and STAC codes last 30 days, so share yours with us as soon as possible.</Paragraph>
  </>
)

const thirdStepContent = (
  <>
    <strong>PAC</strong>: Your current contract will be cancelled and your number transferred to Vodafone on your chosen day.
    <Paragraph marginTop={2}>
      <strong>STAC</strong>: Your current contract will be cancelled on your chosen day. The temporary number we gave you will become your
      new number with Vodafone.
    </Paragraph>
  </>
)

const listItems = [
  { id: '1', content: firstStepContent },
  { id: '2', content: secondStepContent },
  { id: '3', content: thirdStepContent },
]

const FindOutMore = () => {
  return (
    <BlockContainer
      heading={{ text: 'Find out more', size: 6, fontWeight: 'bold' }}
      collapse={{ collapsable: true, collapsed: true, icon: { justify: 'left', appearance: 'dark' } }}
      borderAppearance="none"
      marginVertical={2}
    >
      <List type="ordered" items={listItems} />
    </BlockContainer>
  )
}

export default FindOutMore
