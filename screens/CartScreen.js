import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import CartQuantity from "../components/CartQuantity";
import HeaderNav from "../components/HeaderNav";
import { APP_SCREENS } from "../constants/screens";
import { CartContext } from "../contexts/CartContext";
import { color } from "../styles/color";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function CartScreen() {
  const navigation = useNavigation();
  const {
    subtotal,
    cart,
    addCartItem,
    deleteCartItem,
    fetchUserData,
    checkoutCart,
  } = useContext(CartContext);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      fetchUserData();
      return () => {};
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [fetchUserData]);

  const goBackHome = () => navigation.navigate(APP_SCREENS.HOME);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Cart" />

      <View style={styles.cartList}>
        <FlatList
          data={cart}
          contentContainerStyle={cart.length === 0 && styles.cartListEmpty}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.itemId}
          ListEmptyComponent={() => (
            <View style={styles.cartListEmpty}>
              <Text style={styles.cartListEmptyText}>Cart is empty</Text>
              <Button onPress={goBackHome} title="Go shopping"></Button>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <View style={styles.cartRow} key={item.id}>
                <View style={styles.cartColImage}>
                  <Image
                    source={{ uri: item.itemImage }}
                    style={styles.productImage}
                  />
                </View>

                <View style={styles.cartColInfo}>
                  <Text
                    style={styles.productTitle}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                  >
                    {item.itemTitle}
                  </Text>
                  <View
                    style={{
                      maxWidth: 150,
                    }}
                  >
                    <CartQuantity
                      size="sm"
                      onAddCart={addCartItem}
                      onDeleteCart={deleteCartItem}
                      product={item}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      {cart.length > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.subtotal}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text>$ {subtotal}</Text>
          </View>
          <Button
            title="Checkout"
            onPress={checkoutCart}
            containerStyle={{ flex: 1 }}
          >
            Checkout
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartList: {
    height: SCREEN_HEIGHT * 0.63,
    marginVertical: 10,
  },
  cartListEmpty: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  cartListEmptyText: {
    fontSize: 18,
  },
  cartSeparator: {
    height: 1,
    backgroundColor: "black",
    width: "100%",
  },
  cartRow: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.border,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },

  cartColInfo: {
    flex: 1,
    marginRight: 10,
    borderLeftColor: color.border,
    borderLeftWidth: 1,
    height: "100%",
    padding: 10,
  },

  cartColImage: {
    width: "25%",
    aspectRatio: 1,
    padding: 10,
  },

  productImage: {
    objectFit: "contain",
    flex: 1,
  },

  productTitle: {
    fontSize: 16,
    flex: 1,
    marginBottom: 10,
  },

  productQuantity: {
    fontWeight: "bold",
  },

  cartFooter: {
    borderTopColor: color.border,
    borderTopWidth: 1,
    padding: 10,
  },

  subtotal: {
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
});
