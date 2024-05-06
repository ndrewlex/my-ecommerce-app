import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_SCREENS } from "../constants/screens";
import { registerUser } from "../services/firebase/auth";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};
export default function SignupScreen() {
  const navigation = useNavigation();
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
    const res = await registerUser(formValue);
    if (res.isSuccess) {
      navigation.navigate(APP_SCREENS.LOGIN);
      setFormValue(initialForm);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>Ecommerce</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeFirstName}
        value={formValue.firstName}
        placeholder="Enter first name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangeLastName}
        value={formValue.lastName}
        placeholder="Enter last name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangeEmail}
        value={formValue.email}
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
      <View style={styles.signupButton}>
        <Button title="Sign up" onPress={handleSignup} />
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
  signupButton: {
    marginVertical: 20,
  },
});
