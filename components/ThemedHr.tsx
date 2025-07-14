import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

const ThemedHr = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return <View style={[styles.horizontalRule, style]} />;
};

const styles = StyleSheet.create({
  horizontalRule: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    width: '100%',
  },
});

export default ThemedHr;
