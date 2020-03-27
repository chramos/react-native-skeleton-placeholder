import * as React from "react";
import { Animated, View, StyleSheet, Easing, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
  backgroundColor,
  speed,
  highlightColor
}: SkeletonPlaceholderProps): JSX.Element {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350]
  });

  const getChildren = (element: JSX.Element | JSX.Element[]) => {
    return React.Children.map(element, (child: JSX.Element, index: number) => {
      let style;
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
          <View key={index} style={{ position: "relative" }}>
            <View style={[style, { backgroundColor, overflow: "hidden" }]}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    transform: [{ translateX }]
                  }
                ]}
              >
                <LinearGradient
                  colors={
                    [
                      backgroundColor,
                      highlightColor,
                      backgroundColor
                    ] as string[]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </View>
          </View>
        );
      }
    });
  };

  return <React.Fragment>{getChildren(children)}</React.Fragment>;
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

SkeletonPlaceholder.defaultProps = {
  backgroundColor: "#E1E9EE",
  highlightColor: "#F2F8FC",
  speed: 800
};
