import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import ThemedText from "../../components/ThemedText";
import { Link, useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { showToast } from "../../utils/toast";
import PasswordEyeView from "../../components/PasswordEyeView";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const { register } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      return showToast(
        "info",
        "Register Info",
        "All input fields must be filled"
      );
    }

    try {
      await register(email, password);
      router.replace("/profile");
    } catch (error: any) {
      showToast("error", "Register Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText title={true} style={styles.title}>
          Register For an Account
        </ThemedText>

        <ThemedTextInput
          placeholder="Email"
          style={{ width: "80%", marginBottom: 20 }}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Pressable onPress={(e) => e.stopPropagation()}>
          <PasswordEyeView>
            <ThemedTextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={hidden}
              autoCorrect={false}
              autoCapitalize="none"
              style={{ width: "85%" }}
            />

            <Pressable
              onPress={() => setHidden((prev) => !prev)}
              style={{
                height: "100%",
                width: "15%",
                alignItems: "center",
                paddingTop: 17.5,
              }}
            >
              <Ionicons name={hidden ? "eye-off" : "eye"} size={20} />
            </Pressable>
          </PasswordEyeView>
        </Pressable>
        <Spacer />

        <ThemedButton onPress={handleSubmit} style={{ paddingHorizontal: 30 }}>
          <Text style={{ color: "#f2f2f2" }}>Register</Text>
        </ThemedButton>
        <Spacer height={100} />

        <Link href="/login">
          <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
