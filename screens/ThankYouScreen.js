import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { APP_SCREENS } from "../constants/screens";
import { CartContext } from "../contexts/CartContext";
import { color } from "../styles/color";

export default function ThankyouScreen() {
  const navigation = useNavigation();
  const { resetCart } = useContext(CartContext);

  const goBackHome = () => {
    resetCart();
    navigation.navigate(APP_SCREENS.ORDERS);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Thank you for your order</Text>
      <Button onPress={goBackHome} title="Back to order"></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: color.primaryText,
    marginVertical: 20,
    fontSize: 18,
  },
});
