import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { BASKET_CONSTS, URL_CONSTS } from '@constants'

import Heading from '@web-core/components/atoms/Heading'
import Paragraph from '@web-core/components/atoms/Paragraph'
import RadioButtonList from '@web-core/components/molecules/RadioButtonList'
import Notification from '@web-core/components/molecules/Notification'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'

import basketService from '@web-shop-core/services/basketService'

import AnalyticsUtil from '@utilities/Analytics'

import ModalPrompt from '@components/ModalPrompt'
import SimPanelModal from '@components/SimPanelModal'

import matchesConstCI from '@helpers/matchesConstCI'

import styles from './SimPanel.scss'

import { SimPanelProps, SelectedSim, ContentTypes } from './SimPanel.types'

const SimPanel = (props: SimPanelProps) => {
  const { simType, selectedSimName, basket, isSimo, pageError, isUpgrade, onChange, updateStatus, packageId, pageContent, reviewMode } =
    props
  const [eSimModalOpen, setESimModalOpen] = useState<boolean>(false)
  const eSimContent = pageContent?.vf_Modules?.basket_esim?.content
  const showEsimOnly = simType === 'ESIMONLY' || isUpgrade
  const eSimTitle = pageContent?.vf_Modules?.basket_esim?.header
  const isESim = matchesConstCI(BASKET_CONSTS.BUNDLE_DISPLAY_NAME_ESIM, selectedSimName)

  const [simTypeChangedRequest, setSimTypeChangedRequest] = useState('')
  const selectedSimType = showEsimOnly || isESim ? 'ESIM' : 'SIM'

  const simBodyContent = eSimContent?.basket_sim_card?.bodyText || undefined

  const radioLabels = eSimContent
    ? {
        simRadioLabel: eSimContent?.basket_sim_card?.acceptCTA,
        esimRadioLabel: eSimContent?.basket_esim_info?.acceptCTA,
      }
    : undefined

  const contentKey = isUpgrade ? ContentTypes.DEVICE_UPGRADE : ContentTypes.DEVICE
  const simoContentKey = isUpgrade ? ContentTypes.SIMO_UPGRADE : ContentTypes.SIMO

  const activeContent = isSimo ? eSimContent?.[simoContentKey] : eSimContent?.[contentKey]

  useEffect(() => {
    if (!reviewMode && simTypeChangedRequest !== '') {
      AnalyticsUtil.pageView('basketPage.updateBasketView', {
        newBasket: basket,
        pageError: pageError,
      })
    }
  }, [simTypeChangedRequest])

  const toggleModal = () => {
    if (!eSimModalOpen && !reviewMode) {
      AnalyticsUtil.trackLink('basketPage.whatIsAneSimCTA', {
        newBasket: basket,
        pageError: pageError,
      })
    }
    setESimModalOpen(!eSimModalOpen)
  }

  const setSimType = async (selectedSim: SelectedSim) => {
    const requestType = selectedSim === SelectedSim.SIM ? 'PHYSICAL' : 'ESIM'
    const requestBody = {
      simPatchType: requestType,
    }

    try {
      await basketService.patchBasket(packageId, requestBody)
      await onChange(false, true)
      setSimTypeChangedRequest(requestType)
    } catch (error) {
      updateStatus('general', error as any)
    }
  }

  const goToSimSwap = () => {
    window.location.href = URL_CONSTS.SIM_SWAP
  }

  const renderNotificationContent = (bodyText?: string, linkText?: string): JSX.Element => {
    const linkClass = isUpgrade ? 'inline-link' : 'link'

    return (
      <>
        {bodyText}
        {Boolean(linkText) && (
          <button className={styles[linkClass]} onClick={isUpgrade ? goToSimSwap : toggleModal}>
            {linkText}
          </button>
        )}
      </>
    )
  }

  const getEsimBodyContent = () => {
    if (!activeContent) return

    const { bodyText, featureLoading } = activeContent
    return renderNotificationContent(bodyText, featureLoading)
  }

  const esimBodyContent = getEsimBodyContent()

  return (
    <>
      <SimPanelModal isOpen={eSimModalOpen} onExit={toggleModal} pageContent={pageContent} />
      <Grid className={styles['no-gutters']}>
        <If condition={!reviewMode}>
          <GridRow noGutters>
            <GridColumn colMd={9}>
              <Heading marginBottom={1} marginTopSm={0} justify="left" level={5} size={5} fontWeight="bold" focusable={false}>
                <Choose>
                  <When condition={showEsimOnly}>eSIM</When>
                  <Otherwise>{eSimTitle}</Otherwise>
                </Choose>
              </Heading>
            </GridColumn>
            <GridColumn className={styles['modal-prompt-md-container']} colMd={3}>
              <ModalPrompt onClick={toggleModal} text="What is an eSIM?" dataSelector="esim-modal-button" />
            </GridColumn>
          </GridRow>
        </If>
        <GridRow noGutters>
          <GridColumn>
            <If condition={!reviewMode && !showEsimOnly}>
              <RadioButtonList
                groupName={uuidv4()}
                stack="horizontal"
                inlineLabels
                items={[
                  {
                    labelText: radioLabels?.simRadioLabel || '',
                    value: SelectedSim.SIM,
                    dataAttributes: { 'data-selector': 'sim' },
                  },
                  {
                    labelText: radioLabels?.esimRadioLabel || '',
                    value: SelectedSim.ESIM,
                    dataAttributes: { 'data-selector': 'esim' },
                  },
                ]}
                checked={selectedSimType}
                onChange={setSimType}
              />
            </If>
          </GridColumn>
        </GridRow>
        <If condition={!reviewMode}>
          <GridRow noGutters>
            <GridColumn className={styles['modal-prompt-sm-container']} marginTop={1}>
              <ModalPrompt onClick={toggleModal} text="What is an eSIM?" dataSelector="esim-modal-button" />
            </GridColumn>
          </GridRow>
        </If>
        <GridRow noGutters>
          <GridColumn marginTop={selectedSimType === 'SIM' ? 2 : 0}>
            <Choose>
              <When condition={selectedSimType === 'SIM'}>{simBodyContent}</When>
              <When condition={selectedSimType === 'ESIM'}>
                <Notification title={activeContent?.header || ''}>
                  <Paragraph marginTop={1} marginBottom={0}>
                    {esimBodyContent}
                  </Paragraph>
                </Notification>
              </When>
            </Choose>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  )
}

export default SimPanel
