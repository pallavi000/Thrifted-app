import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { AuthContext } from "../Context";
import axios from "axios";
import bbstyles from "../Styles";
import OrderHistory from "./OrderHistory";

export default function MyOrder({ navigation }) {
  const [items, setItems] = useState([]);
  const data = useContext(AuthContext);
  const { token } = data;
  const [loader, setLoader] = useState(true);
  const [tab, setTab] = useState("processing");
  const [delivered, setDelivered] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = React.useCallback(async () => {
    try {
      var response = await axios.get("/order/transaction", config);
      const deliveredItems = [];
      const cancelledItems = [];
      const processingItems = [];
      for (const transaction of response.data) {
        var transaction_copy = { ...transaction };

        var di = transaction_copy.orders.filter(
          (o) => o.order_status == "completed"
        );
        if (di.length) {
          deliveredItems.push({ ...transaction, orders: di });
        }

        var pi = transaction_copy.orders.filter(
          (order) => order.order_status == "processing"
        );
        if (pi.length) {
          processingItems.push({ ...transaction, orders: pi });
        }

        var ci = transaction_copy.orders.filter(
          (order) => order.order_status == "cancelled"
        );
        if (ci.length) {
          cancelledItems.push({ ...transaction, orders: ci });
        }
      }

      setItems(processingItems);

      setProcessing(processingItems);
      setDelivered(deliveredItems);
      setCancelled(cancelledItems);
      setLoader(false);
    } catch (error) {
      console.log(error.request.response);
    }
  }, []);

  const changeDate = React.useCallback((createdAt) => {
    var arr = createdAt.split("T");
    return arr[0];
  });

  const orderQuantity = React.useCallback((orders) => {
    var total = orders.reduce((total, order) => {
      return (total += order.quantity);
    }, 0);
    return total;
  });

  const toggleTab = React.useCallback((action) => {
    setTab(action);
    if (action == "delivered") {
      setItems(delivered);
    } else if (action == "processing") {
      setItems(processing);
    } else {
      setItems(cancelled);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : delivered.length == 0 &&
        processing.length == 0 &&
        cancelled.length == 0 ? (
        <OrderHistory navigation={navigation} />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={() => (
              <View style={[styles.row, { marginBottom: 30 }]}>
                <TouchableOpacity onPress={() => toggleTab("processing")}>
                  <Text
                    style={
                      tab == "processing"
                        ? styles.processActive
                        : styles.process
                    }
                  >
                    Processing
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleTab("delivered")}>
                  <Text
                    style={
                      tab == "delivered" ? styles.processActive : styles.process
                    }
                  >
                    Delivered
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleTab("cancelled")}>
                  <Text
                    style={
                      tab == "cancelled" ? styles.processActive : styles.process
                    }
                  >
                    Cancelled
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            initialNumToRender={6}
            renderItem={({ item }) => (
              <View style={styles.addressCard} key={item._id}>
                <View style={styles.row}>
                  <Text style={styles.orderNo} numberOfLines={1}>
                    Order No: {item._id}
                  </Text>
                  <Text style={styles.orderDate}>
                    {changeDate(item.createdAt)}
                  </Text>
                </View>
                <View style={styles.itemDetail}>
                  <View>
                    <View style={styles.dFlex}>
                      <Text style={styles.orderDate}>Tracking number:</Text>
                      <Text style={styles.transaction} numberOfLines={1}>
                        {" "}
                        {item.transaction_id}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.dFlex}>
                      <Text style={styles.orderDate}>Quantity:</Text>
                      <Text style={styles.itemValue}>
                        {" "}
                        {orderQuantity(item.orders)}
                      </Text>
                    </View>
                    <View style={styles.dFlex}>
                      <Text style={styles.orderDate}>Total Amount:</Text>
                      <Text style={styles.itemValue}> Rs.{item.total}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Order Details", {
                        ...item,
                        status: tab,
                      })
                    }
                  >
                    <Text style={styles.details}>Details</Text>
                  </TouchableOpacity>
                  <Text style={styles.delivered}>{tab}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addressCard: {
    backgroundColor: "#f5f5ff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  processActive: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: "#663399",
    color: "#f5f5ff",
  },
  process: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    color: "black",
  },
  dFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetail: {
    flexDirection: "column",

    justifyContent: "space-between",
  },
  orderNo: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    marginRight: 10,
    width: (Dimensions.get("window").width - 40) * 0.65,
  },
  orderDate: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
  },
  details: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 20,
    color: "#663399",
    borderWidth: 1,
    borderColor: "#663399",
    marginTop: 5,
  },
  delivered: {
    color: "#4CD964",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_600SemiBold",
    marginTop: 5,
    textTransform: "capitalize",
  },
  itemValue: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
  },
  transaction: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    width: (Dimensions.get("window").width - 40) / 2,
  },
});
