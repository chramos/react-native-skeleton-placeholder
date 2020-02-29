import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import FirstExample from './src/FirstExample';
import SecondExample from './src/SecondExample';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const App = ({}) => (
  <SafeAreaView style={style.container}>
    <Text style={style.heading}>First example</Text>
    <Test />
    <View style={style.separator} />

    <Text style={style.heading}>Second example</Text>
    <SecondExample />
  </SafeAreaView>
);

const Test = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  separator: {
    height: 40,
  },
  heading: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginVertical: 20,
    color: '#303030',
    textAlign: 'center',
  },
});

App.propTypes = {};
App.defaultProps = {};

export default App;
