import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

const SendMessage = ({
  setMessage,
  message,
  sendMessage,
  messageInput,
  emojiIconPress,
}) => {
  return (
    <View style={styles.chatWrapper}>
      <TouchableOpacity onPress={() => emojiIconPress()}>
        <Feather name="smile" size={20}></Feather>
      </TouchableOpacity>
      <View style={{ flexGrow: 1, marginHorizontal: 15 }}>
        <TextInput
          style={styles.messageInput}
          keyboardType="default"
          placeholder="Start typing..."
          ref={messageInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
          selectionColor="#663399"
        ></TextInput>
      </View>
      <View style={styles.messageSend}>
        <Ionicons
          name="at-sharp"
          size={20}
          color="#3D3D3D"
          style={styles.hash}
        />
        {message ? (
          <TouchableWithoutFeedback onPress={() => sendMessage()}>
            <Ionicons name="send-outline" size={20} color="#3D3D3D"></Ionicons>
          </TouchableWithoutFeedback>
        ) : (
          <Ionicons name="send-outline" size={20} color="#8E8E93"></Ionicons>
        )}
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  chatWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopColor: "#E5E5EA",
    borderTopWidth: 1,
    height: 60,
    bottom: 0,
  },
  messageSend: {
    flexDirection: "row",
  },
  hash: {
    marginRight: 10,
  },
  messageInput: {
    height: 40,
    color: "#666668",
    fontFamily: "Raleway_400Regular",
    width: Dimensions.get("window").width - 130,
  },
});
