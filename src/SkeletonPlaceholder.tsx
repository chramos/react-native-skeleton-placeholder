import * as React from "react";
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  ColorValue,
  Dimensions,
  LayoutRectangle,
  ViewStyle,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

type SkeletonPlaceholderProps = {
  /**
   * Determines component's children.
   */
  children: JSX.Element;
  /**
   * Determines the color of placeholder.
   * @default #E1E9EE
   */
  backgroundColor?: ColorValue;
  /**
   * Determines the highlight color of placeholder. Only hex values supported (#fff, #fff0, #ffffff, #ffffff00).
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

  /**
   * Determines if Skeleton should show placeholders or pure children. 
   * @default true
   */
  enabled?: boolean;
}

export const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> & { Item: typeof Item } = ({
  children,
  enabled = true,
  backgroundColor = '#E1E9EE',
  highlightColor = '#F2F8FC',
  speed = 800,
  direction = 'right',
}) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const animatedValueRef = React.useRef(new Animated.Value(0));

  const animationActive = speed !== 0 && Boolean(layout?.width && layout?.height);

  React.useEffect(() => {
    if (!animationActive) return;

    const loop = Animated.loop(
      Animated.timing(animatedValueRef.current, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [animationActive, speed]);

  const animatedGradientStyle = React.useMemo(() => {
    const windowWidth = Dimensions.get('window').width;
    return {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row' as const,
      transform: [
        {
          translateX: animatedValueRef.current.interpolate({
            inputRange: [0, 1],
            outputRange:
              direction === 'right' ? [-windowWidth, windowWidth] : [windowWidth, -windowWidth],
          }),
        },
      ],
    };
  }, [direction]);

  const placeholders = React.useMemo(() => {
    if (!enabled) return null;

    return (
      <View style={styles.placeholderContainer}>
        {transformToPlaceholder(children, backgroundColor)}
      </View>
    );
  }, [backgroundColor, children, enabled]);

  if (!enabled || !placeholders) return children;

  if (!layout?.width || !layout.height)
    return <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>{placeholders}</View>;

  const transparentColor = highlightColor.length === 4 // #fff
    ? highlightColor + '0'
    : highlightColor.length === 7 // #ffffff
    ? highlightColor + '00'
    : highlightColor.length === 5 // #fff5
    ? highlightColor.substring(0, 4) + '0'
    : highlightColor.length === 9 // #ffffff00
    ? highlightColor.substring(0, 7) + '00'
    : (() => {throw new Error(`Unsupported color format (${highlightColor}), only hex (#fff, #fff0, #ffffff, #ffffff00) supported.`)})();

  return (
    <MaskedView style={{height: layout.height, width: layout.width}} maskElement={placeholders}>
      <View style={[StyleSheet.absoluteFill, {backgroundColor}]} />

      {animationActive && (
        <Animated.View style={animatedGradientStyle}>
          <LinearGradient
            {...gradientProps}
            colors={[transparentColor, highlightColor, transparentColor]}
          />
        </Animated.View>
      )}
    </MaskedView>
  );
};

type SkeletonPlaceholderItem = ViewStyle & {
  children?: JSX.Element | JSX.Element[];
}
SkeletonPlaceholder.Item = ({
  children,
  ...style
}: SkeletonPlaceholderItem): JSX.Element => (
  <View style={style}>{children}</View>
);
SkeletonPlaceholder.Item.displayName = "SkeletonPlaceholderItem";


const gradientProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
  style: StyleSheet.absoluteFill,
}

const transformToPlaceholder = (
  element: JSX.Element | JSX.Element[] | null,
  backgroundColor: ColorValue,
) => {
  if (!element) return null;

  return React.Children.map(element, (child: JSX.Element | null, index: number) => {
    if (!child) return null;

    const isPlaceholder = !child.props?.children || typeof child.props.children === 'string';
    const props = child.props;
    const key = props?.key ?? index;
    
    let style;
    if (child.type?.displayName === SkeletonPlaceholder.Item.displayName) {
      const {children:_, ...styleProps} = child.props;
      style = styleProps;
    } else {
      style = child.props.style;
    }

    const height =
      props.height ??
      style?.height ??
      props.lineHeight ??
      style?.lineHeight ??
      props.fontSize ??
      style?.fontSize;

    const width = props.width ?? style?.width;

    const finalStyle = [
      style,
      isPlaceholder ? [styles.placeholder, {backgroundColor}] : styles.placeholderContainer,
      {
        height,
        width,
      },
    ];

    return (
      <View
        key={key}
        style={finalStyle}
        children={
          isPlaceholder ? undefined : transformToPlaceholder(child.props.children, backgroundColor)
        }
      />
    );
  });
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  placeholderContainer: {
    backgroundColor: 'transparent',
  },
  placeholder: {
    overflow: 'hidden',
  },
});
