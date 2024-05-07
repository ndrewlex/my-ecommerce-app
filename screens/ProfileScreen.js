import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import HeaderNav from "../components/HeaderNav";
import { APP_SCREENS } from "../constants/screens";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    if (await logout()) {
      navigation.navigate(APP_SCREENS.LOGIN);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Profile" />
      <View style={styles.content}>
        <Text>My Profile</Text>
        <View>
          <Text>Hi, {user.email}</Text>
        </View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
});
