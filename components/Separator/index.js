import React from "react";
import { StyleSheet, View } from "react-native";
import { color } from "../../styles/color";

export default function Separator({ styles }) {
  return <View style={[defaultStyles.separator, styles]} />;
}

const defaultStyles = StyleSheet.create({
  separator: {
    borderColor: color.border,
    borderBottomWidth: 1,
  },
});
