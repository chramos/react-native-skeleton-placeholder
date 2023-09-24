## SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect with FlexBox.<br/>
Android and iOS

![](https://user-images.githubusercontent.com/20586489/194037825-92efe72b-2e00-407d-8b18-ab949a85e1ea.mp4)

<a href="https://www.buymeacoffee.com/henriqueramos" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

### Installation

> Note: This package requires **@react-native-masked-view/masked-view** and **react-native-linear-gradient**

###### Step #1

Using yarn:

```bash
yarn add @react-native-masked-view/masked-view react-native-linear-gradient
```

Using npm:

```bash
npm install @react-native-masked-view/masked-view react-native-linear-gradient --save
```

If you are running a **react-native** version below 0.60:

```bash
react-native link @react-native-masked-view/masked-view react-native-linear-gradient
```

Otherwise:

```bash
cd ios
pod install
```

&nbsp;&nbsp;

###### Step #2

Using yarn:

```bash
yarn add react-native-skeleton-placeholder
```

Using npm:

```bash
npm install react-native-skeleton-placeholder --save
```

### Usage

There are two ways to use this package:

with **SkeletonPlacehoder.Item** 🆕

```javascript
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
```

or with **View**, **Text** or **Image**

```javascript
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <Image style={{width: 120, height: 20}} src={require('./src/assets/image.png')} />
          <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
```

### Properties

#### SkeletonPlaceholder

|      Prop       |                             Description                              |       Type        |  Default  |
| :-------------: | :------------------------------------------------------------------: | :---------------: | :-------: |
| backgroundColor |                 Determines the color of placeholder                  |    string       | _#E1E9EE_ |
| highlightColor  |            Determines the highlight color of placeholder             |   string (hex \| rgb \| rgba)    | _#F2F8FC_ |
|      speed      | Determines the animation speed in milliseconds. 0 disables animation |      number       |   _800_   |
|    direction    |                  Determines the animation direction                  | "right" \| "left" |  "right"  |
|     enabled     |   Determines if Skeleton should show placeholders or its children    |      boolean      |   true    |
|  borderRadius   |          Determines default border radius for placeholders           |      number       | undefined |

#### SkeletonPlaceholder.Item

| Prop |            Description            | Type | Default |
| :--: | :-------------------------------: | :--: | :-----: |
| any  | Any view style props was accepted | any  |

### Contributing

You are welcome to contribute!

### License

[MIT](https://choosealicense.com/licenses/mit/)
