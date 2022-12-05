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
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Raleway_500Medium,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import axios from "axios";
import { AuthContext } from "../Context";
import { apiErrorNotification } from "../ErrorHandle";
import { v4 as uuidv4 } from "uuid";

export default function OrderTrack({ route }) {
  const order = route.params;

  const data = useContext(AuthContext);
  const { token } = data;

  const [events, setEvents] = useState([]);

  const [groupedEvents, setGroupedEvents] = useState([]);

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getTrackRecord();
  }, []);

  async function getTrackRecord() {
    const config = {
      headers: {
        Authorization: "Token f6fe2f12ebf5595d62887f8968df969360b98c0e",
      },
    };

    try {
      const response = await axios.get(
        "https://demo.nepalcanmove.com/api/v1/order/status?id=2675",
        config
      );

      var a = groupNotification(response.data);

      setGroupedEvents(a);
    } catch (error) {
      console.log(error);
    }
  }

  const groupNotification = React.useCallback((data) => {
    // this gives an object with dates as keys
    const items = data.reduce((items, item) => {
      if (item) {
        let date = item.added_time ? item.added_time : new Date().toJSON();
        date = date.split("T")[0];
        if (!items[date]) {
          items[date] = [];
        }
        items[date].push(item);
        return items;
      }
    }, {});
    // Edit: to add it in the array format instead
    let itemsArray = Object.keys(items).map((date) => {
      return {
        id: uuidv4(),
        date,
        items: items[date].length
          ? items[date].sort(
              (a, b) => new Date(b.added_time) - new Date(a.added_time)
            )
          : items[date],
      };
    });
    itemsArray = itemsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    return itemsArray;
  });

  const getDisplayDate = React.useCallback((date) => {
    const dateArr = date.split("-");

    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const compDate = new Date(year, month - 1, day); // month - 1 because January == 0
    return compDate.toDateString(); // or format it what ever way you want
  });

  const changeDate = React.useCallback((createdAt) => {
    var arr = createdAt.split("T");
    if (!arr.length) return createdAt;
    return arr[1].split(".")[0];
  });

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
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="timer-sand-empty"
                      size={20}
                      color="white"
                    ></MaterialCommunityIcons>
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
                    <MaterialCommunityIcons
                      style={styles.icon}
                      name="timer-sand-empty"
                      size={20}
                      color="white"
                    ></MaterialCommunityIcons>
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
              {groupedEvents.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.heading}>
                      {getDisplayDate(item.date)}
                    </Text>
                    {item.items?.map((event, idx) => {
                      return (
                        <View key={idx} style={styles.trackWrapper}>
                          <Text>{changeDate(event.added_time)}</Text>
                          <Text style={styles.trackDetail}>{event.status}</Text>
                        </View>
                      );
                    })}
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
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#ddd",
  },
  heading: {
    fontSize: 15,
    fontWeight: "600",
    color: "#262626",
    paddingTop: 10,
    marginBottom: 10,
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
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
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
