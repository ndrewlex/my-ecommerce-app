import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../styles/color";

/**
 * Size:
 *  - sm
 *  - md
 *  - lg
 */

export default function Button({
  title,
  size = "md",
  styles = {},
  containerStyle = {},
  ...props
}) {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[defaultStyles[`${size}Button`], styles]}
        {...props}
      >
        <Text style={[defaultStyles[`${size}ButtonText`]]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  mdButton: {
    padding: 16,
    height: 57,
    backgroundColor: color.primary,
    borderRadius: 5,
  },
  mdButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: color.white,
    fontWeight: 600,
  },
});
