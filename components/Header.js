import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Header = () => {
  //   const navigation = useNavigation();
  const handleBack = () => {};
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.appDrawerContainer} onPress={handleBack}>
        <Image
          source={require("../assets/back-icon.png")}
          style={styles.appBackIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 28,
    color: "#000000",
  },
});
