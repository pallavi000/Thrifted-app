import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  Raleway_500Medium,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import axios from "axios";
import { AuthContext } from "../Context";
import { apiErrorNotification } from "../ErrorHandle";

export default function OrderTrack({ route }) {
  const order = route.params;

  const data = useContext(AuthContext);
  const { token } = data;

  const [events, setEvents] = useState([]);

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getTrackRecord();
  }, []);

  async function getTrackRecord() {
    try {
      const response = await axios.get(
        "/order-track/order/" + order._id,
        config
      );
      setEvents(response.data);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#663399" barStyle="light-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Delivery Status</Text>
          <View style={styles.loginForm}>
            <View style={styles.deliver}>
              <View style={styles.noteWrapper}>
                <View style={styles.imageView}>
                  <Image
                    source={require("../../assets/note.png")}
                    style={styles.logo}
                  ></Image>
                </View>
                <Text style={styles.logoTitle}>Order Taken</Text>
              </View>
              <View>
                <Text style={styles.orderTick}>
                  <Feather name="check" size={15} color="white"></Feather>
                </Text>
              </View>
            </View>
            <View style={styles.deliver}>
              <View style={styles.noteWrapper}>
                <View style={styles.imageView}>
                  <Image
                    source={require("../../assets/prepared.png")}
                    style={styles.logo}
                  ></Image>
                </View>
                <Text style={styles.logoTitle}>Order Is Being Prepared</Text>
              </View>
              <View>
                <Text style={styles.orderTick}>
                  <Feather name="check" size={15} color="white"></Feather>
                </Text>
              </View>
            </View>
            {order.order_status == "shipped" ? (
              <View style={styles.deliver}>
                <View style={styles.noteWrapper}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../assets/deliver.png")}
                      style={styles.logo}
                    ></Image>
                  </View>
                  <View>
                    <Text style={styles.logoTitle}>
                      Order Is Being Delivered
                    </Text>
                    <Text style={styles.subtitle}>
                      Your delivery agent is coming
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Text style={styles.phoneTick}>
                    <Feather
                      name="phone-call"
                      size={15}
                      color="white"
                    ></Feather>
                  </Text>
                </View>
              </View>
            ) : order.order_status != "completed" ? (
              <View style={styles.deliver}>
                <View style={styles.noteWrapper}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../assets/deliver.png")}
                      style={styles.logo}
                    ></Image>
                  </View>
                  <View>
                    <Text style={styles.logoTitle}>
                      Order Is Not Yet Shipped
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Text style={styles.phoneTick}>
                    <Feather
                      name="phone-call"
                      size={15}
                      color="white"
                    ></Feather>
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.deliver}>
                <View style={styles.noteWrapper}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../assets/deliver.png")}
                      style={styles.logo}
                    ></Image>
                  </View>
                  <View>
                    <Text style={styles.logoTitle}>Order Is Delivered</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Text style={styles.orderTick}>
                    <Feather name="check" size={15} color="white"></Feather>
                  </Text>
                </View>
              </View>
            )}

            <View>
              <Text style={styles.tracking}>Tracking Information</Text>
              {events.map((event) => {
                return (
                  <View key={event._id} style={styles.trackWrapper}>
                    <Entypo name="dot-single" size={24} color="black" />
                    <Text style={styles.trackDetail}>{event.message}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tracking: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "Raleway_600SemiBold",
  },
  container: {
    backgroundColor: "#663399",
  },
  trackWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  trackDetail: {
    fontSize: 16,
    fontFamily: "Raleway_500Medium",
    marginLeft: 10,
    color: "#4d4d4d",
    textTransform: "capitalize",
  },

  title: {
    fontWeight: "800",
    fontSize: 50,
    color: "white",
    fontFamily: "Raleway_800ExtraBold",
    padding: 20,
    paddingVertical: 10,
  },
  loginForm: {
    backgroundColor: "white",
    color: "black",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  deliver: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  logo: {
    height: 43,
    width: 48,
    resizeMode: "cover",
  },
  imageView: {
    backgroundColor: "#f5f5ff",
    borderRadius: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 53,
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginLeft: 5,
  },
  noteWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  orderTick: {
    backgroundColor: "#4CD964",
    height: 20,
    width: 20,
    textAlign: "center",
    borderRadius: 10,
    lineHeight: 20,
  },
  pendingAction: {
    backgroundColor: "#68B6F3",
    height: 20,
    width: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  phoneTick: {
    backgroundColor: "#663399",
    height: 40,
    width: 40,
    textAlign: "center",
    borderRadius: 20,
    lineHeight: 42,
  },
  mapContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  map: {
    height: 135,
    width: Dimensions.get("window").width - 70,
    resizeMode: "cover",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    marginLeft: 5,
  },
});
