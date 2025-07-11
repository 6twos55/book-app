import { Pressable, PressableProps, StyleProp, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

import { ViewStyle } from "react-native";

interface ThemedButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

const ThemedButton = ({ style, ...props }: ThemedButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    />
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
