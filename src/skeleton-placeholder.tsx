import React, {useState} from 'react';
import {LayoutRectangle} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Defs, LinearGradient, Mask, Rect, Stop, Svg} from 'react-native-svg';

import Measure from './measure';
import SvgRenderer from './svg-rendered';
import {RectType} from './types';
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
   * Whether the animation should go back and forth
   */
  animationBackAndForth?: boolean;
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
  animationBackAndForth = false,
  angle = 0,
  children,
}: React.PropsWithChildren<SkeletonPlaceholderProps>) => {
  const [content, setContent] = useState<{
    container?: LayoutRectangle;
    rects: RectType[];
  }>({
    container: undefined,
    rects: [],
  });

  const x1 = useSharedValue(-200);
  const x2 = useSharedValue(-100);

  React.useEffect(() => {
    x1.value = withRepeat(
      withTiming(100, {duration: animationDuration}),
      -1,
      animationBackAndForth,
    );
    x2.value = withRepeat(
      withTiming(200, {duration: animationDuration}),
      -1,
      animationBackAndForth,
    );
  }, [x1, x2, animationDuration, animationBackAndForth]);

  const animatedProps = useAnimatedProps(() => ({
    x1: `${x1.value}%`,
    x2: `${x2.value}%`,
  }));

  const flattenedChildren = flatten(children as any);
  const childrenStyles = flattenedChildren.map((child) => child.props.style);
  /**
   * TODO: find a better way to handle this;
   * We need to know when the children styles change to recalculate the content
   */
  const hash = JSON.stringify(childrenStyles);

  React.useEffect(() => {
    return () => {
      setContent({container: undefined, rects: []});
    };
  }, [hash]);

  const Render = React.useCallback(() => {
    if (!content.container) {
      return (
        <Measure
          defaultBackgroundColor={backgroundColor}
          onComplete={(container, rects) => {
            setContent({container, rects});
          }}>
          {children}
        </Measure>
      );
    }

    return (
      <Svg width={content.container?.width} height={content.container?.height}>
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
            <SvgRenderer defaultBorderRadius={borderRadius} rects={content.rects} />
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={content.container?.width}
          height={content.container?.height}
          fill="url(#grad)"
          mask="url(#shapeMask)"
        />
      </Svg>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content.container,
    animatedProps,
    angle,
    backgroundColor,
    highlightColor,
    borderRadius,
    content.rects,
  ]);

  return <Render />;
};

export default SkeletonPlaceholder;
