import * as React from "react";
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  ViewStyle,
  Dimensions,
  LayoutRectangle,
} from "react-native";
import MaskedView from "@react-native-community/masked-view";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SkeletonPlaceholderProps {
  /**
   * Determines component's children.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Determines the color of placeholder. By default is #E1E9EE
   */
  backgroundColor?: string;
  /**
   * Determines the highlight color of placeholder. By default is #F2F8FC
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. By default is 800
   */
  speed?: number;
}

export default function SkeletonPlaceholder({
  children,
  backgroundColor = "#E1E9EE",
  speed = 800,
  highlightColor = "#F2F8FC",
}: SkeletonPlaceholderProps): JSX.Element {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const animatedValue = React.useMemo(() => new Animated.Value(0), []);
  const translateX = React.useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
      }),
    [animatedValue]
  );

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    );
    if (layout?.width && layout?.height) {
      loop.start();
    }
    return () => loop.stop();
  }, [animatedValue, speed, layout?.width, layout?.height]);

  const absoluteTranslateStyle = React.useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  );
  const viewStyle = React.useMemo<ViewStyle>(
    () => ({ backgroundColor, overflow: "hidden" }),
    [backgroundColor]
  );

  const getChildren = React.useCallback(
    (element: JSX.Element | JSX.Element[]) => {
      return React.Children.map(
        element,
        (child: JSX.Element, index: number) => {
          let style: ViewStyle;
          if (child.type.displayName === "SkeletonPlaceholderItem") {
            const { children, ...styles } = child.props;
            style = styles;
          } else {
            style = child.props.style;
          }
          if (child.props.children) {
            return (
              <View key={index} style={style}>
                {getChildren(child.props.children)}
              </View>
            );
          } else {
            return (
              <View key={index} style={styles.childContainer}>
                <View style={[style, viewStyle]} />
              </View>
            );
          }
        }
      );
    },
    [viewStyle]
  );

  return layout?.width && layout?.height ? (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={
        <View
          style={{
            backgroundColor: "transparent",
          }}
        >
          {getChildren(children)}
        </View>
      }
    >
      <View style={{ flexGrow: 1, backgroundColor }} />
      <Animated.View
        style={[
          {
            flexDirection: "row",
          },
          absoluteTranslateStyle,
        ]}
      >
        {Array.from({ length: SCREEN_WIDTH }).map((_, index) => {
          const opacity = new Animated.Value(index);
          return (
            <Animated.View
              key={index}
              style={{
                width: 1,
                opacity: opacity.interpolate({
                  inputRange: [0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
                  outputRange: [0, 1, 0],
                }),

                backgroundColor: highlightColor,
              }}
            />
          );
        })}
      </Animated.View>
    </MaskedView>
  ) : (
    <View
      onLayout={(event) => {
        setLayout(event.nativeEvent.layout);
      }}
    >
      {getChildren(children)}
    </View>
  );
}

interface SkeletonPlaceholderItem extends ViewStyle {
  children?: JSX.Element | JSX.Element[];
}

SkeletonPlaceholder.Item = ({
  children,
  ...style
}: SkeletonPlaceholderItem): JSX.Element => (
  <View style={style}>{children}</View>
);

//@ts-ignore
SkeletonPlaceholder.Item.displayName = "SkeletonPlaceholderItem";

const styles = StyleSheet.create({
  childContainer: {
    position: "relative",
  },
  gradient: {
    flex: 1,
  },
});
