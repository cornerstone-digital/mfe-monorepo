import { FormEvent, useState } from 'react'

import Heading from '@web-core/components/atoms/Heading'
import BlockContainer from '@web-core/components/molecules/BlockContainer'
import { Grid, GridColumn, GridRow } from '@vfuk/core-grid'
import TextInput from '@web-core/components/molecules/TextInput'
import Button from '@web-core/components/atoms/Button'

import styles from './VoucherCodeEntry.scss'
import { useStore } from '@store'
import { observer } from 'mobx-react-lite'

const VoucherCodeEntry = observer(() => {
  const { basketStore } = useStore()
  const { voucherCode: code, voucherDescription: description } = basketStore.basket

  const [voucherCode, setVoucherCode] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const removeVoucherInfo = { link_name: 'basket summary:remove promo' }

  const onAddVoucherCode = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)
    await basketStore.onVoucherSubmit(voucherCode)
    setIsSubmitting(false)
    setVoucherCode('')
  }

  const onVoucherTextInputChange = (e: { target: { value: string } }): void => {
    setVoucherCode(e.target.value)
  }

  const onRemoveVoucherCode = async (): Promise<void> => {
    await basketStore.handleRemoveVoucher()
    setVoucherCode('')
  }

  return (
    <BlockContainer
      heading={{
        text: 'Promotional code',
        size: 5,
        level: 5,
        marginVertical: 1,
        fontWeight: 'extra-bold',
      }}
      collapse={{ collapsable: true, collapsed: true, label: 'Hide' }}
      guttering="none"
    >
      <div className="padding-bottom-2">
        <Grid>
          <form onSubmit={onAddVoucherCode}>
            <GridRow>
              <GridColumn colMd={7} colLg={6} className={styles['text-container']}>
                <TextInput
                  type="text"
                  labelText="You can apply 1 promotional code per basket"
                  width="full"
                  input={{
                    onChange: onVoucherTextInputChange,
                    value: voucherCode,
                  }}
                  selector="promotional-code-wrapper"
                />
              </GridColumn>
              <GridColumn className={styles['submit-container']} col={12} colMd={2} alignSelf="end">
                <Button
                  loading={isSubmitting}
                  appearance="secondary"
                  marginVertical={0}
                  onClick={onAddVoucherCode}
                  selector="update-basket-button"
                  marginTopMd={0}
                  marginBottom={0}
                >
                  Update basket
                </Button>
              </GridColumn>
            </GridRow>
          </form>
        </Grid>
      </div>
      {code && (
        <div className={`padding-horizontal-2 padding-bottom-3 ${styles['applied-voucher']}`}>
          <Heading size={5} level={5} fontWeight="extra-bold" paddingTop={2} marginBottom={1}>
            Applied promotion
          </Heading>
          <p className={styles['voucher']}>{description} </p>
          <button
            data-selector="remove-voucher"
            data-info={removeVoucherInfo}
            onClick={onRemoveVoucherCode}
            className={styles['remove-voucher']}
          >
            Remove
          </button>
        </div>
      )}
    </BlockContainer>
  )
})

export default VoucherCodeEntry
