import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SecondExample = ({}) =>
  Array.from({length: 2}).map((_, index) => (
    <View key={index} style={{marginBottom: 12}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={100} height={100} />
          <SkeletonPlaceholder.Item
            flex={1}
            justifyContent={'space-between'}
            marginLeft={12}>
            <SkeletonPlaceholder.Item
              width="50%"
              height={20}
            />
            <SkeletonPlaceholder.Item
              width="30%"
              height={20}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ));

SecondExample.propTypes = {};
SecondExample.defaultProps = {};

export default SecondExample;
