# SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect.

|                                                 Example 1                                                 |                                                 Example 2                                                 |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| ![](https://cl.ly/f6a075dae9eb/Screen%252520Recording%2525202019-06-10%252520at%25252012.59%252520PM.gif) | ![](https://cl.ly/4a8ccccb5179/Screen%252520Recording%2525202019-06-10%252520at%25252001.27%252520PM.gif) |

## Installation

Using yarn:

```bash
yarn add react-native-skeleton-placeholder
```

Using npm:

```bash
npm install react-native-skeleton-placeholder --save
```

## Usage

#### Example 1:

```js
import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

class App extends React.Component {
  render() {
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
}

export default App;
```

#### Example 2:

```js
import React from "react";
import { SafeAreaView, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        {[0, 1, 2, 3, 4].map((_, index) => (
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
}

export default App;
```

## Prop

|        Prop         |              Description               |  Type  | Default  |
| :-----------------: | :------------------------------------: | :----: | :------: |
| **backgroundColor** |        The color of placeholder        | string | _"#eee"_ |
|   **minOpacity**    | Min opacity value when it is animating | number |  _0.3_   |
|   **maxOpacity**    | Max opacity value when it is animating | number |  _1.0_   |

## Contributing

Any help this module will be approciate!

## License

[MIT](https://choosealicense.com/licenses/mit/)
