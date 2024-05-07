import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../styles/color";
import { titleLeftStyle } from "../../styles/font";

export default function HeaderNav({ title, withBorder = true }) {
  const navigation = useNavigation();
  return (
    <View
      style={[styles.headerContainer, withBorder && styles.headerWithBorder]}
    >
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../../assets/chevron-left.png")} />
      </TouchableOpacity>
      {title && <Text style={[titleLeftStyle]}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerWithBorder: {
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
  backIcon: {
    width: 30,
    marginRight: 10,
    marginTop: 2,
  },
});
