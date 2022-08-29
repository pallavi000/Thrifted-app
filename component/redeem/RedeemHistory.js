import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import axios from "axios";
import { AuthContext } from "../Context";
import bbstyles from "../Styles";
import EmptyRedeem from "./EmptyRedeem";

export default function RedeemHistory({ navigation }) {
  const [payments, setPayments] = useState([]);
  const [loader, setLoader] = useState(true);

  const data = useContext(AuthContext);
  const { token } = data;

  const config = {
    headers: {
      "access-token": token,
    },
  };

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = React.useCallback(async () => {
    try {
      var response = await axios.get("/user/withdraw/all", config);
      setPayments(response.data);
      setLoader(false);
    } catch (error) {}
  });

  const dateConvert = React.useCallback((requestTime) => {
    var arr = requestTime.split("T");
    return arr[0];
  });

  const timeConvert = React.useCallback((requestTime) => {
    var arr = requestTime.split("T");
    var time = arr[1].split(".");
    return time[0];
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {loader ? (
        <View style={bbstyles.loaderContainer}>
          <ActivityIndicator size={"large"} color="#663399" />
        </View>
      ) : payments && payments.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={payments}
            keyExtractor={(item) => item._id}
            initialNumToRender={6}
            renderItem={({ item }) => (
              <View>
                {item.status == "pending" ? (
                  <View style={styles.pendingCard} key={item._id}>
                    <View>
                      <Text styles={styles.title}>
                        {item.payment_method} . {item.account_detail}
                      </Text>
                      <View style={styles.row}>
                        <Text style={styles.subtitle}>
                          {dateConvert(item.createdAt)}
                        </Text>
                        <Text style={styles.subtitle}>
                          {timeConvert(item.createdAt)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.pendingAction}>
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="timer-sand-empty"
                        size={20}
                      ></MaterialCommunityIcons>
                    </View>
                  </View>
                ) : item.status == "completed" ? (
                  <View style={styles.successCard} key={item._id}>
                    <View>
                      <Text styles={styles.title}>Esewa . 9845534234</Text>
                      <View style={styles.row}>
                        <Text style={styles.subtitle}>02/03/2022</Text>
                        <Text style={styles.subtitle}>05:30:21</Text>
                      </View>
                    </View>

                    <View style={styles.successAction}>
                      <Feather
                        name="check"
                        style={styles.icon}
                        size={20}
                      ></Feather>
                    </View>
                  </View>
                ) : (
                  <View style={styles.cancelledCard} key={item._id}>
                    <View>
                      <Text styles={styles.title}>Esewa . 9845534234</Text>
                      <View style={styles.row}>
                        <Text style={styles.subtitle}>02/03/2022</Text>
                        <Text style={styles.subtitle}>05:30:21</Text>
                      </View>
                    </View>

                    <View style={styles.cancelledAction}>
                      <Ionicons
                        name="close"
                        style={styles.icon}
                        size={20}
                      ></Ionicons>
                    </View>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      ) : (
        <EmptyRedeem navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  pendingCard: {
    backgroundColor: "#f5f5ff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  cancelledCard: {
    backgroundColor: "rgba(255, 36, 36, 0.25)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  successCard: {
    backgroundColor: "rgba(76, 217, 100, 0.25)",
    padding: 20,
    borderRadius: 10,

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  pendingAction: {
    backgroundColor: "#68B6F3",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  cancelledAction: {
    backgroundColor: "#FF2424",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  successAction: {
    backgroundColor: "#4CD964",
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  icon: {
    fontSize: 15,
    alignItems: "center",
    fontWeight: "500",
    color: "white",
  },
  dFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Raleway_700Bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#868686",
    fontWeight: "600",
    fontFamily: "Raleway_600SemiBold",
    marginRight: 10,
  },
});
