import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { imageLink } from "../ImageLink";
import { AuthContext } from "../Context";
import bbstyles from "../Styles";
import { apiErrorNotification } from "../ErrorHandle";

export default function NewChat({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [originalUsers, setOriginalUsers] = useState([]);

  const data = useContext(AuthContext);
  const { token } = data;

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get("/user/userall");
      setUsers(response.data);
      setOriginalUsers(response.data);
      setLoader(false);
    } catch (error) {}
  }

  async function startChat(user) {
    try {
      const data = {
        receiver_id: user._id,
      };

      const response = await axios.post("/chat/newchat", data, config);
      const receiver = {
        user,
        conversation: response.data,
      };
      navigation.navigate("chat", receiver);
    } catch (error) {
      apiErrorNotification(error);
    }
  }

  function searchUsers(text) {
    if (text.trim().length > 0) {
      text = text.toLowerCase().trim();
      let filterUsers = originalUsers.filter((user) =>
        user.name.toLowerCase().includes(text)
      );
      setUsers(filterUsers);
    } else {
      setUsers(originalUsers);
    }
  }

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
            onChangeText={(text) => searchUsers(text)}
            selectionColor="#663399"
          ></TextInput>
        </View>
        {loader ? (
          <View style={bbstyles.loaderContainer}>
            <ActivityIndicator size={"large"} color="#663399" />
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dFlex, styles.marginTop]}
                onPress={() => startChat(item)}
              >
                <View style={styles.userWrapper}>
                  <View style={styles.ImageWrapper}>
                    <Image
                      source={{ uri: imageLink + item.image }}
                      style={styles.image}
                    ></Image>
                  </View>
                  <View style={styles.userDetailwrpper}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.userMessage}>Hi, I'm {item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        )}
      </View>
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  activeStatus: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Raleway_400Regular",
    color: "rgba(0, 0, 0, 0.4)",
  },
  statusWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4CD964",
  },
  offlineIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#FF2424",
  },
});
