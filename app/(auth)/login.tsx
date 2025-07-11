import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { showToast } from "../../utils/toast";
import { Ionicons } from "@expo/vector-icons";
import PasswordEyeView from "../../components/PasswordEyeView";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      return showToast("info", "Login Info", "All input fields must be filled");
    }

    try {
      await login(email, password);
      router.replace("/profile");
    } catch (error: any) {
      showToast("error", "Login Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>

        <ThemedTextInput
          placeholder="Email"
          style={{ width: "80%", marginBottom: 20 }}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <PasswordEyeView>
          <ThemedTextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={hidden}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Pressable onPress={() => setHidden((prev) => !prev)}>
            <Ionicons
              name={hidden ? "eye-off" : "eye"}
              size={20}
            />
          </Pressable>
        </PasswordEyeView>
        <Spacer />

        <ThemedButton onPress={handleSubmit} style={{ paddingHorizontal: 30 }}>
          <Text style={{ color: "#f2f2f2" }}>Login</Text>
        </ThemedButton>

        <Spacer height={100} />

        <Link href="/register">
          <ThemedText style={{ textAlign: "center" }}>
            Register instead
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
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
