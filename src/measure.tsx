import React, {useRef} from 'react';
import {LayoutRectangle, Text, View, ViewProps, ViewStyle} from 'react-native';

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
          if (child.props?.children && typeof child?.props?.children !== 'string') {
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

          const style = child.props?.style ?? child.props;
          const parentRef = React.createRef<View>();
          const ref = React.createRef<Text>();

          return (
            <View ref={parentRef}>
              {React.cloneElement(child, {
                ...(child.props ?? {}),
                style: {
                  ...((child.props.style ?? {}) as ViewStyle),
                  backgroundColor: defaultBackgroundColor,
                  opacity: 0, // when using other components other than View, the layout appears for a fraction of seconds, so I think this is a good workaround
                },
                /**
                 * If the element is a text, we need to measure the text
                 */
                ...(typeof child.props.children === 'string'
                  ? {
                      ref,
                      onTextLayout: (event) => {
                        /**
                         * Mark this element as measured
                         */
                        measuredElements.current = measuredElements.current + 1;

                        parentRef.current?.measure((x, y, w, h, px, py) => {
                          event.nativeEvent.lines.forEach((line) => {
                            callback({
                              x: px + line.x,
                              y: py + line.y,
                              width: line.width,
                              height: line.ascender,
                              ...((style ?? {}) as ViewStyle),
                            });
                          });
                        });
                      },
                    }
                  : {
                      onLayout: (event) => {
                        /**
                         * Mark this element as measured
                         */
                        measuredElements.current = measuredElements.current + 1;

                        parentRef?.current?.measure((x, y, w, h, px, py) => {
                          const {width, height} = event.nativeEvent.layout;
                          callback({
                            x: px,
                            y: py,
                            width,
                            height,
                            ...((style ?? {}) as ViewStyle),
                          });
                        });
                      },
                    }),
              })}
            </View>
          );
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
                {
                  x: containerX,
                  y: containerY,
                  width: containerWidth,
                  height: containerHeight,
                },
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
