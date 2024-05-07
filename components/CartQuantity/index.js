import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color } from "../../styles/color";
import Button from "../Button";

export default function CartQuantity({ product, onAddCart, onDeleteCart }) {
  const handleAddCart = () => {
    onAddCart(product);
  };

  const handleDeleteCart = () => {
    onDeleteCart(product);
  };

  return (
    <View style={styles.cartQuantity}>
      <Button
        onPress={handleDeleteCart}
        title="-"
        containerStyle={styles.buttonContainer}
        styles={[styles.button, styles.minusButton]}
      />
      <Text style={[styles.quantityInput]}>{product.quantity}</Text>
      {/* <Text style={styles.totalQuantity}>{product.quantity}</Text> */}
      <Button
        onPress={handleAddCart}
        title="+"
        containerStyle={styles.buttonContainer}
        styles={[styles.button, styles.addButton]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: color.border,
    height: "100%",
    textAlign: "center",
    verticalAlign: "middle",
    margin: "auto",
    flex: 1,
    fontWeight: "bold",
    borderRadius: 0,
  },
  buttonContainer: {
    width: 100,
  },
  button: {
    borderRadius: 0,
  },
  addButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  minusButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
