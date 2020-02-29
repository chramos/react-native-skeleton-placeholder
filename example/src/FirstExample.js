import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const FirstExample = ({}) => (
  <View style={{marginHorizontal: -20}}>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item width="100%" height={140} />
      <SkeletonPlaceholder.Item
        width={100}
        height={100}
        borderRadius={100}
        borderWidth={5}
        borderColor="white"
        alignSelf="center"
        position="relative"
        top={-50}
      />
      <SkeletonPlaceholder.Item width={120} height={20} alignSelf="center" />
      <SkeletonPlaceholder.Item
        width={240}
        height={20}
        alignSelf="center"
        marginTop={12}
      />
    </SkeletonPlaceholder>
  </View>
);

FirstExample.propTypes = {};
FirstExample.defaultProps = {};

export default FirstExample;
