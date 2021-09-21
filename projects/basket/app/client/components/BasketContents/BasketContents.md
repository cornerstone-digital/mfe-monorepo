
## Flexi upgrade

```
const basket = require('./mocks/flexi.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  packages={basket.packages}
  isUpgrade={true}
/>
```

## Handset

```
const basket = require('./mocks/basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  packages={basket.packages}
  showPackageHeaderUnderline={false}
  showBorder={false}
  reviewMode={true}
/>
```

## Simo

```
const simoBasket = require('./mocks/simo.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  packages={simoBasket.packages}
/>
```

## Broadband

```
const broadbandBasket = require('./mocks/broadband.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  packages={broadbandBasket.packages}
/>
```

## Business

```
const businessBasket = require('./mocks/business.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  packages={businessBasket.packages}
/>
```

## Combi

```
const combiBasket = require('./mocks/combi.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  combiPackageIds={combiBasket.combiPackageIds}
  packages={combiBasket.packages}
/>
```

## Lionheart

```
const lionheartPackage = require('./mocks/lionheart.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  combiPackageIds={lionheartPackage.combiPackageIds}
  packages={lionheartPackage.packages}
/>
```

## Lionheart with sim already on account

```
const lionheartPackage = require('./mocks/lionheart.basket.mock.2.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  combiPackageIds={lionheartPackage.combiPackageIds}
  packages={lionheartPackage.packages}
  activeBundles={lionheartPackage.activeBundles}
/>
```
## Watch

```
const watchPackage = require('./mocks/watch.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  combiPackageIds={watchPackage.combiPackageIds}
  packages={watchPackage.packages}
  activeBundles={watchPackage.activeBundles}
/>
```
## Smart Watch

```
const watchPackage = require('./mocks/smartwatch.basket.mock.json');
<BasketContents
  basketId='123'
  onRemovePackage={() => {}}
  onUndoRemovePackage={() => {}}
  onRemoveAddOn={() => {}}
  onUndoRemoveAddOn={() => {}}
  combiPackageIds={watchPackage.combiPackageIds}
  packages={watchPackage.packages}
  activeBundles={watchPackage.activeBundles}
/>
```