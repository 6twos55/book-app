import { Image, StyleSheet } from "react-native";
import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "expo-router";
import { useUser } from "../hooks/useUser";

import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";
import ThemedLoader from "../components/ThemedLoader";

const Home = () => {
  const { user, authChecked } = useUser();

  return (
    <ThemedView style={styles.container}>
      <Image source={Logo} style={{ height: 130, width: 130 }} />
      <Spacer height={20} />

      <ThemedText style={styles.title} title={true}>
        The Number 1
      </ThemedText>

      <Spacer height={10} />
      <ThemedText>Reading List App</ThemedText>
      <Spacer />

      {!authChecked && !user ? (
        <ThemedLoader bare />
      ) : user === null ? (
        <>
          <Link href="/login" style={styles.link}>
            <ThemedText>Login</ThemedText>
          </Link>

          <Link href="/register" style={styles.link}>
            <ThemedText>Register</ThemedText>
          </Link>
        </>
      ) : (
        user !== null && (
          <Link href="/profile" style={styles.link}>
            <ThemedText>Your Profile</ThemedText>
          </Link>
        )
      )}

      {/* 
        Make screen look better
      */}

    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
