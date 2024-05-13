import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import CartQuantity from "../components/CartQuantity";
import HeaderNav from "../components/HeaderNav";
import { CartContext, convertProductToCart } from "../contexts/CartContext";
import { getProductById } from "../services/products";
import { color } from "../styles/color";

export default function ProductDetailsScreen({ route }) {
  const { addCartItem, deleteCartItem, cart } = useContext(CartContext);
  const [product, setProduct] = useState();
  const productId = route.params.id;

  const [refreshing, setRefreshing] = useState(false);

  const selectedProduct = cart.find((curr) => curr.itemId === productId);

  const fetchProductById = async () => {
    const res = await getProductById(productId);
    if (res.data) {
      setProduct(res.data);
    }
  };

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProductById(productId);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addCartItem(convertProductToCart(product));
    }
  };

  const handleDeleteCart = () => {
    deleteCartItem(convertProductToCart(product));
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav withBorder={false} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product?.image }} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.priceText}>${product?.price}</Text>
          <Text style={styles.titleText}>{product?.title}</Text>

          <Text style={styles.titleDesc}>Description</Text>
          <Text stlye={styles.textDesc}>{product?.description}</Text>
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        {selectedProduct?.quantity ? (
          <CartQuantity
            product={selectedProduct}
            onAddCart={handleAddToCart}
            onDeleteCart={handleDeleteCart}
            disabled={refreshing || !product?.price}
          />
        ) : (
          <Button
            title="Add to cart"
            onPress={handleAddToCart}
            disabled={refreshing || !product?.price}
          />
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
