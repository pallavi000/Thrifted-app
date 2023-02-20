import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../Context";
import { FlatList } from "react-native-gesture-handler";
import { imageLink } from "../ImageLink";
import { format } from "timeago.js";
import { useIsFocused } from "@react-navigation/native";
import bbstyles from "../Styles";
import { apiErrorNotification } from "../ErrorHandle";

export default function Messages({ navigation }) {
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(true);
  const data = useContext(AuthContext);
  const { config, titleShown, setTitleShown, decode, socket } = data;
  const [chats, setChats] = useState([]);
  const [originalChats, setOriginalChats] = useState([]);

  const [hasNextPageMessage, setHasNextPageMessage] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("conversation", (conversation) => {
        var index = chats.findIndex(
          (message) => message._id == conversation._id
        );
        if (index != -1) {
          var copy = [...chats];
          copy[index] = conversation;
          setChats(copy);
        } else {
          setChats([conversation, ...chats]);
        }
      });
    }
  }, [socket, chats]);

  const changeHeader = React.useCallback(() => {
    navigation.setOptions({
      title: decode.name,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("New Chat")}>
          <Entypo name="new-message" size={20} style={{ marginRight: 5 }} />
        </TouchableOpacity>
      ),
    });
  });

  useLayoutEffect(() => {
    changeHeader();
  }, []);

  useEffect(() => {
    getMessage();
  }, [isFocused]);

  const getMessage = React.useCallback(async () => {
    try {
      const data = {
        pageNo,
      };
      const response = await axios.post("/chat/conversation", data, config);
      setChats(response.data);
      setOriginalChats(response.data);
      setLoader(false);
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  async function chatnextPage() {
    if (!hasNextPageMessage) return;
    try {
      setPageNo(pageNo + 1);
      const data = {
        pageNo: pageNo + 1,
      };
      const response = await axios.post("/chat/conversation", data, config);
      if (!response.data.length) {
        setHasNextPageMessage(false);
      }
      setChats([...chats, ...response.data]);
      setOriginalChats([...originalChats, ...response.data]);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  const startChat = React.useCallback(async (conversation) => {
    if (decode._id == conversation.sender_id._id) {
      const receiver = {
        user: conversation.receiver_id,
        conversation: conversation,
      };
      navigation.navigate("chat", receiver);
    } else {
      const receiver = {
        user: conversation.sender_id,
        conversation: conversation,
      };
      navigation.navigate("chat", receiver);
    }
  }, []);

  const getUnreadCount = React.useCallback((conversation) => {
    if (conversation.sender_id._id == decode._id) {
      return conversation.sender_id_unread_count;
    }
    if (conversation.receiver_id._id == decode._id) {
      return conversation.receiver_id_unread_count;
    }
    return 0;
  });

  const getImage = React.useCallback((item) => {
    return decode._id == item.sender_id._id
      ? imageLink + item.receiver_id.image
      : imageLink + item.sender_id.image;
  });

  const getName = React.useCallback((item) => {
    return decode._id == item.sender_id._id
      ? item.receiver_id.name
      : item.sender_id.name;
  });

  const searchChats = React.useCallback(
    (text) => {
      if (text.trim().length > 0) {
        text = text.toLowerCase().trim();
        let filterChats = originalChats.filter((chat) =>
          getName(chat).toLowerCase().includes(text)
        );
        setChats(filterChats);
      } else {
        setChats(originalChats);
      }
    },
    [originalChats]
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#979797"
          ></Ionicons>
          <TextInput
            style={styles.searchText}
            keyboardType="default"
            placeholder="Search"
            selectionColor="#663399"
            onChangeText={(text) => searchChats(text)}
          ></TextInput>
        </View>
        {loader ? (
          <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={"large"} color="#663399" />
          </View>
        ) : chats && chats.length ? (
          <FlatList
            data={chats}
            onEndReached={() => chatnextPage()}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{}}
            ListFooterComponent={() =>
              hasNextPageMessage ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size={"large"} color="#663399" />
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dFlex, styles.marginTop]}
                onPress={() => startChat(item)}
              >
                <View style={styles.userWrapper}>
                  <View style={styles.ImageWrapper}>
                    <Image
                      source={{ uri: getImage(item) }}
                      style={styles.image}
                    ></Image>
                  </View>
                  <View style={styles.userDetailWrapper}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.name}>{getName(item)}</Text>
                      <Text style={styles.activeStatus}>
                        {format(item.updatedAt)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={
                          getUnreadCount(item) > 0
                            ? styles.userMessageBold
                            : styles.userMessage
                        }
                      >
                        {item.last_message}
                      </Text>
                      <View style={styles.statusWrapper}>
                        {getUnreadCount(item) > 0 ? (
                          <Text style={styles.activeIndicator}>
                            {getUnreadCount(item)}
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 60,
            }}
          >
            <View>
              <Image
                source={require("../../assets/empty-message.png")}
                style={styles.emptyImage}
              />
            </View>
            <Text style={styles.header}>No Messages</Text>
            <Text style={styles.subtitle}>When you have messages,</Text>
            <Text style={styles.subtitle}>you'll see them here</Text>
          </View>
        )}
      </View>
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyImage: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    resizeMode: "contain",
  },
  header: {
    fontWeight: "700",
    fontSize: 28,
    fontFamily: "Raleway_700Bold",
    color: "#262626",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#868686",
    marginTop: 10,
    textAlign: "center",
  },
  container: {
    padding: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#7676801F",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  searchText: {
    color: "#979797",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    marginLeft: 8,
    height: 25,
    flexGrow: 1,
  },
  dFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marginTop: {
    marginTop: 20,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
  },
  userDetailWrapper: {
    width: Dimensions.get("window").width - 114,
  },
  image: {
    height: 56,
    width: 56,
    resizeMode: "cover",
    borderRadius: 28,
    borderColor: "#C7C7CC",
    borderWidth: 0.4,
  },
  ImageWrapper: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 0.4,
    borderColor: "#C7C7CC",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    marginBottom: 8,
  },
  userMessage: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    maxWidth: "90%",
  },
  userMessageBold: {
    fontSize: 12,
    fontFamily: "Raleway_600SemiBold",
    maxWidth: "90%",
  },
  activeStatus: {
    fontSize: 10,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    color: "rgba(0, 0, 0, 0.4)",
  },
  statusWrapper: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  activeIndicator: {
    height: 16,
    width: 16,
    borderRadius: 5,
    // backgroundColor:'#4CD964',
    backgroundColor: "#FF2424",
    fontSize: 10,
    color: "white",
    textAlign: "center",
    lineHeight: 16,
  },
  offlineIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#FF2424",
  },
});
