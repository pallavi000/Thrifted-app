import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { imageLink } from "../ImageLink";
import { format } from "timeago.js";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const ChatMessageItem = ({ item, decode, receiver }) => {
  const [show, setShow] = useState(false);

  const showStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: show ? 1 : 0 }],
    }),
    [show]
  );

  return (
    <>
      {item.sender_id != decode._id ? (
        <View style={styles.dFlex}>
          <Image
            source={{ uri: imageLink + receiver.user.image }}
            style={styles.image}
          ></Image>
          <View style={[styles.dFlex, styles.self]}>
            <View style={{ flexGrow: 1, maxWidth: "90%" }}>
              <TouchableWithoutFeedback onPress={() => setShow(!show)}>
                <Text style={styles.message}>{item.message}</Text>
              </TouchableWithoutFeedback>
              <Animated.View style={showStyle}>
                <Text style={styles.sentTimeReceiver}>
                  {format(item.createdAt)}
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.dFlex, styles.sender]}>
          <View style={{ flexGrow: 1 }}>
            <TouchableWithoutFeedback onPress={() => setShow(!show)}>
              <Text style={styles.senderMessage}>{item.message}</Text>
            </TouchableWithoutFeedback>
            <Animated.View style={showStyle}>
              <Text style={styles.sentTime}>{format(item.createdAt)}</Text>
            </Animated.View>
          </View>
        </View>
      )}
    </>
  );
};

export default ChatMessageItem;

const styles = StyleSheet.create({
  dFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentTime: {
    textAlign: "right",
    paddingHorizontal: 10,
    fontSize: 10,
    color: "#8E8E93",
  },
  sentTimeReceiver: {
    textAlign: "left",
    paddingHorizontal: 10,
    fontSize: 10,
    color: "#8E8E93",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    backgroundColor: "#E4E4E4D4",
    padding: 10,
    paddingHorizontal: 20,
    paddingLeft: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    marginLeft: 10,
    maxWidth: "85%",
    flexGrow: 1,
    alignSelf: "flex-start",
  },
  senderMessage: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Raleway_500Medium",
    backgroundColor: "#E4E4E4D4",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    paddingLeft: 10,
    backgroundColor: "#663399",
    color: "white",
    maxWidth: "90%",
    alignSelf: "flex-end",
    flexGrow: 1,
    overflow: "hidden",
  },
  self: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  sender: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
});
