import BlockContainer from '@web-core/components/molecules/BlockContainer'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'

import styles from './CompatibleDeviceDropdown.scss'
import { CompatibleDeviceDropdownProps } from './CompatibleDeviceDropdown.types'

const CompatibleDeviceDropdown = (props: CompatibleDeviceDropdownProps) => {
  const { content } = props
  const { header: compatibilityHeader, content: compatibleDeviceContent } = content || {}

  if (!compatibleDeviceContent) return <></>
  const deviceKeys = Object.keys(compatibleDeviceContent) as Array<keyof BasketPageContent.PopularEsimDevicesContent>

  return (
    <BlockContainer
      heading={{
        text: compatibilityHeader,
        size: 5,
        appearance: 'separator',
      }}
      collapse={{
        collapsable: true,
        collapsed: false,
      }}
    >
      <Grid>
        <GridRow noGutters>
          {deviceKeys.map(deviceKey => {
            const deviceHeader = compatibleDeviceContent?.[deviceKey]?.mainTitle
            const deviceList = compatibleDeviceContent?.[deviceKey]?.subLinks

            return (
              <GridColumn key={deviceKey} col={12} colMd={4} marginTop={1} marginBottom={1}>
                <ul className={styles['device-list']}>
                  <li className={styles['list-header']}>{deviceHeader}</li>
                  {deviceList && deviceList.map(device => <li key={device}>{device}</li>)}
                </ul>
              </GridColumn>
            )
          })}
        </GridRow>
      </Grid>
    </BlockContainer>
  )
}

export default CompatibleDeviceDropdown
