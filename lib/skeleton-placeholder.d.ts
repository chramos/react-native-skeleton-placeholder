import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type SkeletonPlaceholderProps = {
    /**
     * Determines component's children.
     */
    children: JSX.Element;
    /**
     * Determines the color of placeholder.
     */
    backgroundColor?: string;
    /**
     * Determines the highlight color of placeholder.
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
    /**
     * Determines width of the highlighted area
     */
    shimmerWidth?: number;
};
declare type SkeletonPlaceholderItemProps = ViewStyle & {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};
declare const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> & {
    Item: React.FC<SkeletonPlaceholderItemProps>;
};
export default SkeletonPlaceholder;
//# sourceMappingURL=skeleton-placeholder.d.ts.map