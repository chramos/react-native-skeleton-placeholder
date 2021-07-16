import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SecondExample = ({}) =>
  Array.from({length: 3}).map((_, index) => (
    <View key={index} style={{marginBottom: 12}}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={100} height={100} borderRadius={4} />
          <SkeletonPlaceholder.Item
            flex={1}
            justifyContent={'space-between'}
            marginLeft={12}>
            <SkeletonPlaceholder.Item
              width="50%"
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="30%"
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={20}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ));

SecondExample.propTypes = {};
SecondExample.defaultProps = {};

export default SecondExample;
