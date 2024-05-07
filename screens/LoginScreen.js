import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { APP_SCREENS } from "../constants/screens";
import { AuthContext } from "../contexts/AuthContext";
import { color } from "../styles/color";
import { titleCenterStyle } from "../styles/font";
import { textInputStyle } from "../styles/textInput";

const initialForm = {
  email: "",
  password: "",
};
export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [formValue, setFormValue] = useState(initialForm);
  const handleChangeEmail = (text) => {
    setFormValue((curr) => ({ ...curr, email: text }));
  };
  const handleChangePassword = (text) => {
    setFormValue((curr) => ({ ...curr, password: text }));
  };

  const handleLogin = async () => {
    setLoading(true);
    if (await login(formValue)) {
      setFormValue(initialForm);
      navigation.navigate(APP_SCREENS.AUTH);
    }
    setLoading(false);
  };

  const goToSignUp = () => {
    navigation.navigate(APP_SCREENS.SIGN_UP);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={titleCenterStyle}>Ecommerce</Text>
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangeEmail}
        value={formValue.email}
        placeholder="Enter email address"
        placeholderTextColor={color.secondaryText}
      />
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangePassword}
        value={formValue.password}
        placeholder="Enter password"
        textContentType="password"
        secureTextEntry={true}
        placeholderTextColor={color.secondaryText}
      />
      <Button
        title="Sign in"
        onPress={handleLogin}
        containerStyle={styles.signInButton}
        disabled={loading}
      />
      <Text style={styles.footerSection}>
        Don't have account?{" "}
        <Text style={{ color: color.primary }} onPress={goToSignUp}>
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    marginVertical: 10,
  },
  signInButton: {
    marginVertical: 20,
  },
  footerSection: { marginVertical: 20, textAlign: "center" },
});
