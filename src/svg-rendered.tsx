import React from 'react';
import {Rect} from 'react-native-svg';

import {RectType} from './types';

type SvgRendererProps = {
  rects: RectType[];
  defaultBorderRadius: number;
};
const SvgRenderer = ({rects, defaultBorderRadius = 0}: SvgRendererProps) => {
  return (
    <>
      {rects.map(({x, y, width, height, ...styles}, index) => {
        return (
          <Rect
            key={index}
            fillOpacity={1}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={Number(styles?.borderRadius) || defaultBorderRadius}
            fill="white" //  it's important to make the svg mask to work
            stroke={styles?.borderColor}
            strokeWidth={styles?.borderWidth}
          />
        );
      })}
    </>
  );
};

export default SvgRenderer;
