import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { imageLink } from "../ImageLink";
import { format } from "timeago.js";
import { AuthContext } from "../Context";
import axios from "axios";
import { apiErrorNotification } from "../ErrorHandle";

export default function FollowNotification(props) {
  const item = props.item;
  const navigation = props.navigation;
  const [isReady, setIsReady] = useState(true);
  const data = useContext(AuthContext);
  const { config, decode } = data;
  const [isFollowBack, setIsFollowBack] = useState(
    item.follower?.followers?.includes(decode._id) ? true : false
  );

  async function followBack() {
    setIsReady(false);
    try {
      const response = await axios.post(
        "/user/follow/" + item.follower._id,
        {},
        config
      );
      setIsReady(true);
      setIsFollowBack(true);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  async function messageLoader() {
    setIsReady(false);
    try {
      const data = {
        receiver_id: item.follower._id,
      };
      const response = await axios.post("/chat/newchat", data, config);
      setIsReady(true);
      const receiver = {
        user: item.follower,
        conversation: response.data,
      };
      navigation.navigate("chat", receiver);
    } catch (error) {
      apiErrorNotification(error);
    }
  }
  return (
    <View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("My Closet", item.follower)}
        >
          <Image
            source={{ uri: imageLink + item.follower.image }}
            style={styles.userImage}
          ></Image>
        </TouchableOpacity>

        <View style={styles.detailView}>
          <Text style={styles.detail}>
            <Text style={styles.userName}>{item.follower.name}</Text> started
            following you.
          </Text>
          <Text style={styles.time}>{format(item.createdAt)}</Text>
        </View>
        {isReady ? (
          isFollowBack ? (
            <TouchableOpacity onPress={() => messageLoader()}>
              <Text style={styles.message}>Message</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => followBack()}>
              <Text style={styles.followBack}>Follow</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.message}>
            <ActivityIndicator size={14} color="#663399" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  followBack: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(60, 60, 67, 0.18)",
    borderRadius: 5,
    backgroundColor: "#663399",
  },
});
