import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../Context";
import bbstyles from "../Styles";
import { format } from "timeago.js";
import { imageLink } from "../ImageLink";
import Emoticons from "react-native-emoticons";
import { apiErrorNotification, customErrorNotification } from "../ErrorHandle";
import SendMessage from "./SendMessage";
import ChatMessageItem from "./ChatMessageItem";

export default function Chat({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(true);
  const messageInput = useRef(null);
  const flatListRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [hasNextPageMessage, setHasNextPageMessage] = useState(true);
  const [pageNo, setPageNo] = useState(1);

  const data = useContext(AuthContext);
  const { token, decode, unreadMessage, setUnreadMessage, socket } = data;
  const receiver = route.params;

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
      });
    }
  }, [socket]);

  const sendMessage = async () => {
    try {
      Keyboard.dismiss();
      messageInput.current.clear();
      setMessage();
      const data = {
        sender_id: decode._id,
        receiver_id: receiver.user._id,
        fromMe: true,
        message: message,
      };
      const response = await axios.post(
        "/chat/message/" + receiver.conversation._id,
        data,
        config
      );
      socket.current.emit("sendMessage", response.data);
      setMessages([response.data, ...messages]);
    } catch (error) {
      console.log(error, "error");
      apiErrorNotification(error);
    }
  };

  const changeHeader = React.useCallback(() => {
    navigation.setOptions({
      title: receiver.user.name,
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -30,
          }}
        >
          <Image
            source={{ uri: imageLink + receiver.user.image }}
            style={{ height: 30, width: 30, borderRadius: 15 }}
          ></Image>
          <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "700" }}>
            {receiver.user.name}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 60,
          }}
        >
          <TouchableOpacity onPress={() => videoCall()}>
            <FontAwesome name="video-camera" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => call()}>
            <Ionicons name="call" size={20} />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  useLayoutEffect(() => {
    changeHeader();
  }, []);

  const videoCall = React.useCallback(() => {
    customErrorNotification("Feature not yet enabled.");
  });

  const call = React.useCallback(() => {
    customErrorNotification("Feature not yet enabled.");
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = React.useCallback(async () => {
    try {
      const data = {
        pageNo,
      };
      const response = await axios.post(
        "/chat/message/get/" + receiver.conversation._id,
        data,
        config
      );
      setMessages(response.data);
      setLoader(false);
      setUnreadMessage(unreadMessage - receiver.conversation.unread_count);
    } catch (error) {
      apiErrorNotification(error);
    }
  }, []);

  const nextPageMessage = async () => {
    if (!hasNextPageMessage) return;
    try {
      const data = {
        pageNo: pageNo + 1,
      };
      setPageNo(pageNo + 1);
      const response = await axios.post(
        "/chat/message/get/" + receiver.conversation._id,
        data,
        config
      );
      if (!response.data.length) {
        setHasNextPageMessage(false);
      } else {
        setMessages([...messages, ...response.data]);
      }
    } catch (error) {}
  };

  const emojiIconPress = React.useCallback(() => {
    Keyboard.dismiss();
    setShowEmoji(!showEmoji);
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Emoticons
        onEmoticonPress={(emoji) =>
          message ? setMessage(message + emoji.code) : setMessage(emoji.code)
        }
        onBackspacePress={() => setShowEmoji(false)}
        show={showEmoji}
        concise={true}
        showHistoryBar={true}
        showPlusBar={false}
      />

      <KeyboardAvoidingView
        keyboardVerticalOffset={-500}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <>
          {loader ? (
            <View style={bbstyles.loaderContainer}>
              <ActivityIndicator size={"large"} color="#663399" />
            </View>
          ) : (
            <FlatList
              data={messages}
              contentContainerStyle={{ padding: 10 }}
              keyExtractor={(item) => item._id}
              ref={flatListRef}
              initialNumToRender={10}
              inverted
              onEndReached={nextPageMessage}
              ListFooterComponent={() =>
                hasNextPageMessage ? (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size={"large"} color="#663399" />
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <ChatMessageItem
                  item={item}
                  decode={decode}
                  receiver={receiver}
                />
              )}
            />
          )}

          <SendMessage
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            messageInput={messageInput}
            emojiIconPress={emojiIconPress}
          />
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
