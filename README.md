## SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect with FlexBox.<br/>
Android and iOS

![](https://i.imgur.com/3aDeSTZ.gif)

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
import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const App = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
```

or with **View**

```javascript
import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const App = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 120, height: 20, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
```

### Properties

#### SkeletonPlaceholder

|      Prop       |                             Description                              |     Type      |  Default  |
| :-------------: | :------------------------------------------------------------------: | :-----------: | :-------: |
| backgroundColor |                 Determines the color of placeholder                  |    string     | _#E1E9EE_ |
| highlightColor  |            Determines the highlight color of placeholder             |    string     | _#F2F8FC_ |
|      speed      | Determines the animation speed in milliseconds. 0 disables animation |    number     |   _800_   |
|    direction    |                  Determines the animation direction                  | "right" \| "left" |   "right"   |

#### SkeletonPlaceholder.Item

| Prop |            Description            | Type | Default |
| :--: | :-------------------------------: | :--: | :-----: |
| any  | Any view style props was accepted | any  |

### Contributing

You are welcome to contribute!

### License

[MIT](https://choosealicense.com/licenses/mit/)
