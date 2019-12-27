## SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect.

|                                                 Example 1                                                 |                                                 Example 2                                                 |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| ![](https://i.imgur.com/vWZJzZl.gif) | ![](https://i.imgur.com/iZFc7wz.gif) |

<div style="background-color:#84d2ef80; padding: 20px; border-radius: 4px; color: #14485b">This package includes the dependency **react-native-linear-gradient**
</div>

### Installation

> Note: If your project already includes the **react-native-linear-gradient** you can skip the Step #1

######Step #1
Using yarn:

```bash
yarn add react-native-linear-gradient
```

Using npm:

```bash
npm install  react-native-linear-gradient --save
```

If you are running a **react-native** version below 0.60:

```bash
react-native link react-native-linear-gradient
```

Otherwise:

```bash
cd ios
pod install
```

&nbsp;
######Step #2

Using yarn:

```bash
yarn add react-native-skeleton-placeholder
```

Using npm:

```bash
npm install react-native-skeleton-placeholder --save
```

### Usage

##### Example 1:

```javascript
import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function App() {
  return (
    <SafeAreaView>
      <SkeletonPlaceholder>
        <View style={{ width: "100%", height: 140 }} />
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: "white",
            alignSelf: "center",
            position: "relative",
            top: -50
          }}
        />
        <View style={{ width: 120, height: 20, alignSelf: "center" }} />
        <View
          style={{
            width: 240,
            height: 20,
            alignSelf: "center",
            marginTop: 12
          }}
        />
      </SkeletonPlaceholder>
    </SafeAreaView>
  );
}
```

#### Example 2:

```javascript
import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function App() {
  return (
    <SafeAreaView>
      {Array.from({ length: 5 }).map((_, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 100, height: 100 }} />

              <View
                style={{
                  justifyContent: "space-between",
                  marginLeft: 12,
                  flex: 1
                }}
              >
                <View style={{ width: "50%", height: 20 }} />
                <View style={{ width: "30%", height: 20 }} />
                <View style={{ width: "80%", height: 20 }} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      ))}
    </SafeAreaView>
  );
}
```

### Properties

|        Prop         |                  Description                   |  Type  |  Default  |
| :-----------------: | :--------------------------------------------: | :----: | :-------: |
| **backgroundColor** | Determines the highlight color of placeholder  | string | _#E1E9EE_ |
| **highlightColor**  | Determines the highlight color of placeholder  | string | _#F2F8FC_ |
|      **speed**      | Determines the animation speed in milliseconds | number |   _800_   |

### Contributing

Any help this module will be appreciated!

### License

[MIT](https://choosealicense.com/licenses/mit/)
