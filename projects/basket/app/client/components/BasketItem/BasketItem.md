Example bundle

```
<BasketItem
  title='45GB Red Entertainment plan - 12 months' 
  upfrontPrice='40'
  monthlyPrice='30'
  icon='sim'
  onRemove={() => {}}
  onUndo={() => {}}
  description={[
    'Unlimited Text',
    'Unlimited minutes',
    '50GB data allowance',
    '3-month free trial of secure net',
    'Your choice of entertainment',
    <img src='http://www.vodafone.co.uk/cs/groups/public/documents/webcontent/img_mef_ent_packs_svg.svg' />
  ]}
/>
```
Example handset with voucher applied
```
<BasketItem
  title='Samsung Galaxy S8' 
  monthlyPrice='30'
  monthlyDiscountPrice='20'
  promo='Example discount'
  image='https://via.placeholder.com/100'
  onRemove={() => {}}
  onUndo={() => {}}
  description='The Samsung Galaxy S8 has a boundary-breaking design, with a 5.8-inch rounded-corner Infinity Display that gives you more screen in your hand. You get a personal assistant in your pocket, with a handy dashboard combining Bixby voice assistance and the Reminder. The iris scanner enhances both security and convenience.'
/>
```
Example handset item when upgrading
```
<BasketItem
  title='Nokia 3310' 
  monthlyPrice='50'
  monthlyDiscountPrice='48'
  upfrontPrice='400'
  upfrontDiscountPrice='380'
  promo={['Example one', 'example two']}
  image='https://via.placeholder.com/100'
  onRemove={() => {}}
  onUndo={() => {}}
  isUpgrade
  description='The Samsung Galaxy S8 has a boundary-breaking design, with a 5.8-inch rounded-corner Infinity Display that gives you more screen in your hand. You get a personal assistant in your pocket, with a handy dashboard combining Bixby voice assistance and the Reminder. The iris scanner enhances both security and convenience.'
/>
```
Example insurance with discount 
```
<BasketItem
  title='Loss, theft, damage and breakdown cover' 
  upfrontDiscountPrice='30'
  upfrontPrice='40'
  monthlyPrice='30'
  monthlyDiscountPrice='20'
  image='https://via.placeholder.com/100'
  onRemove={() => {}}
  onUndo={() => {}}
/>
```
Example insurance as extra
```
<BasketItem
  title='Loss, theft, damage and breakdown cover' 
  upfrontPrice='40'
  monthlyPrice='30'
  isExtra={true}
  description='The description for the extra takes the space usually filled by the icon.'
/>
```

Example total cost
```
<BasketItem
  title='Total cost'
  upfrontPrice='40'
  monthlyPrice='30'
/>
```