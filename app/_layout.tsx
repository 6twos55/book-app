import "react-native-get-random-values";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";
import Toast from "react-native-toast-message";
import { toastConfig } from "../utils/toastConfig";


const RootLayout = () => {
  return (
    <UserProvider>
      <BooksProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(dashboard)" />
        </Stack>
        <Toast config={toastConfig} />
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;
