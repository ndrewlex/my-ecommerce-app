import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { APP_SCREENS } from "../constants/screens";
import { registerUser } from "../services/firebase/auth";
import { color } from "../styles/color";
import { titleCenterStyle } from "../styles/font";
import { textInputStyle } from "../styles/textInput";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};
export default function SignupScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState(initialForm);

  const handleChangeFirstName = (text) => {
    setFormValue((curr) => ({ ...curr, firstName: text }));
  };

  const handleChangeLastName = (text) => {
    setFormValue((curr) => ({ ...curr, lastName: text }));
  };

  const handleChangeEmail = (text) => {
    setFormValue((curr) => ({ ...curr, email: text }));
  };
  const handleChangePassword = (text) => {
    setFormValue((curr) => ({ ...curr, password: text }));
  };

  const handleSignup = async () => {
    setLoading(true);
    const res = await registerUser(formValue);
    if (res.isSuccess) {
      setFormValue(initialForm);
      navigation.navigate(APP_SCREENS.LOGIN);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={titleCenterStyle}>Sign Up</Text>
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangeFirstName}
        value={formValue.firstName}
        placeholder="Enter first name"
      />
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangeLastName}
        value={formValue.lastName}
        placeholder="Enter last name"
      />
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangeEmail}
        value={formValue.email}
        placeholder="Enter email address"
      />
      <TextInput
        style={[textInputStyle.base, styles.input]}
        onChangeText={handleChangePassword}
        value={formValue.password}
        placeholder="Enter password"
        textContentType="password"
        secureTextEntry={true}
      />

      <Button
        title="Sign up"
        onPress={handleSignup}
        disabled={loading}
        containerStyle={styles.signupButton}
      />
      <Text style={styles.footerSection}>
        Have a account?{" "}
        <Text
          style={{ color: color.primary }}
          onPress={() => navigation.goBack()}
        >
          Sign in
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    flex: 1,
  },
  input: {
    marginVertical: 10,
  },
  signupButton: {
    marginVertical: 20,
  },
  footerSection: { marginVertical: 20, textAlign: "center" },
});
