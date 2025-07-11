import { Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/auth/UserOnly";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => {
            // We need to preserve the ref and pass through props
            const { children, onPress, style, accessibilityLabel, testID } =
              props;
            return (
              <Pressable
                onPress={onPress}
                style={style}
                accessibilityLabel={accessibilityLabel}
                testID={testID}
                android_ripple={null}
              >
                {children}
              </Pressable>
            );
          },
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 75,
          },
          tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books"
          options={{
            title: "Books",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "book" : "book-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "create" : "create-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;
