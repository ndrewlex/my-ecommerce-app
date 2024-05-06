import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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
    navigation.navigate(APP_SCREENS.PRODUCT_DETAILS, { item });
  };

  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard item={item} handleProductClick={handleProductDetails} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
