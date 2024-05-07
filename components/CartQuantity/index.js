import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { color } from "../../styles/color";
import Button from "../Button";

import Ionicons from "@expo/vector-icons/AntDesign";

const initStyle = (size) => {
  if (size === "sm") {
    return {
      iconSize: 16,
      textQtyStyles: [styles.textQty, styles.textQtySm],
    };
  } else {
    return {
      iconSize: 24,
      textQtyStyles: [styles.textQty, styles.textQtyMd],
    };
  }
};
export default function CartQuantity({
  size = "md",
  product,
  onAddCart,
  onDeleteCart,
}) {
  const handleAddCart = () => {
    onAddCart(product);
  };

  const handleDeleteCart = () => {
    onDeleteCart(product);
  };

  const { iconSize, textQtyStyles } = useMemo(() => initStyle(size), [size]);
  return (
    <View style={styles.cartQuantity}>
      <Button
        size={size}
        onPress={handleDeleteCart}
        containerStyle={styles.buttonContainer}
        styles={[styles.button, styles.minusButton]}
      >
        <Ionicons name="minus" color={color.white} size={iconSize} />
      </Button>
      <Text style={textQtyStyles}>{product.quantity}</Text>
      <Button
        size={size}
        onPress={handleAddCart}
        containerStyle={styles.buttonContainer}
        styles={[styles.button, styles.addButton]}
      >
        <Ionicons name="plus" color={color.white} size={iconSize} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cartQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textQtyMd: {
    fontSize: 16,
  },
  textQtySm: {
    fontSize: 14,
  },
  textQty: {
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
    textAlign: "center",
    justifyContent: "center",
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
