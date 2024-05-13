import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { APP_SCREENS } from "../constants/screens";
import getProducts from "../services/products";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await getProducts();
    if (res.data) {
      setProducts(res.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductDetails = (item) => {
    navigation.navigate(APP_SCREENS.PRODUCT_DETAILS, { id: item.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        style={styles.productList}
        renderItem={({ item }) => (
          <ProductCard item={item} handleProductClick={handleProductDetails} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productList: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
});
