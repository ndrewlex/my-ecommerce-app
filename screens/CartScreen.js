import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { APP_SCREENS } from "../constants/screens";
import { CartContext } from "../contexts/CartContext";

export default function CartScreen() {
  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate(APP_SCREENS.CHECKOUT);
  };

  const { subtotal, cart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cartList}
        data={cart}
        ItemSeparatorComponent={() => <View style={styles.cartSeparator} />}
        renderItem={({ item }) => {
          return (
            <View style={styles.cartRow} key={item.id}>
              <View style={styles.cartProduct}>
                <Text style={styles.title}>
                  <Text className={styles.quantity}>{item.quantity}</Text> x{" "}
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {cart.length > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.subtotal}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text>$ {subtotal}</Text>
          </View>
          <Button
            title="Checkout"
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            Checkout
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  cartList: {
    padding: 15,
    maxHeight: Dimensions.get("screen").height - 270,
  },
  cartSeparator: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  cartProduct: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 16,
  },
  quantity: {
    fontWeight: "bold",
  },
  cartPrice: {
    fontSize: 14,
  },

  cartFooter: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 15,
    backgroundColor: "white",
    height: 100,
  },

  subtotal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  subtotalText: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },

  checkoutButton: {
    textTransform: "capitalize",
  },
});
