import React, {useRef} from 'react';
import {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native';

import {RectType} from './types';

type MeasureProps = {
  defaultBackgroundColor?: string;
  onComplete: (container: LayoutRectangle, rects: RectType[]) => void;
};

const Measure = ({
  children,
  onComplete,
  defaultBackgroundColor,
}: React.PropsWithChildren<MeasureProps>) => {
  const rects = useRef<RectType[]>([]);
  const totalElements = useRef(0);
  const measuredElements = useRef(0);
  const containerRef = useRef<View>(null);

  const renderRecursive = React.useCallback(
    (
      node: React.ReactNode,
      callback: (rect: RectType) => void,
      currentIndex = 0,
    ): React.ReactNode => {
      return React.Children.map(
        node,
        (child: React.ReactElement<ViewProps & {ref: React.Ref<View>}>) => {
          if (child.props.children) {
            return React.cloneElement(
              child,
              child.props,
              renderRecursive(
                child.props.children,
                callback,
                currentIndex + React.Children.count(node),
              ),
            );
          }

          /**
           * When the element doesn't have children, we can count it as a total element
           * We don't care about parent elements, only the direct children
           */

          totalElements.current = totalElements.current + 1;

          return React.cloneElement(child, {
            ...(child.props ?? {}),
            style: {
              ...((child.props.style ?? {}) as ViewStyle),
              backgroundColor: defaultBackgroundColor,
            },
            onLayout: (event) => {
              /**
               * Mark this element as measured
               */
              measuredElements.current = measuredElements.current + 1;

              callback({
                x: event.nativeEvent.layout.x,
                y: event.nativeEvent.layout.y,
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
                ...((child.props.style ?? {}) as ViewStyle),
              });
            },
          });
        },
      );
    },
    [],
  );

  /**
   * We'll render the children and measure them
   * When all the elements are measured, we'll measure the container
   */
  return (
    <View ref={containerRef}>
      {renderRecursive(children, ({x, y, width, height, ...style}) => {
        rects.current.push({x, y, width, height, ...style});
        if (measuredElements.current === totalElements.current) {
          containerRef.current?.measure(
            (containerX, containerY, containerWidth, containerHeight) => {
              onComplete(
                {x: containerX, y: containerY, width: containerWidth, height: containerHeight},
                rects.current,
              );
            },
          );
        }
      })}
    </View>
  );
};

export default Measure;
