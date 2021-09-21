import { FC, useEffect, useReducer, useState } from 'react'

import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import { ThemedButton, default as Button } from '@web-core/components/atoms/Button'
import Paragraph from '@web-core/components/atoms/Paragraph'
import RadioButtonList from '@web-core/components/molecules/RadioButtonList'
import SelectInput from '@web-core/components/molecules/SelectInput'
import TextInput from '@web-core/components/molecules/TextInput'
import Notification from '@web-core/components/molecules/Notification'

import AnalyticsUtil from '@utilities/Analytics'

import pacStacService from '@components/SwitchMyNetworkModal/services/pacStacService'

import { CodeType, FormReducerState, SwitchMyNetworkFormProps } from './SwitchMyNetworkForm.types'

import { formReducer } from './reducers'

import styles from './SwitchMyNetworkForm.scss'

const SwitchMyNetworkForm: FC<SwitchMyNetworkFormProps> = props => {
  const initialFormState: FormReducerState = {
    code: props.portability?.code || '',
    phoneNumber: props.portability?.msisdn || '',
    date: props.portability?.validPortDate || '',
  }

  const [formState, dispatch] = useReducer(formReducer, initialFormState)
  const { code, date, phoneNumber } = formState

  const [codeType, setCodeType] = useState(props.portability?.codeType || 'PAC')
  const [portability, setPortability] = useState<Partial<BasketV2.Portability>>({})

  const [resetInputValidation, setResetInputValidation] = useState(true)
  const [validPortDates, setValidPortDates] = useState<string[]>([])
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const isFilledOut = !!props.portability?.status
  const selectOptions = resetInputValidation ? [] : validPortDates.map(item => ({ title: item, value: item }))
  const validationButtonAppearance = isValid ? { icon: 'tick', state: 'success' } : {}
  const codePlaceholder = codeType === 'STAC' ? 'E.g 123ABCDEF' : 'E.g ABC123456'

  let validationAppearance = {}
  if (!resetInputValidation) {
    if (isValid) {
      validationAppearance = { appearance: 'success' }
    }
    if (errorMessage) {
      validationAppearance = { appearance: 'error' }
    }
  }

  useEffect(() => {
    if (props.portability?.code) {
      handleValidate(true)
    }
  }, [])

  const getPageError = (e: any) => {
    const errorStatus = e?.status?.toString()
    const errorMsg = e?.data?.errorMessage?.toLowerCase()
    return errorStatus || errorMsg ? `${errorStatus} ${errorMsg}` : ''
  }

  const handleRadioButtonChange = (value: CodeType) => {
    setCodeType(value)
  }

  const handleFormState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch({ type: id, data: value })
    if (['code', 'phone-number'].includes(id)) {
      setResetInputValidation(true)
    }
  }

  const handleValidate = async (isReturningToChangeDate: boolean) => {
    setIsValidating(true)
    let formIsValid = false
    let formErrorMessage = ''

    try {
      const data = await pacStacService.validate(code, phoneNumber)
      if (data[0].validPortDates) {
        setValidPortDates(data[0].validPortDates)
      }
      if (data[0]) {
        setPortability({ ...data[0] })
      }
      formIsValid = true
    } catch (e) {
      if (isReturningToChangeDate === true) {
        formErrorMessage = 'Sorry, your PAC or STAC code has become invalid since your last visit. Please fill out the form again.'
        dispatch({ type: 'clear', data: '' })
      } else {
        formErrorMessage = 'Code rejected. Please check your PAC or STAC code and phone number.'
      }
      if (!props.reviewMode) {
        AnalyticsUtil.trackLink('basketPage.switchNetworkFailed', {
          newBasket: props.basket,
          packageId: props.packageId,
          codeType: codeType.toLowerCase(),
          pageError: getPageError(e),
        })
      }
    }

    setIsValid(formIsValid)
    setIsValidating(false)
    setResetInputValidation(false)
    setErrorMessage(formErrorMessage)
  }

  const handleRemove = async () => {
    let errorMessageLocal = ''

    if (isFilledOut) {
      try {
        await props.onRemove()
      } catch (e) {
        console.info('Failed to remove...')
        errorMessageLocal = `Uh-oh, something went wrong when trying to remove your code. Once you've completed your order, please contact us.`
      }
      setErrorMessage(errorMessageLocal)
    }

    if (!errorMessageLocal) {
      props.onExit()
    }
  }

  const handleSave = async () => {
    let errorMessageLocal = ''
    setIsSaving(true)

    try {
      await props.onSave({
        codeType: codeType,
        code: code,
        msisdn: phoneNumber,
        validPortDate: new Date(date).toISOString(),
        expiryDate: new Date(date).toISOString(),
        status: portability.status,
        donorNetworkOperator: portability.donorNetworkOperator,
        donorServiceProvider: portability.donorServiceProvider,
      })

      props.onExit()
    } catch (e) {
      if (!props.reviewMode) {
        AnalyticsUtil.trackLink('basketPage.switchNetworkFailed', {
          newBasket: props.basket,
          packageId: props.packageId,
          codeType: codeType.toLowerCase(),
          pageError: getPageError(e),
        })
      }
      errorMessageLocal = `Uh-oh, we couldn't save your code. Please try again. If the problem persists, don't worry you can provide us the code after you have received delivery of your order.`
    }

    setIsSaving(false)
    setErrorMessage(errorMessageLocal)
  }

  return (
    <>
      {errorMessage && <Notification marginHorizontal={2} marginBottom={2} title={errorMessage} appearance="error" />}

      <form className={styles['form']}>
        <Grid>
          <GridRow>
            <GridColumn>
              <Paragraph fontWeight="bold" marginTop={1}>
                Select PAC or STAC code
              </Paragraph>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn marginTop={1} marginBottom={1}>
              <RadioButtonList
                items={[
                  { labelText: 'PAC', value: 'PAC' },
                  { labelText: 'STAC', value: 'STAC' },
                ]}
                stack="horizontal"
                inlineLabels
                groupName="pacstac"
                onChange={handleRadioButtonChange}
                checked={codeType}
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn col={12} colMd={4} colLg={4} marginTop={1} marginBottom={1}>
              <TextInput
                type="text"
                input={{
                  maxLength: 9,
                  inputValid: isValid,
                  id: 'code',
                  placeholder: codePlaceholder,
                  onChange: handleFormState,
                  value: code,
                }}
                labelText="Code"
                informationText="9 characters"
                validation={validationAppearance}
              />
            </GridColumn>
            <GridColumn col={12} colMd={4} colLg={4} marginTop={1} marginBottom={1}>
              <TextInput
                type="text"
                input={{
                  maxLength: 13,
                  inputValid: isValid,
                  id: 'phone-number',
                  placeholder: 'E.g 07891234567',
                  onChange: handleFormState,
                  value: phoneNumber,
                }}
                labelText="Mobile number"
                validation={validationAppearance}
              />
            </GridColumn>
            <GridColumn col={12} colMd={4} colLg={4} marginTop={1} marginBottom={1} className={styles['validation-button']}>
              <ThemedButton
                disabled={!code || !phoneNumber}
                onClick={handleValidate}
                marginBottom={0}
                loading={isValidating}
                appearance="tertiary"
                {...validationButtonAppearance}
                dangerouslyMergeStyles={styles}
              >
                {isValid && !resetInputValidation ? 'Success' : 'Enter'}
              </ThemedButton>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn colLg={7}>
              <SelectInput
                name="date"
                select={{
                  disabled: resetInputValidation,
                  id: 'date',
                  onChange: handleFormState,
                  options: selectOptions,
                  value: date,
                }}
                labelText="Network switch date"
                informationText="You will be notified during checkout if your delivery date is after your transfer date as this could lead to a loss of service."
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <div className={styles['form-buttons']}>
                <Button disabled={!date || !isValid} loading={isSaving} onClick={handleSave}>
                  Save
                </Button>
                <Button appearance="link" onClick={handleRemove}>
                  I will transfer my service later
                </Button>
              </div>
            </GridColumn>
          </GridRow>
        </Grid>
      </form>
    </>
  )
}

export default SwitchMyNetworkForm
