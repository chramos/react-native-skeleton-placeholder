import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import FirstExample from './src/FirstExample';
import SecondExample from './src/SecondExample';

const App = ({}) => (
  <SafeAreaView style={style.container}>
    <Text style={style.heading}>First example</Text>
    <FirstExample />
    <View style={style.separator} />
    <Text style={style.heading}>Second example</Text>
    <SecondExample />
  </SafeAreaView>
);

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
