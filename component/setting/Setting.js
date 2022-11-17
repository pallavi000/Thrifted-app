import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { AuthContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Setting({ navigation }) {
  const data = useContext(AuthContext);
  const { decode, token, isSeller } = data;
  const [sales, setSales] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [dsc, setDsc] = useState(false);
  const [user, setUser] = useState();

  const config = {
    headers: {
      "access-token": token,
    },
  };

  async function setSwitch() {
    var notifications = await AsyncStorage.getItem("notifications");
    if (notifications) {
      notifications = JSON.parse(notifications);
      setSales(notifications.sales);
      setNewArrival(notifications.newArrival);
      setDsc(notifications.dsc);
    }
  }

  async function getCurrentUser() {
    try {
      const response = await axios.get("/user/currentuser", config);
      setUser(response.data.user);
    } catch (error) {}
  }

  useLayoutEffect(() => {
    getCurrentUser();
    setSwitch();
  }, []);

  async function toggleSwitch(value) {
    const notification = {
      sales: sales,
      newArrival: newArrival,
      dsc: dsc,
    };
    if (value == "sales") {
      setSales(!sales);
      notification.sales = !sales;
    } else if (value == "newarrival") {
      setNewArrival(!newArrival);
      notification.newArrival = !newArrival;
    } else {
      setDsc(!dsc);
      notification.dsc = !dsc;
    }

    await AsyncStorage.setItem("notifications", JSON.stringify(notification));
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("My Closet", decode)}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="hanger"
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.pageName}>My Closet</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="person-outline" size={20}></MaterialIcons>
              <Text style={styles.pageName}>My Profile</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("My Orders")}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="shopping-bag" size={20}></Feather>
              <Text style={styles.pageName}>My Purchases</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("My Sales", decode)}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="truck" size={20}></Feather>
              <Text style={styles.pageName}>My Sales</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <View style={styles.border}></View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Addresses")}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={20}></Ionicons>
              <Text style={styles.pageName}>My Addresses</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          {isSeller && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Change Pickup Location")}
              style={styles.pagesWrapper}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="location-outline" size={20}></Ionicons>
                <Text style={styles.pageName}>Change Pickup Location</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="chevron-double-right"
                  size={20}
                  color="#CDCDCD"
                ></MaterialCommunityIcons>
              </View>
            </TouchableOpacity>
          )}

          <View style={styles.pagesWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="money" size={20}></FontAwesome>
              <Text style={styles.pageName}>My Balance</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {user ? (
                <Text>Rs. {user.balance}</Text>
              ) : (
                <ActivityIndicator size={"small"} color="#fa4a0c" />
              )}
            </View>
          </View>

          <View style={styles.border}></View>

          <View style={styles.pagesWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="briefcase-outline" size={20}></Ionicons>
              <Text style={styles.pageName}>Pending Balance</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {user ? (
                <Text>Rs. {user.pendingBalance}</Text>
              ) : (
                <ActivityIndicator size={"small"} color="#fa4a0c" />
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Redeem", user)}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="briefcase"
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.pageName}>Redeem</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Redeemption History")}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="history"
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.pageName}>Redeem History</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <View style={styles.border}></View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Feed Setting")}
            style={styles.pagesWrapper}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="history"
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.pageName}>Feed Setting</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="chevron-double-right"
                size={20}
                color="#CDCDCD"
              ></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>

          <View style={styles.border}></View>

          <View style={styles.pagesWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="notifications-none"
                size={20}
              ></MaterialIcons>
              <Text style={styles.pageName}>Sales</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 10 }}
            >
              <Switch
                trackColor={{ false: "#EBEDF3", true: "#EBEDF3" }}
                thumbColor={sales ? "#4CD964" : "#868686"}
                ios_backgroundColor="#EBEDF3"
                onValueChange={() => toggleSwitch("sales")}
                value={sales}
              />
            </View>
          </View>

          <View style={styles.pagesWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="notifications-none"
                size={20}
              ></MaterialIcons>
              <Text style={styles.pageName}>New Arrivals</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 10 }}
            >
              <Switch
                trackColor={{ false: "#EBEDF3", true: "#EBEDF3" }}
                thumbColor={newArrival ? "#4CD964" : "#868686"}
                ios_backgroundColor="#EBEDF3"
                onValueChange={() => toggleSwitch("newarrival")}
                value={newArrival}
              />
            </View>
          </View>
          <View style={styles.pagesWrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="notifications-none"
                size={20}
              ></MaterialIcons>
              <Text style={styles.pageName}>Delivery Status Changes</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 10 }}
            >
              <Switch
                trackColor={{ false: "#EBEDF3", true: "#EBEDF3" }}
                thumbColor={dsc ? "#4CD964" : "#868686"}
                ios_backgroundColor="#EBEDF3"
                onValueChange={() => toggleSwitch("dsc")}
                value={dsc}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
