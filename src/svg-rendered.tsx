import React from 'react';
import {Rect} from 'react-native-svg';

import {Measurements} from './types';

type SvgRendererProps = {
  measurements: Measurements[];
  defaultBorderRadius: number;
};
const SvgRenderer = ({measurements, defaultBorderRadius = 0}: SvgRendererProps) => {
  return (
    <>
      {measurements.map(({pageX, pageY, width, height, styles}, index) => {
        return (
          <Rect
            key={index}
            fillOpacity={1}
            x={pageX}
            y={pageY}
            width={width}
            height={height}
            rx={Number(styles?.borderRadius) || defaultBorderRadius}
            fill="white"
            stroke={styles?.borderColor}
            strokeWidth={styles?.borderWidth}
          />
        );
      })}
    </>
  );
};

export default SvgRenderer;
