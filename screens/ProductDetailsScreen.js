import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import CartQuantity from "../components/CartQuantity";
import HeaderNav from "../components/HeaderNav";
import { CartContext } from "../contexts/CartContext";
import { color } from "../styles/color";

export default function ProductDetailsScreen({ route }) {
  const { addCartItem, deleteCartItem, cart } = useContext(CartContext);
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
      <HeaderNav withBorder={false} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.priceText}>${product.price}</Text>
          <Text style={styles.titleText}>{product.title}</Text>

          <Text style={styles.titleDesc}>Description</Text>
          <Text stlye={styles.textDesc}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        {selectedProduct?.quantity ? (
          <CartQuantity
            product={selectedProduct}
            onAddCart={handleAddToCart}
            onDeleteCart={handleDeleteCart}
          />
        ) : (
          <Button title="Add to cart" onPress={handleAddToCart} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  imageContainer: {
    height: 300,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    flex: 1,
    borderTopColor: color.border,
    borderTopWidth: 1,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 18,
  },
  titleDesc: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  textDesc: {
    fontSize: 18,
  },
});
