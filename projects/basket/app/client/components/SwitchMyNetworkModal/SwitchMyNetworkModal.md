The `SwitchMyNetworkModal` organism houses a form used for customers to enter their PAC or STAC code and mobile number, validate it, select a date to port their number over to Vodafone and save it to the basket. It's used in the basket to allow customers to enter their PAC or STAC at the point of sale.

```
initialState = {open: false}
;<div>
  <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => { setState({open: true})}}>
    Open SwitchMyNetworkModal in its default state
  </a>
  <SwitchMyNetworkModal isOpen={state.open} onExit={() => { setState({open: false})}} />
</div>
```

If the delivery date the customer has in the checkout is later than the porting or termination date selected by the customer in the basket, then they can show a different state of this organism to inform them of this, using the `hasLateDelivery` boolean prop. A `phoneNumber` and `date` is expected from the `portability` prop, which will render in the copy and is the details relevant to the customer. Additionally, a `codeType` should also be present in `portabiliy` — PAC or STAC — that tweaks the copy to be relevant to the type of switch they are doing. You can provide an `onContinue` function, which will be called after they've successfully clicked 'Continue'. The 'onContinue' function should ideally set the `isOpen` prop to false in order to exit the component.

```
initialState = {open: false}
;<div>
  <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => { setState({open: true})}}>
    Open SwitchMyNetworkModal in its late delivery state
  </a>
  <SwitchMyNetworkModal isOpen={state.open} onExit={() => { setState({open: false})}} portability={{codeType: 'PAC', msisdn: '07123456789', validPortDate: '01/02/2020' }} hasLateDelivery={true} />
</div>
```

Similar to the above, if the customer has reached the checkout, but the package for which they have filled out a PAC or STAC code in the basket cannot be delivered before the date they selected for switching due to a backorder/preorder, the they will see the same scenario (albeit slightly different copy). This should be provided to SwitchMyNetworkModal as `hasUnknownDelivery`, as the delivery date is not known at this stage and cannot be guaranteed. This just alters copy shown to the customer, but is functionally the same as above. You can provide an `onContinue` function again.

```
initialState = {open: false}
;<div>
  <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => { setState({open: true})}}>
    Open SwitchMyNetworkModal in its unknown preorder/backorder delivery state
  </a>
  <SwitchMyNetworkModal isOpen={state.open} onExit={() => { setState({open: false})}} portability={{codeType: 'PAC', msisdn: '07123456789', validPortDate: '01/02/2020' }} hasUnknownDelivery={true} />
</div>
```
