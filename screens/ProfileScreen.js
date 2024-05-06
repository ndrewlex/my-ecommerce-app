import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_SCREENS } from "../constants/screens";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    if (res.isSuccess) {
      navigation.navigate(APP_SCREENS.LOGIN);
    }
  };

  return (
    <SafeAreaView>
      <Text>My Profile</Text>
      <View>
        <Text>Hi, {user.email}</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
