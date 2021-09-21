import Icon from '@web-core/components/atoms/Icon'
import styles from './ModalPrompt.scss'
import { ModalPromptProps } from './ModalPrompt.types'

const ModalPrompt = (props: ModalPromptProps) => (
  <button className={styles['icon-wrapper']} onClick={props.onClick} data-selector={props?.dataSelector}>
    <Icon name="info-circle-solid" size={1} appearance="info" />
    <p className={styles['icon-label']}>{props.text}</p>
  </button>
)

export default ModalPrompt
