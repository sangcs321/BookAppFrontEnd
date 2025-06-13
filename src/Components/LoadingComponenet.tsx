import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Constants/Colors';

const LoadingComponenet = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.tint} size={'large'} />
    </View>
  );
};

export default LoadingComponenet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
