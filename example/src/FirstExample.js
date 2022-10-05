import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const FirstExample = ({}) => (
  <SkeletonPlaceholder borderRadius={4}>
    <SkeletonPlaceholder.Item
      width={100}
      height={100}
      borderRadius={100}
      alignSelf="center"
      position="relative"
    />
    <SkeletonPlaceholder.Item
      width={120}
      height={20}
      alignSelf="center"
      marginTop={12}
    />
    <SkeletonPlaceholder.Item
      width={240}
      height={20}
      alignSelf="center"
      marginTop={12}
    />
    <SkeletonPlaceholder.Item
      width={240}
      height={20}
      alignSelf="center"
      marginTop={12}
    />
  </SkeletonPlaceholder>
);

FirstExample.propTypes = {};
FirstExample.defaultProps = {};

export default FirstExample;
