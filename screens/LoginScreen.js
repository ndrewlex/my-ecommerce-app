import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_SCREENS } from "../constants/screens";
import { AuthContext } from "../contexts/AuthContext";

const initialForm = {
  email: "",
  password: "",
};
export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [formValue, setFormValue] = useState(initialForm);
  const handleChangeUsername = (text) => {
    setFormValue((curr) => ({ ...curr, email: text }));
  };
  const handleChangePassword = (text) => {
    setFormValue((curr) => ({ ...curr, password: text }));
  };

  const handleLogin = async () => {
    const res = await login(formValue);
    if (res.isSuccess) {
      navigation.navigate(APP_SCREENS.AUTH);
      setFormValue(initialForm);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Ecommerce</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeUsername}
        value={formValue.username}
        placeholder="Enter email address"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangePassword}
        value={formValue.password}
        placeholder="Enter password"
        textContentType="password"
        secureTextEntry={true}
      />
      <View style={styles.loginButton}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  loginButton: {
    marginVertical: 20,
  },
});
