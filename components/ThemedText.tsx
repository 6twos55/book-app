import {
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

interface ThemeTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  title?: boolean;
  sub?: boolean;
}

const ThemedText = ({ style, title = false, sub = false, ...props }: ThemeTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const textColor = title ? theme.title : theme.text;

  return (
    <Text
      style={[
        { color: textColor, fontSize: 16 },
        title && { fontSize: 18 },
        sub && { fontSize: 14 },
        style
      ]}
      {...props}
    />
  );
};

export default ThemedText;
