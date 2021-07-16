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
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SkeletonPlaceholderProps {
  /**
   * Determines component's children.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Determines the color of placeholder.
   * @default #E1E9EE
   */
  backgroundColor?: string;
  /**
   * Determines the highlight color of placeholder.
   * @default #F2F8FC
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. Use 0 to disable animation
   * @default 800
   */
  speed?: number;
  /**
   * Determines the animation direction, left or right
   * @default right
   */
  direction?: "left" | "right";
}

export default function SkeletonPlaceholder({
  children,
  backgroundColor = "#E1E9EE",
  speed = 800,
  highlightColor = "#F2F8FC",
  direction = "right",
}: SkeletonPlaceholderProps): JSX.Element {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const animatedValue = React.useMemo(() => new Animated.Value(0), []);
  const translateX = React.useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          direction === "right"
            ? [-SCREEN_WIDTH, SCREEN_WIDTH]
            : [SCREEN_WIDTH, -SCREEN_WIDTH],
      }),
    [animatedValue]
  );

  React.useEffect(() => {
    if (speed > 0) {
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
    }
    return;
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
      {speed > 0 && (
        <Animated.View
          style={[
            {
              flexDirection: "row",
            },
            absoluteTranslateStyle,
          ]}
        >
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill]}
                colors={["transparent", "black", "transparent"]}
              />
            }
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: highlightColor },
              ]}
            ></View>
          </MaskedView>
        </Animated.View>
      )}
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
