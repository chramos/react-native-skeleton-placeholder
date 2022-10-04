import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, ScrollView} from 'react-native';
import FirstExample from './src/FirstExample';
import SecondExample from './src/SecondExample';
import ThirdExample from './src/ThirdExample';

const App = () => (
  <SafeAreaView style={style.container}>
    <ScrollView style={style.scrollView}>
      <Text style={style.heading}>First example</Text>
      <FirstExample />
      <View style={style.separator} />
      <Text style={style.heading}>Second example</Text>
      <SecondExample />
      <View style={style.separator} />
      <Text style={style.heading}>Third example</Text>
      <ThirdExample />
    </ScrollView>
  </SafeAreaView>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 24,
  },
  separator: {
    height: 16,
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
