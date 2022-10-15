import MaskedView from '@react-native-masked-view/masked-view';
import * as React from 'react';
import {
  Animated,
  ColorValue,
  Dimensions,
  Easing,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WINDOW_WIDTH = Dimensions.get('window').width;

const logEnabled = false;

type SkeletonPlaceholderProps = {
  /**
   * Determines component's children.
   */
  children: JSX.Element;
  /**
   * Determines the color of placeholder.
   */
  backgroundColor?: ColorValue;
  /**
   * Determines the highlight color of placeholder. Only hex values supported (#fff, #fff0, #ffffff, #ffffff00).
   */
  highlightColor?: string;
  /**
   * Determines the animation speed in milliseconds. Use 0 to disable animation
   */
  speed?: number;
  /**
   * Determines the animation direction, left or right
   */
  direction?: 'left' | 'right';
  /**
   * Determines if Skeleton should show placeholders or its children.
   */
  enabled?: boolean;
  /**
   * Determines default border radius for placeholders from both SkeletonPlaceholder.Item and generated from children.
   */
  borderRadius?: number;
  angle?: number;
};

type SkeletonPlaceholderItemProps = ViewStyle & {
  style?: StyleProp<ViewStyle>;
};

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> & {
  Item: React.FC<SkeletonPlaceholderItemProps>;
} = ({children, enabled, backgroundColor, highlightColor, speed, direction, borderRadius}) => {
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const animatedValueRef = React.useRef(new Animated.Value(0));
  const isAnimationReady = Boolean(speed && layout?.width && layout?.height);

  React.useEffect(() => {
    if (!isAnimationReady) return;

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
  }, [isAnimationReady, speed]);

  const animatedGradientStyle = React.useMemo(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row' as const,
      transform: [
        {
          translateX: animatedValueRef.current.interpolate({
            inputRange: [0, 1],
            outputRange:
              direction === 'right' ? [-WINDOW_WIDTH, WINDOW_WIDTH] : [WINDOW_WIDTH, -WINDOW_WIDTH],
          }),
        },
      ],
    };
  }, [direction, WINDOW_WIDTH]);

  const getTransparentColor = React.useCallback(() => {
    if (!highlightColor) {
      return undefined;
    }

    switch (highlightColor.length) {
      case 4:
        return `${highlightColor}0`; // #fff
      case 5:
        return `${highlightColor.substring(0, 4)}0`; // #fff5
      case 7:
        return `${highlightColor}00`; //#ffffff
      case 9:
        `${highlightColor.substring(0, 7)}00`; // #ffffff00
      default:
        throw new Error(
          `Unsupported color format (${highlightColor}), only hex (#fff, #fff0, #ffffff, #ffffff00) supported.`,
        );
    }
  }, [highlightColor]);

  const placeholders = React.useMemo(() => {
    if (!enabled) return null;

    return (
      <View style={styles.placeholderContainer}>
        {transformToPlaceholder(children, backgroundColor, borderRadius)}
      </View>
    );
  }, [backgroundColor, children, borderRadius, enabled]);

  if (!enabled || !placeholders) return children;

  if (!layout?.width || !layout.height)
    return <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>{placeholders}</View>;

  // https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/358
  // to make transparent gradient we need to use original color with alpha

  const transparentColor = getTransparentColor();

  return (
    <MaskedView style={{height: layout.height, width: layout.width}} maskElement={placeholders}>
      <View style={[StyleSheet.absoluteFill, {backgroundColor}]} />

      {isAnimationReady && highlightColor !== undefined && transparentColor !== undefined && (
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

SkeletonPlaceholder.defaultProps = {
  backgroundColor: '#E1E9EE',
  highlightColor: '#F2F8FC',
  speed: 800,
  direction: 'right',
  enabled: true,
  borderRadius: undefined,
};

SkeletonPlaceholder.Item = (props) => <View style={getItemStyle(props)}>{props.children}</View>;
SkeletonPlaceholder.Item.displayName = 'SkeletonPlaceholderItem';

const gradientProps = {
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
  style: StyleSheet.absoluteFill,
};

const getItemStyle = ({
  children: _,
  style,
  ...styleFromProps
}: React.PropsWithChildren<SkeletonPlaceholderItemProps>) => {
  return style ? [style, styleFromProps] : styleFromProps;
};

const transformToPlaceholder = (
  rootElement: JSX.Element | JSX.Element[] | null,
  backgroundColor: ColorValue | undefined,
  radius: number | undefined,
) => {
  if (!rootElement) return null;

  return React.Children.map(rootElement, (element: JSX.Element | null, index: number) => {
    if (!element) return null;

    if (element.type === React.Fragment)
      return <>{transformToPlaceholder(element.props?.children, backgroundColor, radius)}</>;

    const isPlaceholder =
      !element.props?.children ||
      typeof element.props.children === 'string' ||
      (Array.isArray(element.props.children) &&
        element.props.children.every((x: any) => x == null || typeof x === 'string'));
    const props = element.props;
    const style =
      element.type?.displayName === SkeletonPlaceholder.Item.displayName
        ? getItemStyle(element.props)
        : element.props.style;

    const borderRadius = props?.borderRadius ?? style?.borderRadius ?? radius;
    const width = props?.width ?? style?.width;
    const height =
      props?.height ??
      style?.height ??
      props?.lineHeight ??
      style?.lineHeight ??
      props?.fontSize ??
      style?.fontSize;

    const finalStyle = [
      style,
      isPlaceholder ? [styles.placeholder, {backgroundColor}] : styles.placeholderContainer,
      {
        height,
        width,
        borderRadius,
      },
    ];

    logEnabled &&
      console.log(isPlaceholder ? '[skeleton] placeholder' : '[skeleton] container', {
        element,
      });

    return (
      <View
        key={index}
        style={finalStyle}
        children={
          isPlaceholder
            ? undefined
            : transformToPlaceholder(element.props.children, backgroundColor, borderRadius)
        }
      />
    );
  });
};

const styles = StyleSheet.create({
  placeholderContainer: {
    backgroundColor: 'transparent',
  },
  placeholder: {
    overflow: 'hidden',
  },
});

export default SkeletonPlaceholder;
