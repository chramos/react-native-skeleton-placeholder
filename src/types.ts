import {ViewStyle} from 'react-native';

export type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
} & Partial<Omit<ViewStyle, 'width' | 'height'>>;
