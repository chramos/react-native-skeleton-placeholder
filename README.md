## SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect with FlexBox.<br/>
Android and iOS

![](https://user-images.githubusercontent.com/20586489/194037825-92efe72b-2e00-407d-8b18-ab949a85e1ea.mp4)

<a href="https://www.buymeacoffee.com/henriqueramos" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

### Installation

> Note: This package requires **react-native-svg** and **react-native-reanimated**

###### Step #1

Using yarn:

```bash
yarn add react-native-svg react-native-reanimated
```

Using npm:

```bash
npm install react-native-svg react-native-reanimated --save
```

Run pod install:

```bash
cd ios
pod install
```

&nbsp;&nbsp;

###### Step #2

Using yarn:

```bash
yarn add react-native-skeleton-placeholder@6.0.0-beta.3
```

Using npm:

```bash
npm install react-native-skeleton-placeholder@6.0.0-beta.3 --save
```

### Usage

```javascript
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20, gap: 6}}>
          <View style={{width: 120, height: 20}} />
          <View style={{width: 80, height: 20}} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
```

### Properties

#### SkeletonPlaceholder

|         Prop          |                             Description                              |            Type             |  Default  |
| :-------------------: | :------------------------------------------------------------------: | :-------------------------: | :-------: |
|    backgroundColor    |                 Determines the color of placeholder                  |           string            | _#C0C0C0_ |
|    highlightColor     |            Determines the highlight color of placeholder             | string (hex \| rgb \| rgba) | _#F2F8FC_ |
|     borderRadius      |          Determines default border radius for placeholders           |           number            | undefined |
|   animationDuration   | Determines the animation speed in milliseconds. 0 disables animation |           number            |  _1500_   |
| animationBackAndForth |            Whether the Animation should go back and forth            |           boolean           |  _false_  |
|         angle         |                   Angle of the gradient in degrees                   |           number            |    _0_    |

<!-- |     enabled     |   Determines if Skeleton should show placeholders or its children    |           boolean           |   true    | -->

<!-- #### SkeletonPlaceholder.Item

| Prop |            Description            | Type | Default |
| :--: | :-------------------------------: | :--: | :-----: |
| any  | Any view style props was accepted | any  | -->

### Contributing

You are welcome to contribute!

### License

[MIT](https://choosealicense.com/licenses/mit/)
