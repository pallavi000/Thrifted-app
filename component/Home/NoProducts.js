import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const NoProducts = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1, padding: 20 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 90,
        }}
      >
        <View>
          <MaterialIcons style={styles.icon} name="error-outline" size={100} />
        </View>
        <Text style={styles.header}>No Product Found</Text>
        <Text style={styles.subtitle}>
          Please change what appears in your feed or/and follow/add more
          sellers/interests
        </Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Feed Setting")}
        >
          <View>
            <Text style={styles.loginText}>Change Feed Setting</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NoProducts;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    resizeMode: "contain",
  },
  icon: {
    color: "#663399",
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
