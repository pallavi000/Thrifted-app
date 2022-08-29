import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import bbstyles from "../Styles";
import axios from "axios";
import { apiErrorNotification } from "./../ErrorHandle";
import OrderHistory from "../Order/OrderHistory";

const MySales = ({ route, navigation }) => {
  const [sales, setSales] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProcessing, setTotalProcessing] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const [salePageNo, setSalePageNo] = useState(1);
  const [salesHasNextPage, setSalesHasNextPage] = useState(true);
  const [delivered, setDelivered] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [tab, setTab] = useState("processing");
  const user = route.params;

  const getSales = React.useCallback(async () => {
    try {
      const data = {
        pageno: salePageNo,
      };
      const response = await axios.post("/order/sales/get/" + user._id, data);
      const processing_items = response.data?.orders.filter(
        (o) => o.order_status == "processing"
      );
      const completed_items = response.data?.orders.filter(
        (o) => o.order_status == "completed"
      );
      const cancelled_items = response.data?.orders.filter(
        (o) => o.order_status == "cancelled"
      );
      setSales(processing_items);
      setProcessing(processing_items);
      setDelivered(completed_items);
      setCancelled(cancelled_items);
      setTotalSales(response.data.total);
      setTotalProcessing(response.data.processing);
      setTotalDelivered(response.data.completed);
      setTotalCancelled(response.data.cancelled);

      setLoader(false);
    } catch (error) {
      setLoader(false);
      apiErrorNotification(error);
    }
  });

  async function nextPageSalesCloset() {
    if (!salesHasNextPage) return;
    try {
      const data = {
        pageno: salePageNo + 1,
        orderOnly: true,
      };
      setSalePageNo(salePageNo + 1);
      const response = await axios.post("/order/sales/get/" + user._id, data);
      const processing_items = response.data.filter(
        (o) => o.order_status == "processing"
      );
      const completed_items = response.data.filter(
        (o) => o.order_status == "completed"
      );
      const cancelled_items = response.data.filter(
        (o) => o.order_status == "cancelled"
      );
      if (processing_items.length) {
        setProcessing([...processing, ...processing_items]);
      }
      if (completed_items.length) {
        setDelivered([...delivered, ...completed_items]);
      }
      if (cancelled_items.length) {
        setCancelled([...cancelled, ...cancelled_items]);
      }
      if (!response.data.length) {
        setSalesHasNextPage(false);
      }
      if (tab === "processing") {
        if (processing.length + processing_items.length >= totalProcessing) {
          setSalesHasNextPage(false);
        }
        setSales([...sales, ...processing_items]);
      } else if (tab === "delivered") {
        if (delivered.length + completed_items.length >= totalDelivered) {
          setSalesHasNextPage(false);
        }
        setSales([...sales, ...completed_items]);
      } else {
        if (cancelled.length + cancelled_items.length >= totalCancelled) {
          setSalesHasNextPage(false);
        }
        setSales([...sales, ...cancelled_items]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getSales();
  }, []);

  const changeDate = React.useCallback((createdAt) => {
    var arr = createdAt.split("T");
    return arr[0];
  });

  const toggleTab = React.useCallback((action) => {
    setTab(action);
    if (action == "delivered") {
      if (delivered.length >= totalDelivered) {
        setSalesHasNextPage(false);
      } else {
        setSalesHasNextPage(true);
      }
      setSales(delivered);
    } else if (action == "processing") {
      if (processing.length >= totalProcessing) {
        setSalesHasNextPage(false);
      } else {
        setSalesHasNextPage(true);
      }
      setSales(processing);
    } else {
      if (cancelled.length >= totalCancelled) {
        setSalesHasNextPage(false);
      } else {
        setSalesHasNextPage(true);
      }
      setSales(cancelled);
    }
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : !delivered.length && !processing.length && !cancelled.length ? (
        <OrderHistory navigation={navigation} title="No Sales Yet." />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={sales}
            keyExtractor={(item) => item._id}
            onEndReached={nextPageSalesCloset}
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
            onEndReachedThreshold={5}
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
                  <View style={{ marginBottom: 5 }}>
                    <View style={styles.dFlex}>
                      <Text style={styles.orderDate}>Product:</Text>
                      <Text style={styles.orderNo} numberOfLines={1}>
                        {" "}
                        {item.product_id?.name}
                      </Text>
                    </View>
                  </View>

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
                      <Text style={styles.itemValue}> {item.quantity}</Text>
                    </View>
                    <View style={styles.dFlex}>
                      <Text style={styles.orderDate}>Total Amount:</Text>
                      <Text style={styles.itemValue}>
                        {" "}
                        Rs.{item.price * item.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Sale Details", {
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
            ListFooterComponent={() =>
              salesHasNextPage ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size={"large"} color="#663399" />
                </View>
              ) : null
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MySales;

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
