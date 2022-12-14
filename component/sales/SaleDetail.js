import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { imageLink } from "../ImageLink";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { apiErrorNotification } from "../ErrorHandle";
import axios from "axios";
import { AuthContext } from "../Context";
import * as Linking from "expo-linking";

const SaleDetail = ({ navigation, route }) => {
  const item = route.params;
  const [shippingAddress, setShippingAddress] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloadingLabel, setIsDownloadingLabel] = useState(false);
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      "access-token": token,
    },
  };

  const changeDate = React.useCallback((createdAt) => {
    var arr = createdAt.split("T");
    return arr[0];
  });

  useEffect(() => {
    if (item.addresses?.length) {
      const addr = item.addresses.find((add) => add.type === "shipping");
      if (addr) {
        setShippingAddress(addr);
      }
    }
  }, []);

  async function downloadInvoice() {
    setIsSubmitting(true);
    const data = {
      transaction_id: item.transaction_id,
    };
    try {
      const response = await axios.post(
        "/order/generate/invoice",
        data,
        config
      );
      Linking.openURL(response.data);
    } catch (error) {
      apiErrorNotification(error);
    }
    setIsSubmitting(false);
  }

  async function downloadShippingLabel() {
    setIsDownloadingLabel(true);
    const data = {
      order_id: item._id,
    };
    try {
      const response = await axios.post(
        "/order/generate/shipping-label",
        data,
        config
      );
      Linking.openURL(response.data);
    } catch (error) {
      apiErrorNotification(error);
    }
    setIsDownloadingLabel(false);
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.orderDetail}>
            <View>
              <Text style={[styles.orderNo]}>Order No:</Text>
              <Text style={styles.orderValue}>{item._id}</Text>
            </View>
            <Text style={styles.orderDate}>{changeDate(item.createdAt)}</Text>
          </View>

          <View style={styles.orderDetail}>
            <View>
              <Text style={styles.orderNo}>Tracking No:</Text>
              <Text style={styles.transaction}>{item.transaction_id}</Text>
            </View>
            <Text style={styles.delivered}>{item.status}</Text>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.row}>
              <Image
                source={{ uri: imageLink + item.product_id?.image }}
                style={styles.image}
              ></Image>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: "space-between",
                        width: Dimensions.get("window").width - 180,
                      },
                    ]}
                  >
                    <View>
                      <Text style={styles.name} ellipsizeMode="tail">
                        {item.product_id?.name}
                      </Text>
                    </View>
                    {item.order_status == "processing" ? (
                      <View style={styles.pendingAction}>
                        <MaterialCommunityIcons
                          style={styles.icon}
                          name="timer-sand-empty"
                          size={20}
                        ></MaterialCommunityIcons>
                      </View>
                    ) : item.order_status == "shipped" ? (
                      <View style={styles.pendingAction}>
                        <MaterialIcons
                          style={styles.icon}
                          name="local-shipping"
                          size={20}
                        ></MaterialIcons>
                      </View>
                    ) : (
                      <View style={styles.successAction}>
                        <Feather
                          name="check"
                          style={styles.icon}
                          size={20}
                        ></Feather>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.brand}>{item.brand}</Text>
                <View style={styles.row}>
                  <View style={[styles.row, { marginRight: 5 }]}>
                    <Text style={styles.brand}>Color: </Text>
                    <Text style={styles.value}>{item.color}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.brand}>Size: </Text>
                    <Text style={styles.value}>{item.size}</Text>
                  </View>
                </View>
                <View style={styles.spaceBtwn}>
                  <View style={styles.row}>
                    <Text style={styles.brand}>Quantity: </Text>
                    <Text style={styles.value}>{item.quantity}</Text>
                  </View>
                  <Text style={styles.orderValue}>Rs.{item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => navigation.navigate("Track Order", item)}
                >
                  <Text style={styles.login}>Track</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.shipping}>
            <Text style={styles.orderTitle}>Order Information</Text>
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.shippingTitle}>Shipping Address</Text>
              </View>
              <View style={styles.half}>
                <Text style={styles.shippingValue}>
                  {shippingAddress.street}, {shippingAddress.city},
                  {shippingAddress.district}, {shippingAddress.zipcode}, Nepal
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.shippingTitle}>Payment method:</Text>
              </View>
              <View style={styles.half}>
                <Text style={styles.shippingValue}>
                  {item.payment_method || "Direct"}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.shippingTitle}>Delivery method:</Text>
              </View>
              <View style={styles.half}>
                <Text style={styles.shippingValue}>
                  Express, 2 days, Rs. {item.shipping || 0}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View>
                <View style={styles.half}>
                  <Text style={styles.shippingTitle}>Discount:</Text>
                </View>
              </View>
              <View>
                <View style={styles.half}>
                  <Text style={styles.shippingValue}>0%</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.shippingTitle}>Total Amount</Text>
              </View>
              <View style={styles.half}>
                <Text style={styles.shippingValue}>
                  Rs. {item.price * item.quantity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          paddingVertical: 10,
        }}
      >
        {isDownloadingLabel ? (
          <TouchableOpacity style={styles.loginBtn}>
            <ActivityIndicator size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.loginBtn, { marginBottom: 5 }]}
            onPress={() => downloadShippingLabel()}
          >
            <Text style={styles.login}>Download Shipping Label</Text>
          </TouchableOpacity>
        )}

        {isSubmitting ? (
          <TouchableOpacity style={styles.loginBtn}>
            <ActivityIndicator size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => downloadInvoice()}
          >
            <Text style={styles.login}>Download Invoice</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SaleDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pendingAction: {
    backgroundColor: "#68B6F3",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  cancelledAction: {
    backgroundColor: "#FF2424",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  successAction: {
    backgroundColor: "#4CD964",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  icon: {
    fontSize: 15,
    alignItems: "center",
    fontWeight: "500",
    color: "white",
  },
  loginBtn: {
    paddingVertical: 8,
    backgroundColor: "#663399",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#663399",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 15,
    color: "white",
    marginRight: 10,
  },
  orderDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },
  orderNo: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
  },
  orderDate: {
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
  },
  orderValue: {
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    marginLeft: 4,
  },
  transaction: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    marginLeft: 4,
    width: (Dimensions.get("window").width - 40) * 0.75,
  },
  delivered: {
    color: "#4CD964",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    textTransform: "capitalize",
  },
  addressCard: {
    backgroundColor: "#f5f5ff",
    padding: 0,
    borderRadius: 10,
    marginTop: 30,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
    paddingVertical: 20,
    paddingBottom: 0,
  },
  image: {
    height: 170,
    width: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
    marginTop: -20,
  },
  productDetail: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Raleway_600SemiBold",
    marginBottom: 8,
    flex: 1,
    flexWrap: "wrap",
  },
  brand: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    marginBottom: 8,
    marginHorizontal: 5,
  },
  spaceBtwn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shippingTitle: {
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
    fontWeight: "500",
    color: "#455154",
  },
  shippingValue: {
    fontSize: 14,
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
  },
  shipping: {
    marginVertical: 30,
    flex: 1,
  },
  orderTitle: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  half: {
    width: (Dimensions.get("window").width - 40) / 2,
    marginBottom: 10,
  },
});
