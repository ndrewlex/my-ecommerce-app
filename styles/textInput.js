import { StyleSheet } from "react-native";
import { color } from "./color";

export const textInputStyle = StyleSheet.create({
  base: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    color: color.primaryText,
    borderColor: color.border,
  },
});
