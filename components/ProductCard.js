import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../styles/color";

const ProductCard = ({ item, handleProductClick }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={4} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    aspectRatio: 165 / 282,
    borderWidth: 1,
    borderColor: color.border,
  },

  imageContainer: {
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  image: {
    objectFit: "contain",
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    borderTopColor: color.border,
    borderTopWidth: 1,
    padding: 10,
    height: 125,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.primaryText,
  },
  price: {
    fontSize: 16,
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  faviorate: {
    height: 20,
    width: 20,
  },
});
