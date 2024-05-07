import { StyleSheet } from "react-native";
import { color } from "./color";

export const textStyle = StyleSheet.create({
  base: {
    fontSize: 14,
    color: color.primaryText,
  },
});

export const titleCenterStyle = StyleSheet.compose(textStyle.base, {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  paddingVertical: 10,
});

export const titleLeftStyle = StyleSheet.compose(textStyle.base, {
  fontSize: 20,
  fontWeight: "bold",
  paddingVertical: 10,
});
