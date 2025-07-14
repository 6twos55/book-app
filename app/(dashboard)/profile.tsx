import {
  Appearance,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
} from "react-native";
import { useUser } from "../../hooks/useUser";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedHr from "../../components/ThemedHr";
import { Ionicons } from "@expo/vector-icons";
import { useBook } from "../../hooks/useBook";
import ThemedCard from "../../components/ThemedCard";

const Profile = () => {
  const { user, logout } = useUser();
  const { networkStatus } = useBook();
  const colorScheme = useColorScheme();

  return (
    <ThemedView safe style={styles.container}>
      <Spacer height={20} />

      <ThemedView>
        <Ionicons
          size={140}
          name="person-circle"
          style={
            colorScheme === "dark"
              ? { color: "#4e4b59ff" }
              : { color: "#b3b1baff" }
          }
        />

        <ThemedText title={true} style={styles.heading}>
          {user?.email}
        </ThemedText>
      </ThemedView>
      <Spacer height={35} />

      <ThemedButton
        onPress={logout}
        style={{ paddingVertical: 10, paddingHorizontal: 30 }}
      >
        <Text style={{ color: "#f2f2f2" }}>Sign out</Text>
      </ThemedButton>
      <Spacer />
      <Spacer height={20} />

      <ThemedCard style={{ width: "100%", borderRadius: 20, paddingTop: 8 }}>
        <ThemedCard style={styles.set}>
          <ThemedText style={styles.heading}>
            Dark mode
          </ThemedText>

          <Switch
            value={colorScheme === "dark"}
            onValueChange={() =>
              Appearance.setColorScheme(
                colorScheme === "light" ? "dark" : "light"
              )
            }
          />
        </ThemedCard>

        <ThemedHr style={{ marginTop: 5, marginBottom: 15 }} />

        <ThemedCard style={styles.set}>
          <ThemedText style={styles.heading}>
            Network status
          </ThemedText>

          <ThemedText>{networkStatus ? "Online" : "Offline"}</ThemedText>
        </ThemedCard>
      </ThemedCard>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  set: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
