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
yarn add react-native-skeleton-placeholder@6.0.0-beta.7
```

Using npm:

```bash
npm install react-native-skeleton-placeholder@6.0.0-beta.7 --save
```

### Usage

There are two ways to use this package:

1. Using **View**, **Text** or **Image**
   > Note: The component you choose to use must accept onLayout prop. An especial case is the **Text** component, which must accept onTextLayout and ref prop. You don't need to worry if you are importing these components from `react-native` package.

```javascript
import React from 'react';
import {View, Text, Image} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{gap: 6}}>
          <View style={{width: 120, height: 20}} />
          <View style={{width: 80, height: 20}} />
        </View>
        <View style={{gap: 16}}>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={{width: 200, height: 200}}
          />
          <Text style={{fontSize: 24}}>Do aute nulla aliquip deserunt ex est dolor</Text>
          <Text>
            Lorem dolore dolore Lorem culpa mollit et nulla nostrud aliqua commodo eiusmod culpa. Ut
            laborum officia sit laboris deserunt nisi ipsum deserunt incididunt. Amet elit veniam
            sit occaecat incididunt mollit non. Aliqua qui laborum qui est incididunt labore. Dolore
            aute enim ex enim cupidatat officia esse incididunt officia mollit ex deserunt.
          </Text>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
```

2. Using **SkeletonPlaceholder.Item** or **SkeletonPlaceholder.View**

```javascript
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={20}>
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item gap={6}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
```

### Properties

#### SkeletonPlaceholder

|         Prop          |                             Description                              |            Type             |   Default   |
| :-------------------: | :------------------------------------------------------------------: | :-------------------------: | :---------: |
|    backgroundColor    |                 Determines the color of placeholder                  |           string            |  _#C0C0C0_  |
|    highlightColor     |            Determines the highlight color of placeholder             | string (hex \| rgb \| rgba) |  _#F2F8FC_  |
|     borderRadius      |          Determines default border radius for placeholders           |           number            | _undefined_ |
|   animationDuration   | Determines the animation speed in milliseconds. 0 disables animation |           number            |   _1500_    |
| animationBackAndForth |            Whether the Animation should go back and forth            |           boolean           |   _false_   |
|         angle         |                   Angle of the gradient in degrees                   |           number            | _undefined_ |

<!-- |     enabled     |   Determines if Skeleton should show placeholders or its children    |           boolean           |   true    | -->

#### SkeletonPlaceholder.Item

| Prop |           Description            | Type | Default |
| :--: | :------------------------------: | :--: | :-----: |
| any  | Any view style props is accepted | any  |

#### SkeletonPlaceholder.View

| Prop |           Description            | Type | Default |
| :--: | :------------------------------: | :--: | :-----: |
| any  | Any view style props is accepted | any  |

### Contributing

You are welcome to contribute!

### License

[MIT](https://choosealicense.com/licenses/mit/)
