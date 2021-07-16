import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const FirstExample = ({}) => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item
      width={100}
      height={100}
      borderRadius={100}
      borderWidth={5}
      borderColor="white"
      alignSelf="center"
      position="relative"
    />
    <SkeletonPlaceholder.Item
      width={120}
      height={20}
      alignSelf="center"
      marginTop={12}
      borderRadius={4}
    />
    <SkeletonPlaceholder.Item
      width={240}
      height={20}
      alignSelf="center"
      marginTop={12}
      borderRadius={4}
    />
    <SkeletonPlaceholder.Item
      width={240}
      height={20}
      alignSelf="center"
      marginTop={12}
      borderRadius={4}
    />
  </SkeletonPlaceholder>
);

FirstExample.propTypes = {};
FirstExample.defaultProps = {};

export default FirstExample;
