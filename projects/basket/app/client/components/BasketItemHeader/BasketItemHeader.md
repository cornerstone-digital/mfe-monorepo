Plain

```
<BasketItemHeader
  title='Basic header' 
/>
```

Package (present)

```
<BasketItemHeader
  title='45GB Red Entertainment plan' 
  onRemove={() => { alert('remove package') }}
  onUndo={() => { alert('restore package') }}
  headerStatus='present'
  changePackageLink='/'
  isPackage={true}
/>
```

Package (present) with no change button

```
<BasketItemHeader
  showChangeButton={false}
  title='45GB Red Entertainment plan' 
  onRemove={() => { alert('remove package') }}
  onUndo={() => { alert('restore package') }}
  headerStatus='present'
  changePackageLink='/'
  isPackage={true}
/>
```

Package (removing)

```
<BasketItemHeader
  title='45GB Red Entertainment plan'
  headerStatus='removing'
  onRemove={() => { alert('remove package') }}
  onUndo={() => { alert('restore package') }}
  changePackageLink='/'
  isPackage={true}
/>
```

Package (removed)

```
<BasketItemHeader
  title='45GB Red Entertainment plan' 
  onRemove={() => { alert('remove package') }}
  onUndo={() => { alert('restore package') }}
  headerStatus='removed'
  changePackageLink='/'
  isPackage={true}
/>
```

Package (retrieving)

```
<BasketItemHeader
  title='45GB Red Entertainment plan'
  headerStatus='retrieving'
  onRemove={() => { alert('remove package') }}
  onUndo={() => { alert('restore package') }}
  changePackageLink='/'
  isPackage={true}
/>
```

Extra (present)

```
<BasketItemHeader
  title='Loss, theft, damage and breakdown cover' 
  onRemove={() => { alert('remove extra') }}
  onUndo={() => { alert('restore extra') }}
  headerStatus='present'
/>
```

Extra (removing)

```
<BasketItemHeader
  title='Loss, theft, damage and breakdown cover'
  onRemove={() => { alert('remove extra') }}
  onUndo={() => { alert('restore extra') }}
  headerStatus='removing'
/>
```


Extra (removed)

```
<BasketItemHeader
  title='Loss, theft, damage and breakdown cover' 
  onRemove={() => { alert('remove extra') }}
  onUndo={() => { alert('restore extra') }}
  headerStatus='removed'
/>
```

Extra (retrieving)

```
<BasketItemHeader
  title='Loss, theft, damage and breakdown cover'
  onRemove={() => { alert('remove extra') }}
  onUndo={() => { alert('restore extra') }}
  headerStatus='retrieving'
/>
```

Total cost

```
<BasketItemHeader
  title='Total cost'
  isTotalCost={true}
/>
```