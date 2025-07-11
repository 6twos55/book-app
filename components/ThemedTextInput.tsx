import {
  StyleProp,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { Colors } from "../constants/Colors";

import { ViewStyle } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

const ThemedTextInput = ({ style, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TextInput
      placeholderTextColor={theme.placeholder}
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
        },
        props.multiline && { textAlignVertical: "top" },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedTextInput;
