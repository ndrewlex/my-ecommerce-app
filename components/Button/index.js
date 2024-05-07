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
  children,
  ...props
}) {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[defaultStyles.base, defaultStyles[`${size}`], styles]}
        {...props}
      >
        {title ? (
          <Text
            style={[defaultStyles.baseContent, defaultStyles[`${size}Button`]]}
          >
            {title}
          </Text>
        ) : (
          <View
            style={[defaultStyles.baseContent, defaultStyles[`${size}Button`]]}
          >
            {children}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  base: {
    backgroundColor: color.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  baseContent: {
    color: color.white,
    textAlign: "center",
    fontWeight: 600,
  },

  md: {
    height: 57,
    padding: 16,
  },

  mdButton: {
    fontSize: 15,
  },

  sm: {
    padding: 8,
    height: 32,
  },

  smButton: {
    fontSize: 12,
  },
});
