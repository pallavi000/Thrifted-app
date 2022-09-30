import {
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FeedSetting({ navigation }) {
  const [followings, setFollowings] = useState(false);
  const [interests, setInterests] = useState(false);

  useEffect(() => {
    getSwitch();
  }, []);

  async function getSwitch() {
    try {
      var value = JSON.parse(await AsyncStorage.getItem("feedsettings"));
      if (value) {
        setFollowings(value.followings);
        setInterests(value.interests);
      }
    } catch (error) {}
  }

  async function toggleSwitch(value) {
    const feedsetting = {
      followings,
      interests,
    };
    if (value == "followings") {
      setFollowings(!followings);
      feedsetting.followings = !followings;
    } else if (value == "interests") {
      setInterests(!interests);
      feedsetting.interests = !interests;
    }

    await AsyncStorage.setItem("feedsettings", JSON.stringify(feedsetting));
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pagesWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="notifications-none" size={20}></MaterialIcons>
            <Text style={styles.pageName}>Followings</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 10 }}
          >
            <Switch
              trackColor={{ false: "#EBEDF3", true: "#EBEDF3" }}
              thumbColor={followings ? "#4CD964" : "#868686"}
              ios_backgroundColor="#EBEDF3"
              onValueChange={() => toggleSwitch("followings")}
              value={followings}
            />
          </View>
        </View>

        <View style={styles.pagesWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="notifications-none" size={20}></MaterialIcons>
            <Text style={styles.pageName}>Interests</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 10 }}
          >
            <Switch
              trackColor={{ false: "#EBEDF3", true: "#EBEDF3" }}
              thumbColor={interests ? "#4CD964" : "#868686"}
              ios_backgroundColor="#EBEDF3"
              onValueChange={() => toggleSwitch("interests")}
              value={interests}
            />
          </View>
        </View>

        <View style={styles.pagesWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Interest Setting")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialIcons name="notifications-none" size={20}></MaterialIcons>
            <Text style={styles.pageName}>Interests Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    borderRadius: 20,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
  },
  pagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  pageName: {
    fontSize: 13,
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    marginLeft: 5,
  },
  border: {
    padding: 10,
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 1,
    margin: "auto",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
});
