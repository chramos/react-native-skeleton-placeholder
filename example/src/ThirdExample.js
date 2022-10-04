import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ThirdExample = () => {
  const renderView = (skeletonEnabled: boolean) => {
    return (
      <SkeletonPlaceholder borderRadius={4} enabled={skeletonEnabled}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('./assets/react-native-icon.png')}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lorem ipsum</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor.
            </Text>
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View>
      {renderView(false)}
      {renderView(true)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 65,
    height: 65,
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default ThirdExample;
