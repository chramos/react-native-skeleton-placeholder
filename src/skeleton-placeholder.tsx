import React, {useRef, useState} from 'react';
import {View, ViewProps} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Defs, LinearGradient, Mask, Rect, Stop, Svg} from 'react-native-svg';

import SvgRenderer from './svg-rendered';
import {Measurements} from './types';
import flatten from './utils/flatten';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type SkeletonPlaceholderProps = {
  /**
   * Background color of the skeleton placeholder
   */
  backgroundColor?: string;
  /**
   * Highlight color of the skeleton placeholder
   */
  highlightColor?: string;
  /**
   * Default border radius for each skeleton child
   */
  borderRadius?: number;
  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;
  /**
   * Whether the animation should be reversed
   */
  reverseAnimation?: boolean;
  /**
   * Angle of the gradient in degrees
   */
  angle?: number;
};
const SkeletonPlaceholder = ({
  backgroundColor = '#c0c0c0',
  highlightColor = '#F2F8FC',
  borderRadius = 0,
  animationDuration = 1500,
  reverseAnimation = false,
  angle = 0,
  children,
}: React.PropsWithChildren<SkeletonPlaceholderProps>) => {
  const childRefs = useRef<{ref: View; styles: any}[]>([]);

  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const x1 = useSharedValue(-200);
  const x2 = useSharedValue(-100);

  React.useEffect(() => {
    x1.value = withRepeat(withTiming(100, {duration: animationDuration}), -1, reverseAnimation);
    x2.value = withRepeat(withTiming(200, {duration: animationDuration}), -1, reverseAnimation);
  }, [x1, x2, animationDuration, reverseAnimation]);

  const animatedProps = useAnimatedProps(() => ({
    x1: `${x1.value}%`,
    x2: `${x2.value}%`,
  }));

  const measureChild = (index: number): Measurements => {
    const node = childRefs.current[index];
    let measurements: Measurements = {
      x: 0,
      y: 0,
      pageX: 0,
      pageY: 0,
      width: 0,
      height: 0,
      styles: {},
    };
    if (!node) return measurements;

    node.ref?.measure?.((x, y, width, height, pageX, pageY) => {
      measurements = {
        x,
        y,
        width,
        height,
        pageX,
        pageY,
        styles: node.styles,
      };
    });

    return measurements;
  };

  const flattenedChildren = flatten(children as any);
  const childrenStyles = flattenedChildren.map((child) => child.props.style);
  /**
   * TODO: find a better way to handle this;
   * Every time a child changes, the hash changes and the component "re-renders".
   * Then, the calculations are done again and the animation is reset.
   */
  const hash = JSON.stringify(childrenStyles);

  React.useEffect(() => {
    return () => {
      childRefs.current = [];
      setContainerSize({width: 0, height: 0});
    };
  }, [hash]);

  const renderRecursive = React.useCallback((node: React.ReactNode): React.ReactNode => {
    return React.Children.map(
      node,
      (child: React.ReactElement<ViewProps & {ref: React.Ref<View>}>) => {
        if (child.props.children)
          return React.cloneElement(child, child.props, renderRecursive(child.props.children));

        return React.cloneElement(child, {
          ...(child.props ?? {}),
          ref: (ref: View) => {
            childRefs.current.push({ref, styles: child?.props?.style});
          },
        });
      },
    );
  }, []);

  const MemoizedRender = React.useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{position: 'absolute', zIndex: -1, opacity: 0}}
          onLayout={(event) => {
            setContainerSize({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            });
          }}>
          {renderRecursive(children as any)}
        </View>
      );
    }

    return (
      <Svg width={containerSize.width} height={containerSize.height}>
        <Defs>
          <AnimatedLinearGradient
            id="grad"
            gradientTransform={angle ? `rotate(${angle})` : undefined}
            animatedProps={animatedProps}>
            <Stop offset="0%" stopColor={backgroundColor} />
            <Stop offset="50%" stopColor={highlightColor} />
            <Stop offset="100%" stopColor={backgroundColor} />
          </AnimatedLinearGradient>

          <Mask id="shapeMask">
            <SvgRenderer
              defaultBorderRadius={borderRadius}
              measurements={childRefs.current.map((_, index) => measureChild(index))}
            />
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={containerSize.width}
          height={containerSize.height}
          fill="url(#grad)"
          mask="url(#shapeMask)"
        />
      </Svg>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    containerSize.width,
    containerSize.height,
    animatedProps,
    angle,
    backgroundColor,
    highlightColor,
    borderRadius,
    childRefs,
    renderRecursive,
  ]);

  return MemoizedRender;
};

export default SkeletonPlaceholder;
