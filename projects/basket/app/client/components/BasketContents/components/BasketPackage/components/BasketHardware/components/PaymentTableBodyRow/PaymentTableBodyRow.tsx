interface PaymentTableBodyRowProps {
  text?: string
  value?: string
  label?: string
}

const PaymentTableBodyRow = (props: PaymentTableBodyRowProps) => {
  const { text, value, label } = props
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {label && <div>{label}</div>}
      </td>
    </tr>
  )
}

export default PaymentTableBodyRow
