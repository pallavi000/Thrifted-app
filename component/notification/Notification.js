import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context";
import {
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { imageLink } from "../ImageLink";
import { format } from "timeago.js";
import LikeNotification from "./LikeNotification";
import CommentNotification from "./CommentNotification";
import FollowNotification from "./FollowNotification";
import OrderNotification from "./OrderNotification";
import bbstyles from "../Styles";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import EmptyNotification from "./EmptyNotification";
import { apiErrorNotification } from "../ErrorHandle";

export default function Notification({ navigation }) {
  const data = useContext(AuthContext);
  const [notificationLoader, setNotificationLoader] = useState(true);
  const [orderNotificationLoader, setOrderNotificationLoader] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [originalNotifications, setOriginalNotifications] = useState([]);
  const {
    token,
    unreadNotification,
    setUnreadNotification,
    socket,
    unreadNormalNotificationCount,
    setUnreadNormalNotificationCount,
    unreadOrderNotificationCount,
    setUnreadOrderNotificationCount,
  } = data;
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [normalPageNo, setNormalPageNo] = useState(1);
  const [orderNotificationPageNo, setOrderNotificationPageNo] = useState(1);
  const [hasNormalNextPage, setHasNormalNextPage] = useState(true);
  const [hasOrderNotificationNextPage, setHasOrderNotificationNextPage] =
    useState(true);
  const [originalOrderNotifications, setOriginalOrderNotifications] = useState(
    []
  );
  const [tab, setTab] = useState("normal");
  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getNotification();
    getOrderNotification();
    readNotification();
  }, []);

  useEffect(() => {
    if (tab == "order" && unreadOrderNotificationCount > 0) {
      readOrderNotification();
    }
  }, [tab]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("notification", (notification) => {
        setNotifications(
          groupNotification([...originalNotifications, notification])
        );
        setOriginalNotifications([...originalNotifications, notification]);
      });
      socket.current.on("orderNotification", (notification) => {
        console.log("order", notification);
        setOrderNotifications(
          groupNotification([...originalOrderNotifications, notification])
        );
        setOriginalOrderNotifications([
          ...originalOrderNotifications,
          notification,
        ]);
      });
    }
  }, [socket, originalNotifications, originalOrderNotifications]);

  const groupNotification = React.useCallback((data) => {
    // this gives an object with dates as keys
    const items = data.reduce((items, item) => {
      if (item) {
        let date = item.createdAt ? item.createdAt : new Date().toJSON();
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
        items: items[date],
      };
    });
    itemsArray = itemsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    return itemsArray;
  });

  const getNotification = React.useCallback(async () => {
    try {
      const data = {
        pageNo: normalPageNo,
      };
      const response = await axios.post("/notification", data, config);
      setOriginalNotifications(response.data);
      const noti = groupNotification(response.data);
      setNotifications(noti);

      setNotificationLoader(false);
    } catch (error) {}
  });

  const getOrderNotification = React.useCallback(async () => {
    try {
      const data = {
        pageNo: orderNotificationPageNo,
      };
      var response = await axios.post(
        "/order-notification/order",
        data,
        config
      );
      setOriginalOrderNotifications(response.data);
      const notif = groupNotification(response.data);
      setOrderNotifications(notif);
      setOrderNotificationLoader(false);
    } catch (error) {}
  });

  const readNotification = React.useCallback(async () => {
    try {
      var response = await axios.get("/notification/read", config);
      setUnreadNotification(unreadNotification - unreadNormalNotificationCount);
      setUnreadNormalNotificationCount(0);
    } catch (error) {}
  });

  const readOrderNotification = React.useCallback(async () => {
    try {
      await axios.get("/order-notification/read", config);
      setUnreadNotification(unreadNotification - unreadOrderNotificationCount);
      setUnreadOrderNotificationCount(0);
    } catch (error) {}
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
    const diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
    if (compDate.getTime() == today.getTime()) {
      return "Today";
    } else if (diff <= 24 * 60 * 60 * 1000) {
      return "Yesterday";
    } else {
      return compDate.toDateString(); // or format it what ever way you want
    }
  });

  async function NormalNextData() {
    if (!hasNormalNextPage) return;
    try {
      setNormalPageNo(normalPageNo + 1);
      const data = {
        pageNo: normalPageNo + 1,
      };
      const response = await axios.post("/notification", data, config);
      if (response.data.length) {
        var allNotification = [...originalNotifications, ...response.data];
        var group = groupNotification(allNotification);
        setNotifications(group);
        setOriginalNotifications(allNotification);
      } else {
        setHasNormalNextPage(false);
      }
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  async function orderNotificationNextData() {
    if (!hasOrderNotificationNextPage) return;
    try {
      setOrderNotificationPageNo(orderNotificationPageNo + 1);
      const data = {
        pageNo: orderNotificationPageNo + 1,
      };
      const response = await axios.post(
        "/order-notification/order",
        data,
        config
      );
      if (response.data.length) {
        var allNotification = [...originalOrderNotifications, ...response.data];
        var group = groupNotification(allNotification);
        setOrderNotificationLoader(group);
        setOriginalOrderNotifications(allNotification);
      } else {
        setHasOrderNotificationNextPage(false);
      }
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.category}>
        <TouchableOpacity onPress={() => setTab("normal")}>
          <View>
            <Text style={tab == "normal" ? styles.normal : styles.order}>
              Normal{" "}
              {unreadNormalNotificationCount > 0 ? (
                <Text style={styles.unread}>
                  ({unreadNormalNotificationCount})
                </Text>
              ) : null}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("order")}>
          <View>
            <Text style={tab == "order" ? styles.normal : styles.order}>
              Orders{" "}
              {unreadOrderNotificationCount > 0 ? (
                <Text style={styles.unread}>
                  ({unreadOrderNotificationCount})
                </Text>
              ) : null}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {notificationLoader && orderNotificationLoader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : (notifications && notifications.length > 0) ||
        (orderNotifications && orderNotifications.length > 0) ? (
        <>
          {tab === "normal" ? (
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id}
              onEndReached={() => NormalNextData()}
              ListFooterComponent={() => {
                return hasNormalNextPage ? (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size={"large"} color="#663399" />
                  </View>
                ) : null;
              }}
              renderItem={({ item }) => (
                <>
                  <Text style={styles.heading}>
                    {getDisplayDate(item.date)}
                  </Text>
                  <FlatList
                    data={item.items}
                    keyExtractor={(item) => uuidv4()}
                    renderItem={({ item }) =>
                      item.type == "like" ? (
                        <LikeNotification
                          key={item.id}
                          item={item}
                          navigation={navigation}
                        />
                      ) : item.type == "comment" ? (
                        <CommentNotification
                          key={item.id}
                          item={item}
                          navigation={navigation}
                        />
                      ) : item.type == "follow" ? (
                        <FollowNotification
                          key={item.id}
                          item={item}
                          navigation={navigation}
                        />
                      ) : null
                    }
                  />
                </>
              )}
            />
          ) : (
            <FlatList
              data={orderNotifications}
              keyExtractor={(item) => item.id}
              onEndReached={() => orderNotificationNextData()}
              ListFooterComponent={() => {
                return hasOrderNotificationNextPage ? (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size={"large"} color="#663399" />
                  </View>
                ) : null;
              }}
              renderItem={({ item }) => (
                <>
                  <Text style={styles.heading}>
                    {getDisplayDate(item.date)}
                  </Text>
                  <FlatList
                    data={item.items}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                      <OrderNotification
                        key={item._id}
                        item={item}
                        navigation={navigation}
                      />
                    )}
                  />
                </>
              )}
            />
          )}
        </>
      ) : (
        <EmptyNotification navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  unread: {
    color: "#FF2424",
  },
  heading: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
    paddingLeft: 10,
    paddingTop: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "rgba(60, 60, 67, 0.18)",
    borderBottomWidth: 0.5,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  postImage: {
    height: 50,
    width: 50,
    resizeMode: "cover",
  },
  detail: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    color: "#262626",
  },
  userName: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
  },
  detailView: {
    flex: 1,
    marginHorizontal: 10,
  },
  category: {
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 0.4,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  normal: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "black",
  },
  order: {
    fontFamily: "Raleway_600SemiBold",
    fontWeight: "600",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.4)",
  },
  time: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    color: "rgba(0, 0, 0, 0.3)",
    marginRight: 5,
  },
  mention: {
    color: "#663399",
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
  },
  replyWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  replyText: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "rgba(0, 0, 0, 0.4)",
    marginLeft: 10,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#262626",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(60, 60, 67, 0.18)",
    borderRadius: 5,
  },
});
