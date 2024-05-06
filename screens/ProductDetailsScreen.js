import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../contexts/CartContext";

export default function ProductDetailsScreen({ route }) {
  const { addCartItem, deleteCartItem, cart } = useContext(CartContext);
  const navigation = useNavigation();
  const product = route.params.item;

  const selectedProduct = cart.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    addCartItem(product);
  };

  const handleDeleteCart = () => {
    deleteCartItem(product);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Back</Text>
        </TouchableOpacity>
        <Image source={{ uri: product.image }} style={styles.coverImage} />
      </View>
      <View style={styles.contentContainer}>
        {/* text container */}
        <View style={styles.textContainer}>
          <Text style={styles.fontText}>{product.title}</Text>
          <Text style={styles.fontText}>${product.price}</Text>
        </View>
        {/* desc container */}
        <View style={styles.descContainer}>
          <Text>{product.description}</Text>
        </View>
        {/* cart button */}

        {selectedProduct?.quantity ? (
          <View style={styles.cartAction}>
            <TouchableOpacity style={styles.button} onPress={handleDeleteCart}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Text>{selectedProduct.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cartAction}>
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    fontSize: 16,
  },
  imageContainer: {
    height: 300,
    width: "100%",
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444444",
    color: "#444444",
  },
  cartAction: {
    flexDirection: "row",
    flex: 1,
    marginTop: 20,
    height: 40,
  },
  button: {
    flex: 1,
    backgroundColor: "#E96E6E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    height: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  descContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
});
