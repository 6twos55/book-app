import { StyleProp, useColorScheme, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";

interface PasswordEyeViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  safe?: boolean;
}

const PasswordEyeView = ({ style, ...props }: PasswordEyeViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        {
          backgroundColor: theme.uiBackground,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          paddingRight: 15,
          marginBottom: 20,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default PasswordEyeView;
