import React, { useCallback, useEffect, useMemo } from "react";
import { Animated, View, StyleSheet, Easing, ViewStyle, StyleProp } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 0 };

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
  highlightColor = "#F2F8FC"
}: SkeletonPlaceholderProps): JSX.Element {
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const translateX = useMemo(() => animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350]
  }), [animatedValue]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [animatedValue, speed]);

  const absoluteTranslateStyle = useMemo(() => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }), [translateX]);
  const gradientColors = useMemo(() => [backgroundColor, highlightColor, backgroundColor], [backgroundColor, highlightColor]);
  const viewStyle = useMemo<StyleProp<ViewStyle>>(() => ({ backgroundColor, overflow: "hidden" }), [backgroundColor]);

  const getChildren = useCallback((element: JSX.Element | JSX.Element[]) => {
    return React.Children.map(element, (child: JSX.Element, index: number) => {
      let style: StyleProp<ViewStyle>;
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
            <View style={[style, viewStyle]}>
              <Animated.View style={absoluteTranslateStyle}>
                <LinearGradient
                  colors={gradientColors}
                  start={GRADIENT_START}
                  end={GRADIENT_END}
                  style={styles.gradient}
                />
              </Animated.View>
            </View>
          </View>
        );
      }
    });
  }, [viewStyle, absoluteTranslateStyle, gradientColors]);

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

const styles = StyleSheet.create({
  childContainer: {
    position: 'relative'
  },
  gradient: {
    flex: 1,
  },
})
