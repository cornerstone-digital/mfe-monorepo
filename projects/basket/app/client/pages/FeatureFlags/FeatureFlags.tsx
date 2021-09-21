import { useEffect, useState } from 'react'
import axios from 'axios'

// Web Core
import HeadTags from '@web-core/components/utilities/HeadTags'
import Container from '@web-core/components/atoms/Container'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import Banner from '@web-core/components/organisms/Banner'
import Heading from '@web-core/components/atoms/Heading'
import Toggle from '@web-core/components/molecules/Toggle'

import { getFeatureFlags, saveFeatureFlagsToLocalStorage } from '@helpers/getFeatureFlags'
import { FeatureFlagConfig } from '@shared/types/global'

const FeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagConfig>({ enabled: false, flags: [] })
  const { enabled: globalEnabled, flags } = featureFlags || {}

  useEffect(() => {
    saveFeatureFlagsToLocalStorage(featureFlags)
  }, [featureFlags])

  const fetchFlags = async () => {
    const flagData = await axios.get('/basket/flags')
    setFeatureFlags(getFeatureFlags(flagData.data))
  }

  useEffect(() => {
    fetchFlags()
  }, [])

  const toggleFlag = (key: any) => {
    let updatedFlags = { ...featureFlags }
    updatedFlags.flags.forEach(flag => {
      if (flag.key === key) {
        flag.enabled = !flag.enabled
      }
    })

    setFeatureFlags(updatedFlags)
  }

  const toggleGlobalFlag = () => {
    setFeatureFlags({ ...featureFlags, enabled: (featureFlags.enabled = !featureFlags.enabled) })
  }

  return (
    <>
      <HeadTags
        title={`Basket feature flags | Vodafone`}
        description="Your shopping basket. Here you can review the items in your basket, continue to the checkout, modify the contents of your basket or continue shopping."
      />

      <Banner
        imageContrast="dark"
        backgroundImgSrc={`/basket/assets/banner.jpg`}
        size="sm"
        align="center"
        appearance="dark1"
        gutters="none"
      >
        <Heading level={1} size={1} justify="center" appearance="light" marginBottom={0}>
          Basket feature flags
        </Heading>
      </Banner>

      <Container gutters="none">
        <Grid>
          <GridRow justify="center">
            <>
              <GridColumn col={8} colMd={4}>
                <h4>Feature flags enabled</h4>
              </GridColumn>
              <GridColumn col={4} colMd={2}>
                <Toggle checked={globalEnabled} onChange={() => toggleGlobalFlag()} />
              </GridColumn>
            </>
          </GridRow>

          {flags.map(flag => (
            <GridRow justify="center" key={flag.key}>
              <GridColumn col={8} colMd={4}>
                <h5>{flag.key}</h5>
              </GridColumn>
              <GridColumn col={4} colMd={2}>
                <Toggle checked={flag.enabled} onChange={() => toggleFlag(flag.key)} />
              </GridColumn>
            </GridRow>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default FeatureFlags
