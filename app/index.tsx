import { Image, StyleSheet, Text } from "react-native";
import Logo from "../assets/images/logo.png";
import { Link, useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";

import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";
import ThemedLoader from "../components/ThemedLoader";
import ThemedButton from "../components/ThemedButton";

const Home = () => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  return (
    <ThemedView safe style={styles.container}>
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer height={20} />

      <Image source={Logo} style={{ height: 130, width: 130 }} />
      <Spacer height={30} />

      <ThemedText style={styles.title} title={true}>
        Book Keeper
      </ThemedText>

      <Spacer height={10} />
      <ThemedText>Reading List App</ThemedText>
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />

      {!authChecked && !user ? (
        <ThemedLoader bare />
      ) : user === null ? (
        <>
          <ThemedText>You're not authenticated</ThemedText>
          <Spacer height={20} />

          <ThemedButton onPress={() => router.push("/login")}>
            <Text style={{ color: "#fff" }}>Sign back in</Text>
          </ThemedButton>
        </>
      ) : (
        user !== null && (
          <Link href="/books" style={styles.link}>
            <ThemedText>Continue reading</ThemedText>
          </Link>
        )
      )}
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
