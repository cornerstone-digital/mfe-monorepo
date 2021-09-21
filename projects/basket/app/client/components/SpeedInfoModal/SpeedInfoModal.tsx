import { FC } from 'react'
import Heading from '@web-core/components/atoms/Heading'
import Modal from '@vfuk/core-modal'
import Paragraph from '@web-core/components/atoms/Paragraph'

import { SpeedInfoModalProps } from './SpeedInfoModal.types'
import { Container, Table, Thd, TdHeading, Thr, Tr, Td } from './SpeedInfoModal.styled'

const SpeedInfoModal: FC<SpeedInfoModalProps> = props => (
  <Modal isOpen srName="Speed Info" onCloseCb={props.onClose} size={3}>
    <Container>
      <Heading level={3} size={3} marginBottom={5} justify="center">
        Details on speed
      </Heading>
      <Heading marginBottom={1} marginTopSm={0} level={4} size={5} fontWeight="bold">
        Mobile speed explained
      </Heading>
      <Paragraph padding={0} marginTop={1} fontSize="sm">
        We offer three Unlimited data plans – each built around how you use mobile data. There are no limitations on the amount of data you
        can use, but there is a limit on the speed at which you can use your data with the Unlimited Lite and Unlimited plans.
      </Paragraph>
      <Heading marginBottom={1} marginTopSm={0} level={4} size={5} fontWeight="bold">
        What do you mean by speed?
      </Heading>
      <Paragraph padding={0} marginTop={1} fontSize="sm">
        Speed refers to how fast your mobile data connection is. We measure it in Mbps (megabits per second) – the higher the Mbps, the
        faster the speed of your data connection on your device, and therefore the faster and smoother you can do things online on your
        device.
      </Paragraph>
      <Paragraph padding={0} marginTop={1} fontSize="sm">
        In practice this impacts how quickly you can send and receive information, like loading Instagram posts, listening to Spotify,
        streaming videos on YouTube, downloading or uploading files or making video calls.
      </Paragraph>
      <Heading marginBottom={1} marginTopSm={0} level={4} size={5} fontWeight="bold">
        How much speed do I need?
      </Heading>
      <Paragraph padding={0} marginTop={1} marginBottom={3} fontSize="sm">
        Not everyone uses their phone in the same way. Our Unlimited data plans are built to match how use your mobile data. Take a look at
        the table below for how we recommend using each plan. Remember that the actual speeds will continually vary depending on many
        factors such as device capabilities, location, network congestion and network coverage.
      </Paragraph>
      <Table>
        <thead>
          <Thr>
            <Thd>Plan type</Thd>
            <Thd>
              Average download<sup>*</sup>
            </Thd>
            <Thd>Streaming quality</Thd>
          </Thr>
        </thead>
        <tbody>
          <Tr color="grey">
            <Td>
              <TdHeading>Unlimited Max</TdHeading>
              <div>Fastest available</div>
              <Paragraph marginTop={1} fontSize="xs">
                Best for super-fast downloads and UHD streaming, plus everything Unlimited can do.
              </Paragraph>
            </Td>
            <Td>Near instant</Td>
            <Td>ULTRA HD</Td>
          </Tr>
          <Tr>
            <Td>
              <TdHeading>Unlimited</TdHeading>
              <div>Up to 10Mbps</div>
              <Paragraph marginTop={1} fontSize="xs">
                Great for watching movies on-the-go, plus everything Lite can do.
              </Paragraph>
            </Td>
            <Td>3 seconds</Td>
            <Td>HD</Td>
          </Tr>
          <Tr color="grey">
            <Td>
              <TdHeading>Unlimited Lite</TdHeading>
              <div>Up to 2 Mbps</div>
              <Paragraph marginTop={1} fontSize="xs">
                Good for browsing, catching up on social media and streaming music.
              </Paragraph>
            </Td>
            <Td>Under 15 seconds</Td>
            <Td>Not recommended - video might be slower to load, buffering may occur</Td>
          </Tr>
          <Tr>
            <Td>
              <sup>*</sup>Examples given are based on downloading a 3min (4MB) song.
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Container>
  </Modal>
)

export default SpeedInfoModal
