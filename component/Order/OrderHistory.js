import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import {
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

export default function OrderHistory({
  navigation,
  title = "No Orders Yet",
  buttonShow = true,
}) {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, padding: 20 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <View>
          <Image
            source={require("../../assets/empty-order.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subtitle}>
          When you do, their status will appear here
        </Text>
        {buttonShow && (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.goBack()}
          >
            <View>
              <Text style={styles.loginText}>Go Back</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
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
  loginBtn: {
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: "#663399",
    borderRadius: 10,
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
    fontWeight: "700",
    fontSize: 18,
    color: "white",
  },
});
