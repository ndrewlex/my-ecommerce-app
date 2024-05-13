import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNav from "../components/HeaderNav";
import { AuthContext } from "../contexts/AuthContext";
import { getTransactions } from "../services/firebase/transactions";
import { color } from "../styles/color";

export default function OrderScreen() {
  const { user } = useContext(AuthContext);
  const [myOrder, setMyOrder] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = useCallback(async () => {
    const res = await getTransactions(user.uid);

    if (res.data) {
      setMyOrder(res.data);
    }
  }, [user.uid]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      fetchTransactions();
      return () => {};
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [fetchTransactions]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="My Order" />

      <FlatList
        data={myOrder}
        style={styles.cardList}
        contentContainerStyle={[
          styles.cardListContent,
          myOrder.length === 0 && styles.emptyList,
        ]}
        columnWrapperStyle={styles.cardListColumn}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>My Order is empty</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const formatDate = item.timestamp.toDate().toDateString();

          return (
            <View style={styles.card} key={item.id}>
              <View style={styles.cartHeader}>
                <Text style={styles.orderTitle}>{item.id}</Text>
                <Text style={styles.textLabel}>{formatDate}</Text>
              </View>

              <View style={styles.cardSeparator} />

              <View style={styles.cardContentRow}>
                <Text style={styles.textLabel}>Status</Text>
                <Text style={styles.textMain}>{item.status}</Text>
              </View>
              <View style={styles.cardContentRow}>
                <Text style={styles.textLabel}>Items</Text>
                <Text style={styles.textMain}>{item.cart.length} Items</Text>
              </View>
              <View style={styles.cardContentRow}>
                <Text style={styles.textLabel}>Price</Text>
                <Text style={[styles.textMain, styles.textBlue]}>
                  ${item.totalPrice}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardHeader: {
    gap: 12,
  },

  cardList: {
    paddingHorizontal: 15,
  },

  cardListContent: {
    paddingVertical: 15,
    gap: 12,
  },

  card: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: color.border,
    padding: 12,
    gap: 12,
  },

  orderTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: color.blue,
    fontWeight: "bold",
  },

  cardContentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  textLabel: {
    color: color.gray2,
    fontSize: 14,
  },
  textMain: {
    fontSize: 14,
  },
  textBlue: {
    color: color.primary,
  },
  emptyList: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  emptyListText: {
    fontSize: 18,
  },

  cardSeparator: {
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
});
