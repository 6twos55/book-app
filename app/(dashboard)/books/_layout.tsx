import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";

const BooksLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: "Book details" }}  />
    </Stack>
  );
};

export default BooksLayout;
